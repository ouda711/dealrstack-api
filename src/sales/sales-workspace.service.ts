import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AccessService } from '../access/access.service';
import { BranchesService } from '../branches/branches.service';
import { SalesPipelineService } from '../sales-pipeline/sales-pipeline.service';
import { SettingsService } from '../settings/settings.service';
import { TenantsService } from '../tenants/tenants.service';
import {
  FollowUpStatus,
  LeadPriority,
  LeadSource,
  LeadStatus,
  MessageDirection,
  NotificationKind,
  SalesActivityType,
  SalesAppointmentStatus,
  SalesAppointmentType,
} from './domain/sales.enums';
import { AssignSalesLeadDto } from './dto/assign-sales-lead.dto';
import { CreateDealFromLeadDto } from './dto/create-deal-from-lead.dto';
import { CreateSalesLeadDto } from './dto/create-sales-lead.dto';
import { ImportSalesLeadsCsvDto } from './dto/import-sales-leads-csv.dto';
import { SalesConversationPresetsDto } from './dto/sales-conversation-presets.dto';
import { UpdateSalesConversationDto } from './dto/update-sales-conversation.dto';
import { UpdateSalesLeadDto } from './dto/update-sales-lead.dto';
import { CreateSalesAssignmentRuleDto } from './dto/create-sales-assignment-rule.dto';
import { UpdateSalesAssignmentRuleDto } from './dto/update-sales-assignment-rule.dto';
import { CreateSalesFollowUpRuleDto } from './dto/create-sales-follow-up-rule.dto';
import { UpdateSalesFollowUpRuleDto } from './dto/update-sales-follow-up-rule.dto';
import { UpdateSalesActivityDto } from './dto/update-sales-activity.dto';
import { CreateSalesPipelineDealDto } from './dto/create-sales-pipeline-deal.dto';
import { MoveSalesDealStageDto } from './dto/move-sales-deal-stage.dto';
import { ReorderSalesDealsDto } from './dto/reorder-sales-deals.dto';
import { CreateSalesDealActivityDto } from './dto/create-sales-deal-activity.dto';
import { SendSalesConversationMessageDto } from './dto/send-sales-conversation-message.dto';
import { UpdateSalesPipelineDealDto } from './dto/update-sales-pipeline-deal.dto';
import {
  MarkAllSalesNotificationsReadResultDto,
  MarkSalesNotificationReadResultDto,
  SalesWorkspaceSnapshotDto,
} from './domain/sales-workspace';
import { SalesActivityEntity } from './infrastructure/persistence/relational/entities/sales-activity.entity';
import { SalesAssignmentRuleEntity } from './infrastructure/persistence/relational/entities/sales-assignment-rule.entity';
import { SalesConversationEntity } from './infrastructure/persistence/relational/entities/sales-conversation.entity';
import { SalesDealEntity } from './infrastructure/persistence/relational/entities/sales-deal.entity';
import { SalesFollowUpRuleEntity } from './infrastructure/persistence/relational/entities/sales-follow-up-rule.entity';
import { SalesLeadEntity } from './infrastructure/persistence/relational/entities/sales-lead.entity';
import { SalesMessageEntity } from './infrastructure/persistence/relational/entities/sales-message.entity';
import { SalesNotificationEntity } from './infrastructure/persistence/relational/entities/sales-notification.entity';
import {
  computeSalesWorkspaceDashboardMetrics,
  INVENTORY_AGING_STATUSES,
} from './compute-sales-workspace-dashboard-metrics';
import { SalesAssignmentEngineService } from './sales-assignment-engine.service';
import { SalesFollowUpAutomationService } from './sales-follow-up-automation.service';
import { SalesLeadEscalationService } from './sales-lead-escalation.service';
import { WhatsAppIntegrationService } from '../whatsapp/whatsapp-integration.service';
import { WhatsAppOutboundService } from '../whatsapp/whatsapp-outbound.service';
import { phonesMatch } from '../whatsapp/utils/whatsapp-phone.util';
import { appendListingToInterest } from './append-listing-to-interest.util';
import { CreateSalesAppointmentDto } from './dto/create-sales-appointment.dto';
import { UpdateSalesAppointmentDto } from './dto/update-sales-appointment.dto';
import { mapSalesAppointmentToWorkspaceDto } from './map-sales-appointment-to-workspace.dto';
import {
  matchesTestDriveStage,
  resolvePipelineStageNotification,
} from './pipeline-stage-notification.util';
import { SalesAppointmentEntity } from './infrastructure/persistence/relational/entities/sales-appointment.entity';
import { SalesAppointmentMutationResultDto } from './domain/sales-workspace';
import { leadSourceLabel, parseSalesLeadsCsv } from './parse-sales-leads-csv';
import { mapSalesNotificationToWorkspaceDto } from './map-sales-notification-to-workspace.dto';
import { SalesNotificationService } from './sales-notification.service';
import { SalesNotificationStreamService } from './sales-notification-stream.service';
import { SalesCalendarSyncService } from './sales-calendar-sync.service';
import { VehicleEntity } from '../vehicles/infrastructure/persistence/relational/entities/vehicle.entity';
import {
  VehicleMediaEntity,
  VehicleMediaKind,
} from '../vehicles/infrastructure/persistence/relational/entities/vehicle-media.entity';

import { normalizeConversationPresets } from './conversation-presets.util';

@Injectable()
export class SalesWorkspaceService {
  constructor(
    @InjectRepository(SalesLeadEntity)
    private readonly leadRepository: Repository<SalesLeadEntity>,
    @InjectRepository(SalesDealEntity)
    private readonly dealRepository: Repository<SalesDealEntity>,
    @InjectRepository(SalesConversationEntity)
    private readonly conversationRepository: Repository<SalesConversationEntity>,
    @InjectRepository(SalesMessageEntity)
    private readonly messageRepository: Repository<SalesMessageEntity>,
    @InjectRepository(SalesActivityEntity)
    private readonly activityRepository: Repository<SalesActivityEntity>,
    @InjectRepository(SalesNotificationEntity)
    private readonly notificationRepository: Repository<SalesNotificationEntity>,
    @InjectRepository(SalesAppointmentEntity)
    private readonly appointmentRepository: Repository<SalesAppointmentEntity>,
    @InjectRepository(SalesAssignmentRuleEntity)
    private readonly assignmentRuleRepository: Repository<SalesAssignmentRuleEntity>,
    @InjectRepository(SalesFollowUpRuleEntity)
    private readonly followUpRuleRepository: Repository<SalesFollowUpRuleEntity>,
    @InjectRepository(VehicleMediaEntity)
    private readonly vehicleMediaRepository: Repository<VehicleMediaEntity>,
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
    private readonly tenantsService: TenantsService,
    private readonly branchesService: BranchesService,
    private readonly accessService: AccessService,
    private readonly salesPipelineService: SalesPipelineService,
    private readonly followUpAutomationService: SalesFollowUpAutomationService,
    private readonly assignmentEngineService: SalesAssignmentEngineService,
    private readonly leadEscalationService: SalesLeadEscalationService,
    private readonly whatsAppIntegrationService: WhatsAppIntegrationService,
    private readonly whatsAppOutboundService: WhatsAppOutboundService,
    private readonly settingsService: SettingsService,
    private readonly salesNotificationService: SalesNotificationService,
    private readonly notificationStreamService: SalesNotificationStreamService,
    private readonly calendarSyncService: SalesCalendarSyncService,
  ) {}

  private conversationPresetsKey(tenantId: number) {
    return `sales_conversation_presets:tenant:${tenantId}`;
  }

  async getWorkspace(tenantId: number): Promise<SalesWorkspaceSnapshotDto> {
    const tenant = await this.getTenantOrThrow(tenantId);
    const branches = await this.branchesService.findByTenantId(tenantId);
    const memberships =
      await this.accessService.findTenantMemberships(tenantId);

    const leads = await this.leadRepository.find({
      where: { tenantId },
      order: { createdAt: 'DESC' },
    });
    const deals = await this.dealRepository.find({
      where: { tenantId },
      order: { stageKey: 'ASC', boardSortOrder: 'ASC', lastActivityAt: 'DESC' },
    });
    const conversations = await this.conversationRepository.find({
      where: { tenantId },
    });
    const conversationIds = conversations.map((c) => c.id);
    const messages =
      conversationIds.length > 0
        ? await this.messageRepository
            .createQueryBuilder('message')
            .where('message.conversationId IN (:...conversationIds)', {
              conversationIds,
            })
            .orderBy('message.sentAt', 'ASC')
            .getMany()
        : [];
    const assignmentRules = await this.assignmentRuleRepository.find({
      where: { tenantId },
      order: { priority: 'ASC' },
    });
    const followUpRules = await this.followUpRuleRepository.find({
      where: { tenantId },
    });

    await this.followUpAutomationService.evaluateTenant({
      tenantId,
      rules: followUpRules,
      leads,
      deals,
      conversations,
      messages,
    });

    await this.assignmentEngineService.evaluateUnassignedLeads(tenantId);

    await this.leadEscalationService.evaluateTenant(tenantId);

    const leadsAfterAssignment = await this.leadRepository.find({
      where: { tenantId },
      order: { createdAt: 'DESC' },
    });
    const activitiesAfterAutomation = await this.activityRepository.find({
      where: { tenantId },
      order: { createdAt: 'DESC' },
    });
    const notificationsAfterAutomation = await this.notificationRepository.find(
      {
        where: { tenantId },
        order: { createdAt: 'DESC' },
      },
    );
    const appointments = await this.appointmentRepository.find({
      where: { tenantId },
      order: { scheduledAt: 'ASC' },
    });

    const conversationIdByLeadId = new Map(
      conversations.map((c) => [c.leadId, c.id]),
    );
    const leadById = new Map(
      leadsAfterAssignment.map((lead) => [lead.id, lead]),
    );
    const vehicleImageById = await this.loadPrimaryVehicleImages(
      leadsAfterAssignment
        .map((lead) => lead.vehicleId)
        .filter((vehicleId): vehicleId is number => Boolean(vehicleId)),
    );

    const staff = this.buildStaff(tenantId, branches, memberships);
    const inventoryVehicles = await this.vehicleRepository.find({
      where: {
        tenant: { id: tenantId },
        status: In(INVENTORY_AGING_STATUSES),
        isActive: true,
      },
      select: { id: true, createdAt: true },
    });
    const overdueFollowUpsCount = activitiesAfterAutomation.filter(
      (activity) => activity.status === FollowUpStatus.Overdue,
    ).length;
    const whatsappIntegration =
      await this.whatsAppIntegrationService.getByTenantId(tenantId);
    const metrics = computeSalesWorkspaceDashboardMetrics({
      leads: leadsAfterAssignment.map((lead) => ({
        id: lead.id,
        source: lead.source,
        status: lead.status,
        lostReason: lead.lostReason ?? null,
        assignedUserId: lead.assignedUserId ?? null,
        createdAt: lead.createdAt,
      })),
      deals: deals.map((deal) => ({
        stageKey: deal.stageKey,
        valueKes: Number(deal.valueKes),
        assignedUserId: deal.assignedUserId,
      })),
      staff: staff.map((member) => ({
        userId: Number(member.id),
        name: member.name || member.email,
      })),
      messages: messages.map((message) => ({
        conversationId: message.conversationId,
        direction: message.direction,
        sentAt: message.sentAt,
      })),
      conversationIdByLeadId: new Map(
        conversations.map((conversation) => [
          conversation.leadId,
          conversation.id,
        ]),
      ),
      inventoryVehicles: inventoryVehicles.map((vehicle) => ({
        createdAt: vehicle.createdAt,
      })),
      overdueFollowUpsCount,
    });

    return {
      metrics,
      whatsapp: {
        connected: Boolean(
          whatsappIntegration?.isEnabled && whatsappIntegration?.hasAccessToken,
        ),
        phoneNumberId: whatsappIntegration?.phoneNumberId ?? null,
        displayPhoneNumber: whatsappIntegration?.displayPhoneNumber ?? null,
      },
      tenants: [
        {
          id: String(tenant.id),
          slug: tenant.slug ?? '',
          name: tenant.name,
        },
      ],
      branches: branches.map((branch) => ({
        id: String(branch.id),
        tenantId: String(tenantId),
        code: branch.code,
        name: branch.name,
        city: branch.city,
        whatsappNumber: branch.phone ?? null,
      })),
      staff,
      leads: leadsAfterAssignment.map((lead) => ({
        id: String(lead.id),
        tenantId: String(lead.tenantId),
        branchId: String(lead.branchId),
        source: lead.source,
        status: lead.status,
        priority: lead.priority,
        customerName: lead.customerName,
        customerPhone: lead.customerPhone,
        interestSummary: lead.interestSummary,
        vehicleId: lead.vehicleId ? String(lead.vehicleId) : null,
        assignedStaffId: lead.assignedUserId
          ? String(lead.assignedUserId)
          : null,
        assignmentReason: lead.assignmentReason ?? null,
        unread: lead.unread,
        slaDueAt: lead.slaDueAt.toISOString(),
        lastActivityAt: lead.lastActivityAt.toISOString(),
        lostReason: lead.lostReason ?? null,
        createdAt: lead.createdAt.toISOString(),
        conversationId: conversationIdByLeadId.has(lead.id)
          ? String(conversationIdByLeadId.get(lead.id))
          : null,
      })),
      deals: deals.map((deal) => {
        const lead = leadById.get(deal.leadId);
        const vehicleId = lead?.vehicleId ?? null;

        return {
          id: String(deal.id),
          tenantId: String(deal.tenantId),
          branchId: String(deal.branchId),
          leadId: String(deal.leadId),
          vehicleId: vehicleId ? String(vehicleId) : null,
          conversationId: deal.conversationId
            ? String(deal.conversationId)
            : null,
          stage: deal.stageKey,
          title: deal.title,
          customerName: lead?.customerName ?? null,
          imageUrl:
            deal.imageUrl ??
            (vehicleId ? (vehicleImageById.get(vehicleId) ?? null) : null),
          valueKes: Number(deal.valueKes),
          assignedStaffId: String(deal.assignedUserId),
          assignmentReason: deal.assignmentReason ?? null,
          lastActivityAt: deal.lastActivityAt.toISOString(),
          createdAt: deal.createdAt.toISOString(),
          inactiveDays: deal.inactiveDays,
          boardSortOrder: deal.boardSortOrder,
          slaDueAt: deal.slaDueAt?.toISOString() ?? null,
        };
      }),
      conversations: conversations.map((conversation) => ({
        id: String(conversation.id),
        tenantId: String(conversation.tenantId),
        branchId: String(conversation.branchId),
        leadId: String(conversation.leadId),
        customerName: conversation.customerName,
        customerPhone: conversation.customerPhone,
        assignedStaffId: String(conversation.assignedUserId),
        unreadCount: conversation.unreadCount,
        lastMessagePreview: conversation.lastMessagePreview,
        lastMessageAt: conversation.lastMessageAt.toISOString(),
        internalNotes: conversation.internalNotes ?? null,
      })),
      messages: messages.map((message) => ({
        id: String(message.id),
        conversationId: String(message.conversationId),
        direction: message.direction,
        body: message.body,
        sentAt: message.sentAt.toISOString(),
        isTemplate: message.isTemplate,
        mediaType: message.mediaType ?? null,
      })),
      activities: activitiesAfterAutomation.map((activity) => ({
        id: String(activity.id),
        tenantId: String(activity.tenantId),
        leadId: activity.leadId ? String(activity.leadId) : null,
        dealId: activity.dealId ? String(activity.dealId) : null,
        conversationId: null,
        type: activity.type,
        summary: activity.summary,
        dueAt: activity.dueAt?.toISOString() ?? null,
        completedAt: activity.completedAt?.toISOString() ?? null,
        status: activity.status,
        automated: activity.automated,
        createdAt: activity.createdAt.toISOString(),
      })),
      notifications: notificationsAfterAutomation.map(
        mapSalesNotificationToWorkspaceDto,
      ),
      assignmentRules: assignmentRules.map((rule) => ({
        id: String(rule.id),
        tenantId: String(rule.tenantId),
        type: rule.type,
        label: rule.label,
        description: rule.description,
        enabled: rule.enabled,
        priority: rule.priority,
      })),
      followUpRules: followUpRules.map((rule) => ({
        id: String(rule.id),
        tenantId: String(rule.tenantId),
        label: rule.label,
        trigger: rule.trigger,
        delayMinutes: rule.delayMinutes,
        enabled: rule.enabled,
      })),
      appointments: appointments.map(mapSalesAppointmentToWorkspaceDto),
    };
  }

  async sendConversationMessage(
    tenantId: number,
    conversationId: number,
    dto: SendSalesConversationMessageDto,
  ) {
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId, tenantId },
    });

    if (!conversation) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'conversationNotFound',
      });
    }

    const body = dto.body.trim();

    if (!body) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'messageBodyRequired',
      });
    }

    const now = new Date();
    const preview = body.length > 500 ? `${body.slice(0, 497)}...` : body;
    const delivery = await this.whatsAppOutboundService.sendTextMessage({
      tenantId,
      customerPhone: conversation.customerPhone,
      body,
    });

    await this.messageRepository.save(
      this.messageRepository.create({
        conversationId: conversation.id,
        direction: MessageDirection.Outbound,
        body,
        sentAt: now,
        isTemplate: dto.isTemplate ?? false,
        whatsappMessageId: delivery.delivered
          ? delivery.whatsappMessageId
          : null,
      }),
    );

    conversation.lastMessagePreview = preview;
    conversation.lastMessageAt = now;
    conversation.unreadCount = 0;
    await this.conversationRepository.save(conversation);

    const lead = await this.getLeadOrThrow(tenantId, conversation.leadId);
    lead.lastActivityAt = now;
    lead.unread = false;
    await this.leadRepository.save(lead);

    await this.dealRepository.update(
      { tenantId, leadId: lead.id },
      { lastActivityAt: now, inactiveDays: 0 },
    );

    return this.getWorkspace(tenantId);
  }

  async updateConversation(
    tenantId: number,
    conversationId: number,
    dto: UpdateSalesConversationDto,
  ) {
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId, tenantId },
    });

    if (!conversation) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'conversationNotFound',
      });
    }

    if (dto.internalNotes !== undefined) {
      conversation.internalNotes = dto.internalNotes?.trim() || null;
      await this.conversationRepository.save(conversation);
    }

    return this.getWorkspace(tenantId);
  }

  async getConversationPresets(
    tenantId: number,
  ): Promise<SalesConversationPresetsDto> {
    await this.getTenantOrThrow(tenantId);
    const stored = await this.settingsService.getCachedJson<unknown>(
      this.conversationPresetsKey(tenantId),
    );

    return normalizeConversationPresets(stored);
  }

  async updateConversationPresets(
    tenantId: number,
    dto: SalesConversationPresetsDto,
  ): Promise<SalesConversationPresetsDto> {
    await this.getTenantOrThrow(tenantId);
    const normalized = normalizeConversationPresets(dto);
    await this.settingsService.upsertValue(
      this.conversationPresetsKey(tenantId),
      normalized as unknown as Record<string, unknown>,
    );
    this.settingsService.invalidateCache(this.conversationPresetsKey(tenantId));

    return normalized;
  }

  async createDealFromLead(
    tenantId: number,
    leadId: number,
    dto: CreateDealFromLeadDto,
    requestingUserId?: number,
  ) {
    const lead = await this.getLeadOrThrow(tenantId, leadId);
    const existingDeal = await this.dealRepository.findOne({
      where: { tenantId, leadId },
    });

    if (existingDeal) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'leadAlreadyHasDeal',
      });
    }

    const stageKey = dto.stageKey ?? 'new_lead';
    const pipeline = await this.salesPipelineService.getPipeline(tenantId);
    this.salesPipelineService.assertStageKeyExists(pipeline, stageKey);

    const memberships =
      await this.accessService.findTenantMemberships(tenantId);
    const now = new Date();
    const slaDueAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const assignedUserId =
      lead.assignedUserId ??
      requestingUserId ??
      memberships.find((membership) => membership.user?.id)?.user?.id;

    if (!assignedUserId) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'assignedUserRequired',
      });
    }

    if (!lead.assignedUserId) {
      lead.assignedUserId = assignedUserId;
      lead.assignmentReason = 'Deal created from lead inbox';
      lead.lastActivityAt = now;
      await this.leadRepository.save(lead);
    }

    const stageDeals = await this.dealRepository.find({
      where: { tenantId, stageKey },
    });
    const title = dto.title?.trim() || lead.interestSummary;

    const deal = await this.dealRepository.save(
      this.dealRepository.create({
        tenantId,
        branchId: lead.branchId,
        leadId: lead.id,
        stageKey,
        title,
        imageUrl: null,
        valueKes: '0',
        assignedUserId,
        assignmentReason:
          lead.assignmentReason ?? 'Deal created from lead inbox',
        lastActivityAt: now,
        inactiveDays: 0,
        boardSortOrder: stageDeals.length,
        slaDueAt,
      }),
    );

    await this.salesNotificationService.create({
      tenantId,
      kind: NotificationKind.NewLead,
      title: 'Lead added to pipeline',
      body: `${lead.customerName} — ${title}`,
      leadId: lead.id,
      dealId: deal.id,
    });

    await this.notifyDealEnteredStage(tenantId, deal, lead, stageKey, pipeline);

    return this.getWorkspace(tenantId);
  }

  async updateLead(tenantId: number, leadId: number, dto: UpdateSalesLeadDto) {
    const lead = await this.getLeadOrThrow(tenantId, leadId);

    if (dto.status) {
      lead.status = dto.status;
    }

    if (dto.status === LeadStatus.Lost) {
      lead.lostReason = dto.lostReason?.trim() || null;
    } else if (dto.lostReason !== undefined) {
      lead.lostReason = dto.lostReason?.trim() || null;
    }

    if (dto.vehicleId !== undefined) {
      if (dto.vehicleId === null) {
        lead.vehicleId = null;
      } else {
        lead.vehicleId = await this.resolveLeadVehicleId(
          tenantId,
          dto.vehicleId,
        );
      }
    }

    lead.lastActivityAt = new Date();
    await this.leadRepository.save(lead);

    return this.getWorkspace(tenantId);
  }

  async addDealActivity(
    tenantId: number,
    dealId: number,
    dto: CreateSalesDealActivityDto,
  ) {
    const deal = await this.getDealOrThrow(tenantId, dealId);
    const lead = await this.getLeadOrThrow(tenantId, deal.leadId);
    const now = new Date();

    await this.recordDealActivity(
      tenantId,
      deal.leadId,
      deal.id,
      dto.summary,
      dto.type ?? SalesActivityType.Note,
      false,
    );

    deal.lastActivityAt = now;
    deal.inactiveDays = 0;
    lead.lastActivityAt = now;

    await this.leadRepository.save(lead);
    await this.dealRepository.save(deal);

    return this.getWorkspace(tenantId);
  }

  async updatePipelineDeal(
    tenantId: number,
    dealId: number,
    dto: UpdateSalesPipelineDealDto,
  ) {
    const deal = await this.getDealOrThrow(tenantId, dealId);
    const lead = await this.getLeadOrThrow(tenantId, deal.leadId);
    const beforeStageKey = deal.stageKey;
    const beforeTitle = deal.title;
    const beforeAssigneeId = deal.assignedUserId;
    const beforePriority = lead.priority;
    const beforeVehicleId = lead.vehicleId ?? null;

    if (dto.stageKey !== undefined) {
      const pipeline = await this.salesPipelineService.getPipeline(tenantId);
      this.salesPipelineService.assertStageKeyExists(pipeline, dto.stageKey);

      if (dto.stageKey !== deal.stageKey) {
        const targetDeals = await this.dealRepository.find({
          where: { tenantId, stageKey: dto.stageKey },
        });
        deal.stageKey = dto.stageKey;
        deal.boardSortOrder = targetDeals.length;
      }
    }

    if (dto.title !== undefined) {
      deal.title = dto.title.trim();
    }

    if (dto.valueKes !== undefined) {
      deal.valueKes = String(dto.valueKes);
    }

    if (dto.assignedUserId !== undefined) {
      deal.assignedUserId = dto.assignedUserId;
      lead.assignedUserId = dto.assignedUserId;
    }

    if (dto.branchId !== undefined) {
      const branches = await this.branchesService.findByTenantId(tenantId);
      const branch = branches.find((item) => item.id === dto.branchId);

      if (!branch) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'branchNotFound',
        });
      }

      deal.branchId = branch.id;
      lead.branchId = branch.id;
    }

    if (dto.customerName !== undefined) {
      lead.customerName = dto.customerName.trim();
    }

    if (dto.customerPhone !== undefined) {
      lead.customerPhone = dto.customerPhone.trim();
    }

    if (dto.interestSummary !== undefined) {
      lead.interestSummary = dto.interestSummary.trim();
    }

    if (dto.priority !== undefined) {
      lead.priority = dto.priority;
    }

    if (dto.vehicleId !== undefined) {
      if (dto.vehicleId === null) {
        lead.vehicleId = null;
      } else {
        const vehicle = await this.vehicleRepository.findOne({
          where: { id: dto.vehicleId, tenant: { id: tenantId } },
        });

        if (!vehicle) {
          throw new NotFoundException({
            status: HttpStatus.NOT_FOUND,
            error: 'vehicleNotFound',
          });
        }

        lead.vehicleId = vehicle.id;
      }
    }

    const now = new Date();
    deal.lastActivityAt = now;
    deal.inactiveDays = 0;
    lead.lastActivityAt = now;

    await this.leadRepository.save(lead);
    await this.dealRepository.save(deal);

    if (dto.customerName !== undefined && deal.conversationId) {
      await this.conversationRepository.update(
        { id: deal.conversationId, tenantId },
        { customerName: lead.customerName },
      );
    }

    const pipeline = await this.salesPipelineService.getPipeline(tenantId);
    const changeSummaries: string[] = [];

    if (dto.stageKey !== undefined && dto.stageKey !== beforeStageKey) {
      changeSummaries.push(
        `Stage → ${this.stageLabel(pipeline, dto.stageKey)}`,
      );
    }

    if (dto.title !== undefined && dto.title.trim() !== beforeTitle) {
      changeSummaries.push('Title updated');
    }

    if (
      dto.assignedUserId !== undefined &&
      dto.assignedUserId !== beforeAssigneeId
    ) {
      changeSummaries.push('Assignee updated');
    }

    if (dto.priority !== undefined && dto.priority !== beforePriority) {
      changeSummaries.push(`Priority → ${dto.priority}`);
    }

    if (dto.vehicleId !== undefined) {
      const nextVehicleId = dto.vehicleId ?? null;

      if (nextVehicleId !== beforeVehicleId) {
        changeSummaries.push(
          nextVehicleId ? 'Vehicle linked' : 'Vehicle unlinked',
        );
      }
    }

    if (changeSummaries.length) {
      await this.recordDealActivity(
        tenantId,
        deal.leadId,
        deal.id,
        changeSummaries.join(' · '),
        SalesActivityType.Note,
        true,
      );
    }

    if (dto.stageKey !== undefined && dto.stageKey !== beforeStageKey) {
      await this.notifyDealEnteredStage(
        tenantId,
        deal,
        lead,
        dto.stageKey,
        pipeline,
      );
    }

    return this.getWorkspace(tenantId);
  }

  async moveDealStage(
    tenantId: number,
    dealId: number,
    dto: MoveSalesDealStageDto,
  ) {
    const pipeline = await this.salesPipelineService.getPipeline(tenantId);
    this.salesPipelineService.assertStageKeyExists(pipeline, dto.stageKey);

    const deal = await this.getDealOrThrow(tenantId, dealId);
    const previousStageKey = deal.stageKey;
    const targetDeals = await this.dealRepository.find({
      where: { tenantId, stageKey: dto.stageKey },
      order: { boardSortOrder: 'ASC' },
    });

    deal.stageKey = dto.stageKey;
    deal.boardSortOrder = targetDeals.length;
    deal.lastActivityAt = new Date();
    deal.inactiveDays = 0;
    await this.dealRepository.save(deal);

    if (previousStageKey !== dto.stageKey) {
      await this.recordDealActivity(
        tenantId,
        deal.leadId,
        deal.id,
        `Moved to ${this.stageLabel(pipeline, dto.stageKey)}`,
        SalesActivityType.Note,
        true,
      );

      const lead = await this.getLeadOrThrow(tenantId, deal.leadId);
      lead.lastActivityAt = new Date();
      await this.leadRepository.save(lead);

      await this.notifyDealEnteredStage(
        tenantId,
        deal,
        lead,
        dto.stageKey,
        pipeline,
      );
    }

    return this.getWorkspace(tenantId);
  }

  async reorderDealsInStage(tenantId: number, dto: ReorderSalesDealsDto) {
    const pipeline = await this.salesPipelineService.getPipeline(tenantId);
    this.salesPipelineService.assertStageKeyExists(pipeline, dto.stageKey);

    const deals = await this.dealRepository.find({
      where: {
        tenantId,
        stageKey: dto.stageKey,
        id: In(dto.dealIds),
      },
    });

    if (deals.length !== dto.dealIds.length) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'salesDealReorderInvalid',
      });
    }

    const dealById = new Map(deals.map((deal) => [deal.id, deal]));

    await this.dealRepository.save(
      dto.dealIds.map((id, index) => ({
        ...dealById.get(id)!,
        boardSortOrder: index,
      })),
    );

    return this.getWorkspace(tenantId);
  }

  async createPipelineDeal(
    tenantId: number,
    dto: CreateSalesPipelineDealDto,
    requestingUserId?: number,
  ) {
    await this.getTenantOrThrow(tenantId);
    const branches = await this.branchesService.findByTenantId(tenantId);

    if (!branches.length) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'tenantHasNoBranches',
      });
    }

    const branch =
      branches.find((item) => item.id === dto.branchId) ?? branches[0];

    if (!branch) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'branchNotFound',
      });
    }

    const pipeline = await this.salesPipelineService.getPipeline(tenantId);
    this.salesPipelineService.assertStageKeyExists(pipeline, dto.stageKey);

    const memberships =
      await this.accessService.findTenantMemberships(tenantId);
    const now = new Date();
    const slaDueAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const interestSummary = dto.interestSummary?.trim() || dto.title.trim();
    const explicitAssigneeId = dto.assignedUserId ?? null;

    let lead = await this.leadRepository.save(
      this.leadRepository.create({
        tenantId,
        branchId: branch.id,
        source: LeadSource.Manual,
        status: LeadStatus.New,
        priority: LeadPriority.Normal,
        customerName: dto.customerName.trim(),
        customerPhone: dto.customerPhone.trim(),
        interestSummary,
        assignedUserId: explicitAssigneeId,
        assignmentReason: explicitAssigneeId
          ? 'Added from pipeline board'
          : null,
        unread: true,
        slaDueAt,
        lastActivityAt: now,
      }),
    );

    if (!explicitAssigneeId) {
      await this.assignmentEngineService.applyToLead(lead);
      lead = await this.leadRepository.findOneByOrFail({ id: lead.id });
    }

    const assignedUserId =
      lead.assignedUserId ??
      requestingUserId ??
      memberships.find((membership) => membership.user?.id)?.user?.id;

    if (!assignedUserId) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'assignedUserRequired',
      });
    }

    if (!lead.assignedUserId) {
      lead.assignedUserId = assignedUserId;
      lead.assignmentReason = 'Added from pipeline board';
      lead.lastActivityAt = now;
      await this.leadRepository.save(lead);
    }

    const assignmentReason =
      lead.assignmentReason ?? 'Added from pipeline board';

    const stageDeals = await this.dealRepository.find({
      where: { tenantId, stageKey: dto.stageKey },
    });

    const deal = await this.dealRepository.save(
      this.dealRepository.create({
        tenantId,
        branchId: branch.id,
        leadId: lead.id,
        stageKey: dto.stageKey,
        title: dto.title.trim(),
        imageUrl: dto.imageUrl?.trim() || null,
        valueKes: String(dto.valueKes ?? 0),
        assignedUserId,
        assignmentReason,
        lastActivityAt: now,
        inactiveDays: 0,
        boardSortOrder: stageDeals.length,
        slaDueAt,
      }),
    );

    await this.salesNotificationService.create({
      tenantId,
      kind: NotificationKind.NewLead,
      title: 'New pipeline card',
      body: `${lead.customerName} — ${dto.title.trim()}`,
      leadId: lead.id,
      dealId: deal.id,
    });

    await this.notifyDealEnteredStage(
      tenantId,
      deal,
      lead,
      dto.stageKey,
      pipeline,
    );

    return this.getWorkspace(tenantId);
  }

  async captureInboundLead(
    tenantId: number,
    dto: {
      source: LeadSource;
      customerName: string;
      customerPhone: string;
      interestSummary: string;
      branchId?: number;
      vehicleId?: number;
    },
  ): Promise<SalesLeadEntity> {
    await this.getTenantOrThrow(tenantId);
    const branch = await this.resolveBranch(tenantId, dto.branchId);
    const existingLeads = await this.leadRepository.find({
      where: { tenantId },
    });

    if (
      existingLeads.some((lead) =>
        phonesMatch(lead.customerPhone, dto.customerPhone.trim()),
      )
    ) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'leadPhoneAlreadyExists',
      });
    }

    const vehicleId = await this.resolveLeadVehicleId(tenantId, dto.vehicleId);

    return this.persistCapturedLead({
      tenantId,
      branchId: branch.id,
      source: dto.source,
      customerName: dto.customerName.trim(),
      customerPhone: dto.customerPhone.trim(),
      interestSummary:
        dto.interestSummary?.trim() || `${leadSourceLabel(dto.source)} inquiry`,
      vehicleId,
    });
  }

  async createLead(tenantId: number, dto: CreateSalesLeadDto) {
    await this.captureInboundLead(tenantId, {
      source: dto.source,
      customerName: dto.customerName,
      customerPhone: dto.customerPhone,
      interestSummary: appendListingToInterest(
        dto.interestSummary,
        dto.listingUrl,
        leadSourceLabel(dto.source),
      ),
      branchId: dto.branchId,
      vehicleId: dto.vehicleId,
    });

    return this.getWorkspace(tenantId);
  }

  async importLeadsFromCsv(tenantId: number, dto: ImportSalesLeadsCsvDto) {
    await this.getTenantOrThrow(tenantId);
    const branch = await this.resolveBranch(tenantId);
    const rows = parseSalesLeadsCsv(dto.csv);

    if (!rows.length) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'csvHasNoValidRows',
      });
    }

    const existingLeads = await this.leadRepository.find({
      where: { tenantId },
    });
    let imported = 0;

    for (const row of rows) {
      const duplicate = existingLeads.some((lead) =>
        phonesMatch(lead.customerPhone, row.customerPhone),
      );

      if (duplicate) {
        continue;
      }

      const lead = await this.persistCapturedLead({
        tenantId,
        branchId: branch.id,
        source: LeadSource.Csv,
        customerName: row.customerName,
        customerPhone: row.customerPhone,
        interestSummary: row.interestSummary,
      });
      existingLeads.push(lead);
      imported += 1;
    }

    if (!imported) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'csvDuplicatesOnly',
      });
    }

    return this.getWorkspace(tenantId);
  }

  async createAssignmentRule(
    tenantId: number,
    dto: CreateSalesAssignmentRuleDto,
  ) {
    await this.getTenantOrThrow(tenantId);

    const existing = await this.assignmentRuleRepository.find({
      where: { tenantId },
      order: { priority: 'DESC' },
      take: 1,
    });

    const priority =
      dto.priority ?? (existing[0] ? existing[0].priority + 1 : 1);

    await this.assignmentRuleRepository.save(
      this.assignmentRuleRepository.create({
        tenantId,
        type: dto.type,
        label: dto.label.trim(),
        description: dto.description.trim(),
        enabled: dto.enabled ?? true,
        priority,
      }),
    );

    return this.getWorkspace(tenantId);
  }

  async updateAssignmentRule(
    tenantId: number,
    ruleId: number,
    dto: UpdateSalesAssignmentRuleDto,
  ) {
    const rule = await this.getAssignmentRuleOrThrow(tenantId, ruleId);

    if (dto.type !== undefined) {
      rule.type = dto.type;
    }

    if (dto.label !== undefined) {
      rule.label = dto.label.trim();
    }

    if (dto.description !== undefined) {
      rule.description = dto.description.trim();
    }

    if (dto.enabled !== undefined) {
      rule.enabled = dto.enabled;
    }

    if (dto.priority !== undefined) {
      rule.priority = dto.priority;
    }

    await this.assignmentRuleRepository.save(rule);
    return this.getWorkspace(tenantId);
  }

  async deleteAssignmentRule(tenantId: number, ruleId: number) {
    const rule = await this.getAssignmentRuleOrThrow(tenantId, ruleId);
    await this.assignmentRuleRepository.softRemove(rule);
    return this.getWorkspace(tenantId);
  }

  async createFollowUpRule(tenantId: number, dto: CreateSalesFollowUpRuleDto) {
    await this.getTenantOrThrow(tenantId);

    await this.followUpRuleRepository.save(
      this.followUpRuleRepository.create({
        tenantId,
        label: dto.label.trim(),
        trigger: dto.trigger.trim(),
        delayMinutes: dto.delayMinutes,
        enabled: dto.enabled ?? true,
      }),
    );

    return this.getWorkspace(tenantId);
  }

  async updateFollowUpRule(
    tenantId: number,
    ruleId: number,
    dto: UpdateSalesFollowUpRuleDto,
  ) {
    const rule = await this.getFollowUpRuleOrThrow(tenantId, ruleId);

    if (dto.label !== undefined) {
      rule.label = dto.label.trim();
    }

    if (dto.trigger !== undefined) {
      rule.trigger = dto.trigger.trim();
    }

    if (dto.delayMinutes !== undefined) {
      rule.delayMinutes = dto.delayMinutes;
    }

    if (dto.enabled !== undefined) {
      rule.enabled = dto.enabled;
    }

    await this.followUpRuleRepository.save(rule);
    return this.getWorkspace(tenantId);
  }

  async deleteFollowUpRule(tenantId: number, ruleId: number) {
    const rule = await this.getFollowUpRuleOrThrow(tenantId, ruleId);
    await this.followUpRuleRepository.softRemove(rule);
    return this.getWorkspace(tenantId);
  }

  async updateActivityStatus(
    tenantId: number,
    activityId: number,
    dto: UpdateSalesActivityDto,
  ) {
    const activity = await this.activityRepository.findOne({
      where: { id: activityId, tenantId },
    });

    if (!activity) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'activityNotFound',
      });
    }

    activity.status = dto.status;

    if (
      dto.status === FollowUpStatus.Completed ||
      dto.status === FollowUpStatus.Skipped
    ) {
      activity.completedAt = new Date();
    }

    await this.activityRepository.save(activity);

    if (activity.leadId) {
      const lead = await this.getLeadOrThrow(tenantId, activity.leadId);
      lead.lastActivityAt = new Date();
      await this.leadRepository.save(lead);
    }

    if (activity.dealId) {
      await this.dealRepository.update(
        { id: activity.dealId, tenantId },
        { lastActivityAt: new Date(), inactiveDays: 0 },
      );
    }

    return this.getWorkspace(tenantId);
  }

  async assignLead(tenantId: number, leadId: number, dto: AssignSalesLeadDto) {
    const lead = await this.getLeadOrThrow(tenantId, leadId);
    lead.assignedUserId = dto.assignedUserId;
    lead.assignmentReason = dto.assignmentReason ?? null;
    lead.lastActivityAt = new Date();
    await this.leadRepository.save(lead);

    await this.dealRepository.update(
      { tenantId, leadId },
      {
        assignedUserId: dto.assignedUserId,
        assignmentReason: dto.assignmentReason ?? null,
      },
    );

    await this.conversationRepository.update(
      { tenantId, leadId },
      { assignedUserId: dto.assignedUserId },
    );

    return this.getWorkspace(tenantId);
  }

  async markLeadRead(tenantId: number, leadId: number) {
    const lead = await this.getLeadOrThrow(tenantId, leadId);
    lead.unread = false;
    await this.leadRepository.save(lead);
    return this.getWorkspace(tenantId);
  }

  async markNotificationRead(
    tenantId: number,
    notificationId: number,
  ): Promise<MarkSalesNotificationReadResultDto> {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId, tenantId },
    });

    if (!notification) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'notificationNotFound',
      });
    }

    notification.read = true;
    await this.notificationRepository.save(notification);
    this.notificationStreamService.publishNotificationRead(
      tenantId,
      notification.id,
    );
    return {
      notification: mapSalesNotificationToWorkspaceDto(notification),
    };
  }

  async markAllNotificationsRead(
    tenantId: number,
  ): Promise<MarkAllSalesNotificationsReadResultDto> {
    await this.notificationRepository.update(
      { tenantId, read: false },
      { read: true },
    );
    this.notificationStreamService.publishAllNotificationsRead(tenantId);
    return { markedAll: true };
  }

  async createAppointment(
    tenantId: number,
    dto: CreateSalesAppointmentDto,
    actingUserId?: number,
  ): Promise<SalesAppointmentMutationResultDto> {
    await this.getTenantOrThrow(tenantId);
    const lead = await this.getLeadOrThrow(tenantId, dto.leadId);

    let deal: SalesDealEntity | null = null;

    if (dto.dealId) {
      deal = await this.getDealOrThrow(tenantId, dto.dealId);

      if (deal.leadId !== lead.id) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'appointmentDealLeadMismatch',
        });
      }
    }

    const scheduledAt = new Date(dto.scheduledAt);

    if (Number.isNaN(scheduledAt.getTime())) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'appointmentScheduledAtInvalid',
      });
    }

    const vehicleId =
      dto.vehicleId !== undefined
        ? await this.resolveLeadVehicleId(tenantId, dto.vehicleId)
        : lead.vehicleId;

    const appointment = await this.appointmentRepository.save(
      this.appointmentRepository.create({
        tenantId,
        leadId: lead.id,
        dealId: deal?.id ?? null,
        vehicleId: vehicleId ?? null,
        assignedUserId: dto.assignedUserId ?? lead.assignedUserId ?? null,
        type: dto.type,
        status: SalesAppointmentStatus.Scheduled,
        scheduledAt,
        durationMinutes: dto.durationMinutes ?? 60,
        location: dto.location?.trim() || null,
        notes: dto.notes?.trim() || null,
      }),
    );

    lead.lastActivityAt = new Date();
    await this.leadRepository.save(lead);

    if (
      dto.moveToTestDriveStage &&
      dto.type === SalesAppointmentType.TestDrive &&
      deal
    ) {
      const pipeline = await this.salesPipelineService.getPipeline(tenantId);
      const testDriveStage = pipeline.stages.find((stage) =>
        matchesTestDriveStage(stage.stageKey.toLowerCase()),
      );

      if (testDriveStage && deal.stageKey !== testDriveStage.stageKey) {
        deal.stageKey = testDriveStage.stageKey;
        deal.lastActivityAt = new Date();
        deal.inactiveDays = 0;
        await this.dealRepository.save(deal);
        await this.notifyDealEnteredStage(
          tenantId,
          deal,
          lead,
          testDriveStage.stageKey,
          pipeline,
        );
      }
    }

    await this.salesNotificationService.create({
      tenantId,
      kind: NotificationKind.Appointment,
      title: this.appointmentNotificationTitle(dto.type),
      body: `${lead.customerName} — ${this.formatAppointmentSchedule(scheduledAt)}`,
      leadId: lead.id,
      dealId: deal?.id ?? null,
    });

    void this.calendarSyncService.syncAppointmentForTenant(
      tenantId,
      appointment.id,
      actingUserId,
    );

    return { appointment: mapSalesAppointmentToWorkspaceDto(appointment) };
  }

  async updateAppointment(
    tenantId: number,
    appointmentId: number,
    dto: UpdateSalesAppointmentDto,
    actingUserId?: number,
  ): Promise<SalesAppointmentMutationResultDto> {
    const appointment = await this.getAppointmentOrThrow(
      tenantId,
      appointmentId,
    );

    if (dto.type !== undefined) {
      appointment.type = dto.type;
    }

    if (dto.status !== undefined) {
      appointment.status = dto.status;
    }

    if (dto.scheduledAt !== undefined) {
      const scheduledAt = new Date(dto.scheduledAt);

      if (Number.isNaN(scheduledAt.getTime())) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'appointmentScheduledAtInvalid',
        });
      }

      appointment.scheduledAt = scheduledAt;
    }

    if (dto.assignedUserId !== undefined) {
      appointment.assignedUserId = dto.assignedUserId;
    }

    if (dto.durationMinutes !== undefined) {
      appointment.durationMinutes = dto.durationMinutes;
    }

    if (dto.location !== undefined) {
      appointment.location = dto.location?.trim() || null;
    }

    if (dto.notes !== undefined) {
      appointment.notes = dto.notes?.trim() || null;
    }

    await this.appointmentRepository.save(appointment);

    void this.calendarSyncService.syncAppointmentForTenant(
      tenantId,
      appointment.id,
      actingUserId,
    );

    return { appointment: mapSalesAppointmentToWorkspaceDto(appointment) };
  }

  async cancelAppointment(
    tenantId: number,
    appointmentId: number,
  ): Promise<SalesAppointmentMutationResultDto> {
    const appointment = await this.getAppointmentOrThrow(
      tenantId,
      appointmentId,
    );
    appointment.status = SalesAppointmentStatus.Cancelled;
    await this.appointmentRepository.save(appointment);
    return { appointment: mapSalesAppointmentToWorkspaceDto(appointment) };
  }

  private formatAppointmentSchedule(date: Date) {
    return date.toLocaleString('en-KE', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Africa/Nairobi',
    });
  }

  private appointmentNotificationTitle(type: SalesAppointmentType) {
    switch (type) {
      case SalesAppointmentType.TestDrive:
        return 'Test drive scheduled';
      case SalesAppointmentType.Visit:
        return 'Visit scheduled';
      case SalesAppointmentType.Call:
        return 'Call scheduled';
      default:
        return 'Appointment scheduled';
    }
  }

  private async getAppointmentOrThrow(tenantId: number, appointmentId: number) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id: appointmentId, tenantId },
    });

    if (!appointment) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'appointmentNotFound',
      });
    }

    return appointment;
  }

  private async loadPrimaryVehicleImages(vehicleIds: number[]) {
    const uniqueIds = [...new Set(vehicleIds)];

    if (!uniqueIds.length) {
      return new Map<number, string>();
    }

    const media = await this.vehicleMediaRepository
      .createQueryBuilder('media')
      .where('media.kind = :kind', { kind: VehicleMediaKind.Image })
      .andWhere('media.vehicleId IN (:...ids)', { ids: uniqueIds })
      .orderBy('media.sortOrder', 'ASC')
      .addOrderBy('media.id', 'ASC')
      .getMany();

    const imageByVehicleId = new Map<number, string>();

    for (const item of media) {
      const vehicleId = (item as VehicleMediaEntity & { vehicleId?: number })
        .vehicleId;

      if (vehicleId && !imageByVehicleId.has(vehicleId)) {
        imageByVehicleId.set(vehicleId, item.url);
      }
    }

    return imageByVehicleId;
  }

  private buildStaff(
    tenantId: number,
    branches: Awaited<ReturnType<BranchesService['findByTenantId']>>,
    memberships: Awaited<ReturnType<AccessService['findTenantMemberships']>>,
  ) {
    const branchIdByManagerId = new Map<number, number>();
    for (const branch of branches) {
      if (branch.manager?.id) {
        branchIdByManagerId.set(Number(branch.manager.id), Number(branch.id));
      }
    }

    const defaultBranchId = String(branches[0]?.id ?? '');

    return memberships
      .filter((membership) => membership.user?.id)
      .map((membership) => {
        const userId = Number(membership.user.id);
        const branchId =
          membership.assignedBranches?.[0]?.id ??
          branchIdByManagerId.get(userId) ??
          branches[0]?.id;

        return {
          id: String(userId),
          tenantId: String(tenantId),
          branchId: String(branchId ?? defaultBranchId),
          name: [membership.user.firstName, membership.user.lastName]
            .filter(Boolean)
            .join(' '),
          email: membership.user.email ?? '',
          role: this.mapMembershipRole(membership.role?.key),
          whatsappNumber: null,
          isAvailable: true,
        };
      });
  }

  private mapMembershipRole(
    roleKey?: string | null,
  ): 'owner' | 'manager' | 'salesperson' {
    if (roleKey === 'owner' || roleKey === 'tenant-admin') {
      return roleKey === 'owner' ? 'owner' : 'manager';
    }

    if (roleKey === 'manager') {
      return 'manager';
    }

    return 'salesperson';
  }

  private async resolveBranch(tenantId: number, branchId?: number) {
    const branches = await this.branchesService.findByTenantId(tenantId);

    if (!branches.length) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'tenantHasNoBranches',
      });
    }

    const branch = branches.find((item) => item.id === branchId) ?? branches[0];

    if (!branch) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'branchNotFound',
      });
    }

    return branch;
  }

  private async resolveLeadVehicleId(
    tenantId: number,
    vehicleId?: number | null,
  ): Promise<number | null> {
    if (!vehicleId) {
      return null;
    }

    const vehicle = await this.vehicleRepository.findOne({
      where: { id: vehicleId, tenant: { id: tenantId } },
    });

    if (!vehicle) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'vehicleNotFound',
      });
    }

    return vehicle.id;
  }

  private async persistCapturedLead(input: {
    tenantId: number;
    branchId: number;
    source: LeadSource;
    customerName: string;
    customerPhone: string;
    interestSummary: string;
    vehicleId?: number | null;
  }): Promise<SalesLeadEntity> {
    const now = new Date();
    const slaDueAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    let lead = await this.leadRepository.save(
      this.leadRepository.create({
        tenantId: input.tenantId,
        branchId: input.branchId,
        source: input.source,
        status: LeadStatus.New,
        priority: LeadPriority.Normal,
        customerName: input.customerName,
        customerPhone: input.customerPhone,
        interestSummary: input.interestSummary,
        vehicleId: input.vehicleId ?? null,
        assignedUserId: null,
        assignmentReason: null,
        unread: true,
        slaDueAt,
        lastActivityAt: now,
      }),
    );

    await this.assignmentEngineService.applyToLead(lead);
    lead = await this.leadRepository.findOneByOrFail({ id: lead.id });

    await this.salesNotificationService.create({
      tenantId: input.tenantId,
      kind: NotificationKind.NewLead,
      title: `New ${leadSourceLabel(input.source)} lead`,
      body: `${lead.customerName} — ${input.interestSummary}`,
      leadId: lead.id,
    });

    return lead;
  }

  private async getTenantOrThrow(tenantId: number) {
    const tenant = await this.tenantsService.findById(tenantId);

    if (!tenant) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'tenantNotFound',
      });
    }

    return tenant;
  }

  private async getLeadOrThrow(tenantId: number, leadId: number) {
    const lead = await this.leadRepository.findOne({
      where: { id: leadId, tenantId },
    });

    if (!lead) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'leadNotFound',
      });
    }

    return lead;
  }

  private async notifyDealEnteredStage(
    tenantId: number,
    deal: SalesDealEntity,
    lead: SalesLeadEntity,
    stageKey: string,
    pipeline: Awaited<ReturnType<SalesPipelineService['getPipeline']>>,
  ) {
    const trigger = resolvePipelineStageNotification({
      stageKey,
      stageLabel: this.stageLabel(pipeline, stageKey),
      customerName: lead.customerName,
      dealTitle: deal.title,
    });

    if (!trigger) {
      return;
    }

    await this.salesNotificationService.createForDealStageIfAbsent({
      tenantId,
      kind: trigger.kind,
      title: trigger.title,
      body: trigger.body,
      leadId: lead.id,
      dealId: deal.id,
    });
  }

  private stageLabel(
    pipeline: Awaited<ReturnType<SalesPipelineService['getPipeline']>>,
    stageKey: string,
  ) {
    return (
      pipeline.stages.find((stage) => stage.stageKey === stageKey)?.label ??
      stageKey
    );
  }

  private async recordDealActivity(
    tenantId: number,
    leadId: number,
    dealId: number,
    summary: string,
    type: SalesActivityType,
    automated: boolean,
  ) {
    const trimmed = summary.trim().slice(0, 500);

    if (!trimmed) {
      return;
    }

    const now = new Date();

    await this.activityRepository.save(
      this.activityRepository.create({
        tenantId,
        leadId,
        dealId,
        type,
        summary: trimmed,
        status: FollowUpStatus.Completed,
        automated,
        completedAt: now,
      }),
    );
  }

  private async getFollowUpRuleOrThrow(tenantId: number, ruleId: number) {
    const rule = await this.followUpRuleRepository.findOne({
      where: { id: ruleId, tenantId },
    });

    if (!rule) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'followUpRuleNotFound',
      });
    }

    return rule;
  }

  private async getAssignmentRuleOrThrow(tenantId: number, ruleId: number) {
    const rule = await this.assignmentRuleRepository.findOne({
      where: { id: ruleId, tenantId },
    });

    if (!rule) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'assignmentRuleNotFound',
      });
    }

    return rule;
  }

  private async getDealOrThrow(tenantId: number, dealId: number) {
    const deal = await this.dealRepository.findOne({
      where: { id: dealId, tenantId },
    });

    if (!deal) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'dealNotFound',
      });
    }

    return deal;
  }
}
