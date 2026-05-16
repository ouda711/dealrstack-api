import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessService } from '../access/access.service';
import { BranchesService } from '../branches/branches.service';
import { TenantsService } from '../tenants/tenants.service';
import { AssignSalesLeadDto } from './dto/assign-sales-lead.dto';
import { MoveSalesDealStageDto } from './dto/move-sales-deal-stage.dto';
import { SalesWorkspaceSnapshotDto } from './domain/sales-workspace';
import { SalesActivityEntity } from './infrastructure/persistence/relational/entities/sales-activity.entity';
import { SalesAssignmentRuleEntity } from './infrastructure/persistence/relational/entities/sales-assignment-rule.entity';
import { SalesConversationEntity } from './infrastructure/persistence/relational/entities/sales-conversation.entity';
import { SalesDealEntity } from './infrastructure/persistence/relational/entities/sales-deal.entity';
import { SalesFollowUpRuleEntity } from './infrastructure/persistence/relational/entities/sales-follow-up-rule.entity';
import { SalesLeadEntity } from './infrastructure/persistence/relational/entities/sales-lead.entity';
import { SalesMessageEntity } from './infrastructure/persistence/relational/entities/sales-message.entity';
import { SalesNotificationEntity } from './infrastructure/persistence/relational/entities/sales-notification.entity';

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
    @InjectRepository(SalesAssignmentRuleEntity)
    private readonly assignmentRuleRepository: Repository<SalesAssignmentRuleEntity>,
    @InjectRepository(SalesFollowUpRuleEntity)
    private readonly followUpRuleRepository: Repository<SalesFollowUpRuleEntity>,
    private readonly tenantsService: TenantsService,
    private readonly branchesService: BranchesService,
    private readonly accessService: AccessService,
  ) {}

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
      order: { lastActivityAt: 'DESC' },
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
    const activities = await this.activityRepository.find({
      where: { tenantId },
      order: { createdAt: 'DESC' },
    });
    const notifications = await this.notificationRepository.find({
      where: { tenantId },
      order: { createdAt: 'DESC' },
    });
    const assignmentRules = await this.assignmentRuleRepository.find({
      where: { tenantId },
      order: { priority: 'ASC' },
    });
    const followUpRules = await this.followUpRuleRepository.find({
      where: { tenantId },
    });

    const conversationIdByLeadId = new Map(
      conversations.map((c) => [c.leadId, c.id]),
    );

    const staff = this.buildStaff(tenantId, branches, memberships);

    return {
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
      leads: leads.map((lead) => ({
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
        createdAt: lead.createdAt.toISOString(),
        conversationId: conversationIdByLeadId.has(lead.id)
          ? String(conversationIdByLeadId.get(lead.id))
          : null,
      })),
      deals: deals.map((deal) => ({
        id: String(deal.id),
        tenantId: String(deal.tenantId),
        branchId: String(deal.branchId),
        leadId: String(deal.leadId),
        vehicleId: null,
        conversationId: deal.conversationId
          ? String(deal.conversationId)
          : null,
        stage: deal.stageKey,
        title: deal.title,
        valueKes: Number(deal.valueKes),
        assignedStaffId: String(deal.assignedUserId),
        assignmentReason: deal.assignmentReason ?? null,
        lastActivityAt: deal.lastActivityAt.toISOString(),
        createdAt: deal.createdAt.toISOString(),
        inactiveDays: deal.inactiveDays,
        slaDueAt: deal.slaDueAt?.toISOString() ?? null,
      })),
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
      activities: activities.map((activity) => ({
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
      notifications: notifications.map((notification) => ({
        id: String(notification.id),
        tenantId: String(notification.tenantId),
        kind: notification.kind,
        title: notification.title,
        body: notification.body,
        leadId: notification.leadId ? String(notification.leadId) : null,
        dealId: notification.dealId ? String(notification.dealId) : null,
        read: notification.read,
        createdAt: notification.createdAt.toISOString(),
      })),
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
    };
  }

  async moveDealStage(
    tenantId: number,
    dealId: number,
    dto: MoveSalesDealStageDto,
  ) {
    const deal = await this.getDealOrThrow(tenantId, dealId);
    deal.stageKey = dto.stageKey;
    deal.lastActivityAt = new Date();
    deal.inactiveDays = 0;
    await this.dealRepository.save(deal);
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

  async markNotificationRead(tenantId: number, notificationId: number) {
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
    return this.getWorkspace(tenantId);
  }

  async markAllNotificationsRead(tenantId: number) {
    await this.notificationRepository.update(
      { tenantId, read: false },
      { read: true },
    );
    return this.getWorkspace(tenantId);
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
