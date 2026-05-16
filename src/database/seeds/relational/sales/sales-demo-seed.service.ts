import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BranchEntity } from '../../../../branches/infrastructure/persistence/relational/entities/branch.entity';
import { SalesActivityEntity } from '../../../../sales/infrastructure/persistence/relational/entities/sales-activity.entity';
import { SalesAssignmentRuleEntity } from '../../../../sales/infrastructure/persistence/relational/entities/sales-assignment-rule.entity';
import { SalesConversationEntity } from '../../../../sales/infrastructure/persistence/relational/entities/sales-conversation.entity';
import { SalesDealEntity } from '../../../../sales/infrastructure/persistence/relational/entities/sales-deal.entity';
import { SalesFollowUpRuleEntity } from '../../../../sales/infrastructure/persistence/relational/entities/sales-follow-up-rule.entity';
import { SalesLeadEntity } from '../../../../sales/infrastructure/persistence/relational/entities/sales-lead.entity';
import { SalesMessageEntity } from '../../../../sales/infrastructure/persistence/relational/entities/sales-message.entity';
import { SalesNotificationEntity } from '../../../../sales/infrastructure/persistence/relational/entities/sales-notification.entity';
import { TenantEntity } from '../../../../tenants/infrastructure/persistence/relational/entities/tenant.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import {
  NAIROBI_DEMO_ACTIVITIES,
  NAIROBI_DEMO_ASSIGNMENT_RULES,
  NAIROBI_DEMO_CONVERSATIONS,
  NAIROBI_DEMO_DEALS,
  NAIROBI_DEMO_FOLLOW_UP_RULES,
  NAIROBI_DEMO_LEADS,
  NAIROBI_DEMO_MESSAGES,
  NAIROBI_DEMO_NOTIFICATIONS,
} from './sales-demo-seed.data';

@Injectable()
export class SalesDemoSeedService {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>,
    @InjectRepository(BranchEntity)
    private readonly branchRepository: Repository<BranchEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SalesLeadEntity)
    private readonly leadRepository: Repository<SalesLeadEntity>,
    @InjectRepository(SalesConversationEntity)
    private readonly conversationRepository: Repository<SalesConversationEntity>,
    @InjectRepository(SalesDealEntity)
    private readonly dealRepository: Repository<SalesDealEntity>,
    @InjectRepository(SalesMessageEntity)
    private readonly messageRepository: Repository<SalesMessageEntity>,
    @InjectRepository(SalesActivityEntity)
    private readonly activityRepository: Repository<SalesActivityEntity>,
    @InjectRepository(SalesNotificationEntity)
    private readonly notificationRepository: Repository<SalesNotificationEntity>,
    @InjectRepository(SalesAssignmentRuleEntity)
    private readonly assignmentRuleRepository: Repository<SalesAssignmentRuleEntity>,
    @InjectRepository(SalesFollowUpRuleEntity)
    private readonly followUpRuleRepository: Repository<SalesFollowUpRuleEntity>,
  ) {}

  async run() {
    const tenant = await this.tenantRepository.findOne({
      where: { slug: 'nairobi-auto-hub' },
    });

    if (!tenant) {
      return;
    }

    const existingLead = await this.leadRepository.findOne({
      where: { tenantId: tenant.id, demoKey: 'lead-001' },
    });

    if (existingLead) {
      return;
    }

    const branches = await this.branchRepository.find({
      where: { tenant: { id: tenant.id } },
    });
    const branchByCode = new Map(branches.map((b) => [b.code, b]));

    const users = await this.userRepository.find();
    const userByEmail = new Map(
      users.filter((u) => u.email).map((u) => [u.email!.toLowerCase(), u]),
    );

    const resolveUser = (email: string | null | undefined) => {
      if (!email) return null;
      return userByEmail.get(email.toLowerCase()) ?? null;
    };

    const leadIdByDemoKey = new Map<string, number>();

    for (const lead of NAIROBI_DEMO_LEADS) {
      const branch = branchByCode.get(lead.branchCode);
      if (!branch) continue;

      const assignedUser = resolveUser(lead.assigneeEmail);
      const saved = await this.leadRepository.save(
        this.leadRepository.create({
          tenantId: tenant.id,
          branchId: branch.id,
          demoKey: lead.demoKey,
          source: lead.source,
          status: lead.status,
          priority: lead.priority,
          customerName: lead.customerName,
          customerPhone: lead.customerPhone,
          interestSummary: lead.interestSummary,
          assignedUserId: assignedUser?.id ?? null,
          assignmentReason: lead.assignmentReason,
          unread: lead.unread,
          slaDueAt: lead.slaDueAt,
          lastActivityAt: lead.lastActivityAt,
          createdAt: lead.createdAt,
        }),
      );
      leadIdByDemoKey.set(lead.demoKey, saved.id);
    }

    const conversationIdByDemoKey = new Map<string, number>();

    for (const conversation of NAIROBI_DEMO_CONVERSATIONS) {
      const leadId = leadIdByDemoKey.get(conversation.leadDemoKey);
      const lead = await this.leadRepository.findOne({ where: { id: leadId } });
      if (!lead) continue;

      const assignedUser = resolveUser(conversation.assigneeEmail);
      if (!assignedUser) continue;

      const saved = await this.conversationRepository.save(
        this.conversationRepository.create({
          tenantId: tenant.id,
          branchId: lead.branchId,
          leadId: lead.id,
          demoKey: conversation.demoKey,
          customerName: lead.customerName,
          customerPhone: lead.customerPhone,
          assignedUserId: assignedUser.id,
          unreadCount: conversation.unreadCount,
          lastMessagePreview: conversation.lastMessagePreview,
          lastMessageAt: conversation.lastMessageAt,
          internalNotes:
            'internalNotes' in conversation
              ? (conversation.internalNotes ?? null)
              : null,
        }),
      );
      conversationIdByDemoKey.set(conversation.demoKey, saved.id);
    }

    const dealIdByDemoKey = new Map<string, number>();

    for (const deal of NAIROBI_DEMO_DEALS) {
      const leadId = leadIdByDemoKey.get(deal.leadDemoKey);
      const lead = await this.leadRepository.findOne({ where: { id: leadId } });
      if (!lead) continue;

      const assignedUser = resolveUser(deal.assigneeEmail);
      if (!assignedUser) continue;

      const conversationId =
        'conversationDemoKey' in deal && deal.conversationDemoKey
          ? conversationIdByDemoKey.get(deal.conversationDemoKey)
          : null;

      const saved = await this.dealRepository.save(
        this.dealRepository.create({
          tenantId: tenant.id,
          branchId: lead.branchId,
          leadId: lead.id,
          conversationId: conversationId ?? null,
          demoKey: deal.demoKey,
          stageKey: deal.stageKey,
          title: deal.title,
          valueKes: String(deal.valueKes),
          assignedUserId: assignedUser.id,
          assignmentReason:
            'assignmentReason' in deal ? (deal.assignmentReason ?? null) : null,
          lastActivityAt: deal.lastActivityAt,
          inactiveDays: deal.inactiveDays,
          slaDueAt: 'slaDueAt' in deal ? (deal.slaDueAt ?? null) : null,
          createdAt: deal.createdAt,
        }),
      );
      dealIdByDemoKey.set(deal.demoKey, saved.id);
    }

    for (const message of NAIROBI_DEMO_MESSAGES) {
      const conversationId = conversationIdByDemoKey.get(
        message.conversationDemoKey,
      );
      if (!conversationId) continue;

      await this.messageRepository.save(
        this.messageRepository.create({
          conversationId,
          demoKey: message.demoKey,
          direction: message.direction,
          body: message.body,
          sentAt: message.sentAt,
        }),
      );
    }

    for (const activity of NAIROBI_DEMO_ACTIVITIES) {
      await this.activityRepository.save(
        this.activityRepository.create({
          tenantId: tenant.id,
          demoKey: activity.demoKey,
          leadId: activity.leadDemoKey
            ? leadIdByDemoKey.get(activity.leadDemoKey)
            : null,
          dealId:
            'dealDemoKey' in activity && activity.dealDemoKey
              ? dealIdByDemoKey.get(activity.dealDemoKey)
              : null,
          type: activity.type,
          summary: activity.summary,
          dueAt: 'dueAt' in activity ? (activity.dueAt ?? null) : null,
          completedAt:
            'completedAt' in activity ? (activity.completedAt ?? null) : null,
          status: activity.status,
          automated: activity.automated,
          createdAt: activity.createdAt,
        }),
      );
    }

    for (const notification of NAIROBI_DEMO_NOTIFICATIONS) {
      await this.notificationRepository.save(
        this.notificationRepository.create({
          tenantId: tenant.id,
          demoKey: notification.demoKey,
          kind: notification.kind,
          title: notification.title,
          body: notification.body,
          leadId: notification.leadDemoKey
            ? leadIdByDemoKey.get(notification.leadDemoKey)
            : null,
          dealId:
            'dealDemoKey' in notification && notification.dealDemoKey
              ? dealIdByDemoKey.get(notification.dealDemoKey)
              : null,
          read: notification.read,
          createdAt: notification.createdAt,
        }),
      );
    }

    for (const rule of NAIROBI_DEMO_ASSIGNMENT_RULES) {
      await this.assignmentRuleRepository.save(
        this.assignmentRuleRepository.create({
          tenantId: tenant.id,
          demoKey: rule.demoKey,
          type: rule.type,
          label: rule.label,
          description: rule.description,
          enabled: rule.enabled,
          priority: rule.priority,
        }),
      );
    }

    for (const rule of NAIROBI_DEMO_FOLLOW_UP_RULES) {
      await this.followUpRuleRepository.save(
        this.followUpRuleRepository.create({
          tenantId: tenant.id,
          demoKey: rule.demoKey,
          label: rule.label,
          trigger: rule.trigger,
          delayMinutes: rule.delayMinutes,
          enabled: rule.enabled,
        }),
      );
    }
  }
}
