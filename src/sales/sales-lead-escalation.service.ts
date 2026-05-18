import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import {
  LeadPriority,
  LeadStatus,
  NotificationKind,
} from './domain/sales.enums';
import { SalesLeadEntity } from './infrastructure/persistence/relational/entities/sales-lead.entity';
import { SalesNotificationEntity } from './infrastructure/persistence/relational/entities/sales-notification.entity';
import { SalesNotificationService } from './sales-notification.service';

const CLOSED_LEAD_STATUSES = new Set([LeadStatus.Won, LeadStatus.Lost]);
const ESCALATION_TAG = '[escalation]';
const UNASSIGNED_ESCALATION_MINUTES = 30;
const UNREAD_IDLE_MINUTES = 120;

export type LeadEscalationReason =
  | 'unassigned'
  | 'sla_breached'
  | 'unread_idle';

@Injectable()
export class SalesLeadEscalationService {
  constructor(
    @InjectRepository(SalesLeadEntity)
    private readonly leadRepository: Repository<SalesLeadEntity>,
    @InjectRepository(SalesNotificationEntity)
    private readonly notificationRepository: Repository<SalesNotificationEntity>,
    private readonly salesNotificationService: SalesNotificationService,
  ) {}

  async evaluateTenant(tenantId: number): Promise<number> {
    const leads = await this.leadRepository.find({
      where: { tenantId },
    });
    const now = new Date();
    let escalated = 0;

    for (const lead of leads) {
      const applied = await this.escalateLeadIfNeeded(lead, now);

      if (applied) {
        escalated += 1;
      }
    }

    return escalated;
  }

  private async escalateLeadIfNeeded(
    lead: SalesLeadEntity,
    now: Date,
  ): Promise<boolean> {
    if (CLOSED_LEAD_STATUSES.has(lead.status)) {
      return false;
    }

    if (lead.priority === LeadPriority.Urgent) {
      return false;
    }

    const reason = this.resolveEscalationReason(lead, now);

    if (!reason) {
      return false;
    }

    if (await this.hasOpenEscalationNotification(lead.tenantId, lead.id)) {
      return false;
    }

    lead.priority = LeadPriority.Urgent;
    lead.lastActivityAt = now;
    await this.leadRepository.save(lead);

    await this.salesNotificationService.create({
      tenantId: lead.tenantId,
      kind: NotificationKind.MissedFollowUp,
      title: 'Lead escalated',
      body: `${ESCALATION_TAG} ${lead.customerName} — ${this.reasonLabel(reason)}`,
      leadId: lead.id,
    });

    return true;
  }

  private resolveEscalationReason(
    lead: SalesLeadEntity,
    now: Date,
  ): LeadEscalationReason | null {
    if (!lead.assignedUserId) {
      const minutesSinceCreated =
        (now.getTime() - lead.createdAt.getTime()) / 60_000;

      if (minutesSinceCreated >= UNASSIGNED_ESCALATION_MINUTES) {
        return 'unassigned';
      }
    }

    if (lead.slaDueAt.getTime() <= now.getTime()) {
      return 'sla_breached';
    }

    if (lead.unread) {
      const idleMinutes =
        (now.getTime() - lead.lastActivityAt.getTime()) / 60_000;

      if (idleMinutes >= UNREAD_IDLE_MINUTES) {
        return 'unread_idle';
      }
    }

    return null;
  }

  private reasonLabel(reason: LeadEscalationReason): string {
    switch (reason) {
      case 'unassigned':
        return 'still unassigned after assignment rules ran';
      case 'sla_breached':
        return 'response SLA breached';
      case 'unread_idle':
        return 'unread with no recent activity';
      default:
        return 'needs manager attention';
    }
  }

  private async hasOpenEscalationNotification(
    tenantId: number,
    leadId: number,
  ): Promise<boolean> {
    const existing = await this.notificationRepository.findOne({
      where: {
        tenantId,
        leadId,
        read: false,
        body: Like(`${ESCALATION_TAG}%`),
      },
    });

    return Boolean(existing);
  }
}
