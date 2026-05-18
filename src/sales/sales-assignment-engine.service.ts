import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { AccessService } from '../access/access.service';
import { BranchesService } from '../branches/branches.service';
import {
  AssignmentRuleType,
  LeadStatus,
  NotificationKind,
} from './domain/sales.enums';
import { SalesAssignmentRuleEntity } from './infrastructure/persistence/relational/entities/sales-assignment-rule.entity';
import { SalesConversationEntity } from './infrastructure/persistence/relational/entities/sales-conversation.entity';
import { SalesDealEntity } from './infrastructure/persistence/relational/entities/sales-deal.entity';
import { SalesLeadEntity } from './infrastructure/persistence/relational/entities/sales-lead.entity';
import { SalesNotificationService } from './sales-notification.service';

type AssignmentCandidate = {
  userId: number;
  roleKey: string;
  branchIds: Set<number>;
};

export type LeadAssignmentContext = {
  tenantId: number;
  branchId: number;
  branchCode: string;
  branchCity: string;
  interestSummary: string;
};

@Injectable()
export class SalesAssignmentEngineService {
  constructor(
    @InjectRepository(SalesAssignmentRuleEntity)
    private readonly assignmentRuleRepository: Repository<SalesAssignmentRuleEntity>,
    @InjectRepository(SalesLeadEntity)
    private readonly leadRepository: Repository<SalesLeadEntity>,
    @InjectRepository(SalesDealEntity)
    private readonly dealRepository: Repository<SalesDealEntity>,
    @InjectRepository(SalesConversationEntity)
    private readonly conversationRepository: Repository<SalesConversationEntity>,
    private readonly salesNotificationService: SalesNotificationService,
    private readonly accessService: AccessService,
    private readonly branchesService: BranchesService,
  ) {}

  async evaluateUnassignedLeads(tenantId: number): Promise<number> {
    const leads = await this.leadRepository.find({
      where: { tenantId, assignedUserId: IsNull() },
    });

    let assigned = 0;

    for (const lead of leads) {
      const applied = await this.applyToLead(lead);

      if (applied) {
        assigned += 1;
      }
    }

    return assigned;
  }

  async applyToLead(lead: SalesLeadEntity): Promise<boolean> {
    if (lead.assignedUserId) {
      return false;
    }

    const branches = await this.branchesService.findByTenantId(lead.tenantId);
    const branch = branches.find((item) => item.id === lead.branchId);

    if (!branch) {
      return false;
    }

    const resolution = await this.resolveAssignment(lead.tenantId, {
      tenantId: lead.tenantId,
      branchId: lead.branchId,
      branchCode: branch.code,
      branchCity: branch.city,
      interestSummary: lead.interestSummary,
    });

    if (!resolution) {
      return false;
    }

    const now = new Date();
    lead.assignedUserId = resolution.userId;
    lead.assignmentReason = resolution.reason;
    lead.lastActivityAt = now;
    await this.leadRepository.save(lead);

    await this.dealRepository.update(
      { tenantId: lead.tenantId, leadId: lead.id },
      {
        assignedUserId: resolution.userId,
        assignmentReason: resolution.reason,
      },
    );

    await this.conversationRepository.update(
      { tenantId: lead.tenantId, leadId: lead.id },
      { assignedUserId: resolution.userId },
    );

    await this.salesNotificationService.create({
      tenantId: lead.tenantId,
      kind: NotificationKind.ReassignedLead,
      title: 'Lead assigned',
      body: `${lead.customerName} — ${resolution.reason}`,
      leadId: lead.id,
    });

    return true;
  }

  async resolveAssignment(
    tenantId: number,
    context: LeadAssignmentContext,
  ): Promise<{ userId: number; reason: string } | null> {
    const rules = await this.assignmentRuleRepository.find({
      where: { tenantId, enabled: true },
      order: { priority: 'ASC' },
    });

    if (rules.length === 0) {
      return null;
    }

    const candidates = await this.loadCandidates(tenantId, context.branchId);

    if (candidates.length === 0) {
      return null;
    }

    for (const rule of rules) {
      const userId = await this.applyRule(rule, context, candidates, tenantId);

      if (userId) {
        return {
          userId,
          reason: `${rule.label} (${rule.type.replace(/_/g, ' ')})`,
        };
      }
    }

    return null;
  }

  private async applyRule(
    rule: SalesAssignmentRuleEntity,
    context: LeadAssignmentContext,
    candidates: AssignmentCandidate[],
    tenantId: number,
  ): Promise<number | null> {
    switch (rule.type) {
      case AssignmentRuleType.Manual:
        return null;
      case AssignmentRuleType.Branch:
        return this.pickRoundRobin(
          tenantId,
          candidates.filter((candidate) =>
            candidate.branchIds.has(context.branchId),
          ),
        );
      case AssignmentRuleType.RoundRobin:
        return this.pickRoundRobin(tenantId, candidates);
      case AssignmentRuleType.Availability:
        return this.pickRoundRobin(
          tenantId,
          candidates.filter((candidate) => candidate.roleKey !== 'owner'),
        );
      case AssignmentRuleType.VehicleType:
        return this.applyVehicleTypeRule(context, candidates, tenantId);
      case AssignmentRuleType.Geography:
        return this.applyGeographyRule(context, candidates, tenantId);
      default:
        return null;
    }
  }

  private async applyVehicleTypeRule(
    context: LeadAssignmentContext,
    candidates: AssignmentCandidate[],
    tenantId: number,
  ): Promise<number | null> {
    const summary = context.interestSummary.toLowerCase();
    const suvKeywords = [
      'suv',
      'prado',
      'land cruiser',
      'cx-5',
      'forester',
      'rav4',
      'x-trail',
    ];
    const truckKeywords = [
      'truck',
      'pickup',
      'double cab',
      'hilux',
      'ranger',
      'd-max',
    ];

    const isSuv = suvKeywords.some((keyword) => summary.includes(keyword));
    const isTruck = truckKeywords.some((keyword) => summary.includes(keyword));

    if (!isSuv && !isTruck) {
      return null;
    }

    return this.pickRoundRobin(tenantId, candidates);
  }

  private async applyGeographyRule(
    context: LeadAssignmentContext,
    candidates: AssignmentCandidate[],
    tenantId: number,
  ): Promise<number | null> {
    const summary = context.interestSummary.toLowerCase();
    const branches = await this.branchesService.findByTenantId(tenantId);
    const matchedBranch = branches.find(
      (branch) =>
        summary.includes(branch.city.toLowerCase()) ||
        summary.includes(branch.code.toLowerCase()) ||
        summary.includes(branch.name.toLowerCase()),
    );

    if (!matchedBranch) {
      return null;
    }

    return this.pickRoundRobin(
      tenantId,
      candidates.filter((candidate) =>
        candidate.branchIds.has(matchedBranch.id),
      ),
    );
  }

  private async pickRoundRobin(
    tenantId: number,
    candidates: AssignmentCandidate[],
  ): Promise<number | null> {
    if (candidates.length === 0) {
      return null;
    }

    const userIds = candidates.map((candidate) => candidate.userId);
    const counts = await this.leadRepository
      .createQueryBuilder('lead')
      .select('lead.assignedUserId', 'userId')
      .addSelect('COUNT(*)', 'count')
      .where('lead.tenantId = :tenantId', { tenantId })
      .andWhere('lead.assignedUserId IN (:...userIds)', { userIds })
      .andWhere('lead.status NOT IN (:...closedStatuses)', {
        closedStatuses: [LeadStatus.Won, LeadStatus.Lost],
      })
      .groupBy('lead.assignedUserId')
      .getRawMany<{ userId: string; count: string }>();

    const countByUserId = new Map(
      counts.map((row) => [Number(row.userId), Number(row.count)]),
    );

    const sorted = [...candidates].sort((a, b) => {
      const aCount = countByUserId.get(a.userId) ?? 0;
      const bCount = countByUserId.get(b.userId) ?? 0;

      return aCount - bCount || a.userId - b.userId;
    });

    return sorted[0]?.userId ?? null;
  }

  private async loadCandidates(
    tenantId: number,
    branchId: number,
  ): Promise<AssignmentCandidate[]> {
    const [memberships, branches] = await Promise.all([
      this.accessService.findTenantMemberships(tenantId),
      this.branchesService.findByTenantId(tenantId),
    ]);

    const managerIdByBranchId = new Map<number, number>();

    for (const branch of branches) {
      if (branch.manager?.id) {
        managerIdByBranchId.set(Number(branch.id), Number(branch.manager.id));
      }
    }

    const candidates: AssignmentCandidate[] = [];

    for (const membership of memberships) {
      const userId = membership.user?.id;

      if (!userId) {
        continue;
      }

      const branchIds = new Set<number>(
        (membership.assignedBranches ?? []).map((branch) => Number(branch.id)),
      );

      if (managerIdByBranchId.get(branchId) === Number(userId)) {
        branchIds.add(branchId);
      }

      for (const [managedBranchId, managerId] of managerIdByBranchId) {
        if (managerId === Number(userId)) {
          branchIds.add(managedBranchId);
        }
      }

      if (branchIds.size === 0) {
        branchIds.add(branchId);
      }

      candidates.push({
        userId: Number(userId),
        roleKey: membership.role?.key ?? 'salesperson',
        branchIds,
      });
    }

    return candidates;
  }
}
