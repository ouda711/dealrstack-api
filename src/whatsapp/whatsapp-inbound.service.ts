import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessService } from '../access/access.service';
import { BranchesService } from '../branches/branches.service';
import { SalesAssignmentEngineService } from '../sales/sales-assignment-engine.service';
import {
  LeadPriority,
  LeadSource,
  LeadStatus,
  MessageDirection,
  NotificationKind,
} from '../sales/domain/sales.enums';
import { SalesConversationEntity } from '../sales/infrastructure/persistence/relational/entities/sales-conversation.entity';
import { SalesLeadEntity } from '../sales/infrastructure/persistence/relational/entities/sales-lead.entity';
import { SalesMessageEntity } from '../sales/infrastructure/persistence/relational/entities/sales-message.entity';
import { SalesNotificationEntity } from '../sales/infrastructure/persistence/relational/entities/sales-notification.entity';
import { TenantWhatsAppIntegrationEntity } from './infrastructure/persistence/relational/entities/tenant-whatsapp-integration.entity';
import { phonesMatch, toDisplayPhone } from './utils/whatsapp-phone.util';

type InboundWhatsAppMessage = {
  from: string;
  id: string;
  timestamp: string;
  type: string;
  text?: { body?: string };
};

@Injectable()
export class WhatsAppInboundService {
  private readonly logger = new Logger(WhatsAppInboundService.name);

  constructor(
    @InjectRepository(TenantWhatsAppIntegrationEntity)
    private readonly integrationRepository: Repository<TenantWhatsAppIntegrationEntity>,
    @InjectRepository(SalesLeadEntity)
    private readonly leadRepository: Repository<SalesLeadEntity>,
    @InjectRepository(SalesConversationEntity)
    private readonly conversationRepository: Repository<SalesConversationEntity>,
    @InjectRepository(SalesMessageEntity)
    private readonly messageRepository: Repository<SalesMessageEntity>,
    @InjectRepository(SalesNotificationEntity)
    private readonly notificationRepository: Repository<SalesNotificationEntity>,
    private readonly branchesService: BranchesService,
    private readonly accessService: AccessService,
    private readonly assignmentEngineService: SalesAssignmentEngineService,
  ) {}

  async processWebhookPayload(payload: unknown): Promise<void> {
    const body = payload as {
      object?: string;
      entry?: {
        changes?: {
          field?: string;
          value?: {
            messaging_product?: string;
            metadata?: { phone_number_id?: string };
            contacts?: { profile?: { name?: string } }[];
            messages?: InboundWhatsAppMessage[];
          };
        }[];
      }[];
    };

    if (body.object !== 'whatsapp_business_account') {
      return;
    }

    for (const entry of body.entry ?? []) {
      for (const change of entry.changes ?? []) {
        if (change.field !== 'messages') {
          continue;
        }

        const value = change.value;

        if (!value || value.messaging_product !== 'whatsapp') {
          continue;
        }

        const phoneNumberId = value.metadata?.phone_number_id;

        if (!phoneNumberId) {
          continue;
        }

        for (const message of value.messages ?? []) {
          await this.processInboundMessage({
            phoneNumberId,
            message,
            contactName: value.contacts?.[0]?.profile?.name,
          });
        }
      }
    }
  }

  private async processInboundMessage(input: {
    phoneNumberId: string;
    message: InboundWhatsAppMessage;
    contactName?: string;
  }) {
    if (input.message.type !== 'text' || !input.message.text?.body?.trim()) {
      return;
    }

    const integration = await this.integrationRepository.findOne({
      where: { phoneNumberId: input.phoneNumberId, isEnabled: true },
    });

    if (!integration) {
      this.logger.warn(
        `Ignoring WhatsApp message for unknown phone_number_id ${input.phoneNumberId}`,
      );
      return;
    }

    const existing = await this.messageRepository.findOne({
      where: { whatsappMessageId: input.message.id },
    });

    if (existing) {
      return;
    }

    const tenantId = integration.tenantId;
    const customerPhone = toDisplayPhone(input.message.from);
    const body = input.message.text.body.trim();
    const sentAt = new Date(Number(input.message.timestamp) * 1000);
    const now = new Date();

    const lead = await this.findOrCreateLead({
      tenantId,
      customerPhone,
      customerName: input.contactName?.trim() || customerPhone,
      now,
    });

    const conversation = await this.findOrCreateConversation({
      tenantId,
      lead,
      now,
      preview: body,
    });

    await this.messageRepository.save(
      this.messageRepository.create({
        conversationId: conversation.id,
        direction: MessageDirection.Inbound,
        body,
        sentAt,
        whatsappMessageId: input.message.id,
        isTemplate: false,
      }),
    );

    conversation.lastMessagePreview =
      body.length > 500 ? `${body.slice(0, 497)}...` : body;
    conversation.lastMessageAt = sentAt;
    conversation.unreadCount = (conversation.unreadCount ?? 0) + 1;
    await this.conversationRepository.save(conversation);

    lead.unread = true;
    lead.lastActivityAt = sentAt;
    await this.leadRepository.save(lead);

    await this.notificationRepository.save(
      this.notificationRepository.create({
        tenantId,
        kind: NotificationKind.CustomerReply,
        title: 'Customer replied on WhatsApp',
        body: `${lead.customerName}: ${conversation.lastMessagePreview}`,
        leadId: lead.id,
        read: false,
      }),
    );
  }

  private async findOrCreateLead(input: {
    tenantId: number;
    customerPhone: string;
    customerName: string;
    now: Date;
  }): Promise<SalesLeadEntity> {
    const leads = await this.leadRepository.find({
      where: { tenantId: input.tenantId },
    });
    const existing = leads.find((lead) =>
      phonesMatch(lead.customerPhone, input.customerPhone),
    );

    if (existing) {
      return existing;
    }

    const branches = await this.branchesService.findByTenantId(input.tenantId);
    const branch = branches[0];

    if (!branch) {
      throw new Error(
        `Tenant ${input.tenantId} has no branches for WhatsApp lead`,
      );
    }

    const slaDueAt = new Date(input.now.getTime() + 15 * 60_000);

    const lead = await this.leadRepository.save(
      this.leadRepository.create({
        tenantId: input.tenantId,
        branchId: branch.id,
        source: LeadSource.Whatsapp,
        status: LeadStatus.New,
        priority: LeadPriority.Normal,
        customerName: input.customerName,
        customerPhone: input.customerPhone,
        interestSummary: 'Inbound WhatsApp message',
        assignedUserId: null,
        assignmentReason: null,
        unread: true,
        slaDueAt,
        lastActivityAt: input.now,
      }),
    );

    await this.assignmentEngineService.applyToLead(lead);

    return this.leadRepository.findOneByOrFail({ id: lead.id });
  }

  private async findOrCreateConversation(input: {
    tenantId: number;
    lead: SalesLeadEntity;
    now: Date;
    preview: string;
  }): Promise<SalesConversationEntity> {
    const existing = await this.conversationRepository.findOne({
      where: { tenantId: input.tenantId, leadId: input.lead.id },
    });

    if (existing) {
      return existing;
    }

    const assigneeId =
      input.lead.assignedUserId ??
      (await this.resolveConversationAssigneeId(input.tenantId));

    return this.conversationRepository.save(
      this.conversationRepository.create({
        tenantId: input.tenantId,
        branchId: input.lead.branchId,
        leadId: input.lead.id,
        customerName: input.lead.customerName,
        customerPhone: input.lead.customerPhone,
        assignedUserId: assigneeId,
        unreadCount: 0,
        lastMessagePreview:
          input.preview.length > 500
            ? `${input.preview.slice(0, 497)}...`
            : input.preview,
        lastMessageAt: input.now,
      }),
    );
  }

  private async resolveConversationAssigneeId(
    tenantId: number,
  ): Promise<number> {
    const memberships =
      await this.accessService.findTenantMemberships(tenantId);
    const userId = memberships.find((membership) => membership.user?.id)?.user
      ?.id;

    if (!userId) {
      throw new Error(
        `Tenant ${tenantId} has no staff for WhatsApp conversation`,
      );
    }

    return Number(userId);
  }
}
