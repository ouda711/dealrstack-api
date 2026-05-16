import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Like, Repository } from 'typeorm';
import {
  FollowUpStatus,
  MessageDirection,
  NotificationKind,
  SalesActivityType,
} from './domain/sales.enums';
import { SalesActivityEntity } from './infrastructure/persistence/relational/entities/sales-activity.entity';
import { SalesConversationEntity } from './infrastructure/persistence/relational/entities/sales-conversation.entity';
import { SalesDealEntity } from './infrastructure/persistence/relational/entities/sales-deal.entity';
import { SalesFollowUpRuleEntity } from './infrastructure/persistence/relational/entities/sales-follow-up-rule.entity';
import { SalesLeadEntity } from './infrastructure/persistence/relational/entities/sales-lead.entity';
import { SalesMessageEntity } from './infrastructure/persistence/relational/entities/sales-message.entity';
import { SalesNotificationEntity } from './infrastructure/persistence/relational/entities/sales-notification.entity';

const TERMINAL_DEAL_STAGES = new Set(['sold', 'lost']);
const CLOSED_LEAD_STATUSES = new Set(['won', 'lost']);

export const FOLLOW_UP_TRIGGER = {
  WhatsappNoReply: 'whatsapp_no_reply_10m',
  LeadIdle: 'lead_idle_24h',
  DealIdle: 'deal_idle_3d',
} as const;

function automationSummaryPrefix(ruleId: number): string {
  return `[rule:${ruleId}]`;
}

function minutesSince(date: Date, now: Date): number {
  return Math.max(0, (now.getTime() - date.getTime()) / 60_000);
}

@Injectable()
export class SalesFollowUpAutomationService {
  constructor(
    @InjectRepository(SalesActivityEntity)
    private readonly activityRepository: Repository<SalesActivityEntity>,
    @InjectRepository(SalesNotificationEntity)
    private readonly notificationRepository: Repository<SalesNotificationEntity>,
  ) {}

  async evaluateTenant(input: {
    tenantId: number;
    rules: SalesFollowUpRuleEntity[];
    leads: SalesLeadEntity[];
    deals: SalesDealEntity[];
    conversations: SalesConversationEntity[];
    messages: SalesMessageEntity[];
  }): Promise<void> {
    const now = new Date();
    const enabledRules = input.rules.filter((rule) => rule.enabled);

    await this.markDueActivitiesOverdue(input.tenantId, now);

    if (enabledRules.length === 0) {
      return;
    }

    const messagesByConversationId = new Map<number, SalesMessageEntity[]>();

    for (const message of input.messages) {
      const bucket = messagesByConversationId.get(message.conversationId) ?? [];
      bucket.push(message);
      messagesByConversationId.set(message.conversationId, bucket);
    }

    for (const bucket of messagesByConversationId.values()) {
      bucket.sort((a, b) => a.sentAt.getTime() - b.sentAt.getTime());
    }

    const conversationByLeadId = new Map(
      input.conversations.map((conversation) => [
        conversation.leadId,
        conversation,
      ]),
    );
    const dealByLeadId = new Map(
      input.deals.map((deal) => [deal.leadId, deal]),
    );

    for (const rule of enabledRules) {
      switch (rule.trigger) {
        case FOLLOW_UP_TRIGGER.WhatsappNoReply:
          await this.evaluateWhatsappNoReply({
            tenantId: input.tenantId,
            rule,
            leads: input.leads,
            conversationByLeadId,
            messagesByConversationId,
            dealByLeadId,
            now,
          });
          break;
        case FOLLOW_UP_TRIGGER.LeadIdle:
          await this.evaluateLeadIdle({
            tenantId: input.tenantId,
            rule,
            leads: input.leads,
            dealByLeadId,
            now,
          });
          break;
        case FOLLOW_UP_TRIGGER.DealIdle:
          await this.evaluateDealIdle({
            tenantId: input.tenantId,
            rule,
            deals: input.deals,
            now,
          });
          break;
        default:
          break;
      }
    }
  }

  private async markDueActivitiesOverdue(tenantId: number, now: Date) {
    const dueActivities = await this.activityRepository.find({
      where: {
        tenantId,
        automated: true,
        status: FollowUpStatus.Pending,
      },
    });

    for (const activity of dueActivities) {
      if (!activity.dueAt || activity.dueAt.getTime() > now.getTime()) {
        continue;
      }

      activity.status = FollowUpStatus.Overdue;
      await this.activityRepository.save(activity);

      if (activity.leadId) {
        await this.createMissedFollowUpNotification({
          tenantId,
          leadId: activity.leadId,
          dealId: activity.dealId ?? null,
          body: activity.summary,
        });
      }
    }
  }

  private async evaluateWhatsappNoReply(input: {
    tenantId: number;
    rule: SalesFollowUpRuleEntity;
    leads: SalesLeadEntity[];
    conversationByLeadId: Map<number, SalesConversationEntity>;
    messagesByConversationId: Map<number, SalesMessageEntity[]>;
    dealByLeadId: Map<number, SalesDealEntity>;
    now: Date;
  }) {
    for (const lead of input.leads) {
      if (CLOSED_LEAD_STATUSES.has(lead.status)) {
        continue;
      }

      const conversation = input.conversationByLeadId.get(lead.id);

      if (!conversation) {
        continue;
      }

      const messages =
        input.messagesByConversationId.get(conversation.id) ?? [];
      const lastInbound = [...messages]
        .reverse()
        .find((message) => message.direction === MessageDirection.Inbound);

      if (!lastInbound) {
        continue;
      }

      const repliedAfterInbound = messages.some(
        (message) =>
          message.direction === MessageDirection.Outbound &&
          message.sentAt.getTime() > lastInbound.sentAt.getTime(),
      );

      if (repliedAfterInbound) {
        continue;
      }

      if (
        minutesSince(lastInbound.sentAt, input.now) < input.rule.delayMinutes
      ) {
        continue;
      }

      const deal = input.dealByLeadId.get(lead.id);

      await this.ensureAutomatedFollowUp({
        tenantId: input.tenantId,
        rule: input.rule,
        leadId: lead.id,
        dealId: deal?.id ?? null,
        dueAt: new Date(
          lastInbound.sentAt.getTime() + input.rule.delayMinutes * 60_000,
        ),
        now: input.now,
        detail: `${lead.customerName} — reply on WhatsApp`,
      });
    }
  }

  private async evaluateLeadIdle(input: {
    tenantId: number;
    rule: SalesFollowUpRuleEntity;
    leads: SalesLeadEntity[];
    dealByLeadId: Map<number, SalesDealEntity>;
    now: Date;
  }) {
    for (const lead of input.leads) {
      if (CLOSED_LEAD_STATUSES.has(lead.status)) {
        continue;
      }

      if (
        minutesSince(lead.lastActivityAt, input.now) < input.rule.delayMinutes
      ) {
        continue;
      }

      const deal = input.dealByLeadId.get(lead.id);

      await this.ensureAutomatedFollowUp({
        tenantId: input.tenantId,
        rule: input.rule,
        leadId: lead.id,
        dealId: deal?.id ?? null,
        dueAt: new Date(
          lead.lastActivityAt.getTime() + input.rule.delayMinutes * 60_000,
        ),
        now: input.now,
        detail: `${lead.customerName} — re-engage lead`,
      });
    }
  }

  private async evaluateDealIdle(input: {
    tenantId: number;
    rule: SalesFollowUpRuleEntity;
    deals: SalesDealEntity[];
    now: Date;
  }) {
    for (const deal of input.deals) {
      if (TERMINAL_DEAL_STAGES.has(deal.stageKey)) {
        continue;
      }

      if (
        minutesSince(deal.lastActivityAt, input.now) < input.rule.delayMinutes
      ) {
        continue;
      }

      await this.ensureAutomatedFollowUp({
        tenantId: input.tenantId,
        rule: input.rule,
        leadId: deal.leadId,
        dealId: deal.id,
        dueAt: new Date(
          deal.lastActivityAt.getTime() + input.rule.delayMinutes * 60_000,
        ),
        now: input.now,
        detail: `${deal.title} — move deal forward`,
      });
    }
  }

  private async ensureAutomatedFollowUp(input: {
    tenantId: number;
    rule: SalesFollowUpRuleEntity;
    leadId: number;
    dealId: number | null;
    dueAt: Date;
    now: Date;
    detail: string;
  }) {
    const summary = `${automationSummaryPrefix(input.rule.id)} ${input.rule.label}`;

    const existing = await this.activityRepository.findOne({
      where: {
        tenantId: input.tenantId,
        leadId: input.leadId,
        dealId: input.dealId == null ? IsNull() : input.dealId,
        automated: true,
        status: In([FollowUpStatus.Pending, FollowUpStatus.Overdue]),
        summary: Like(`${automationSummaryPrefix(input.rule.id)}%`),
      },
    });

    if (existing) {
      return;
    }

    const status =
      input.dueAt.getTime() <= input.now.getTime()
        ? FollowUpStatus.Overdue
        : FollowUpStatus.Pending;

    await this.activityRepository.save(
      this.activityRepository.create({
        tenantId: input.tenantId,
        leadId: input.leadId,
        dealId: input.dealId,
        type: SalesActivityType.FollowUp,
        summary,
        dueAt: input.dueAt,
        status,
        automated: true,
      }),
    );

    if (status === FollowUpStatus.Overdue) {
      await this.createMissedFollowUpNotification({
        tenantId: input.tenantId,
        leadId: input.leadId,
        dealId: input.dealId,
        body: `${input.rule.label} — ${input.detail}`,
      });
    }
  }

  private async createMissedFollowUpNotification(input: {
    tenantId: number;
    leadId: number;
    dealId: number | null;
    body: string;
  }) {
    const recent = await this.notificationRepository.findOne({
      where: {
        tenantId: input.tenantId,
        leadId: input.leadId,
        kind: NotificationKind.MissedFollowUp,
        read: false,
      },
      order: { createdAt: 'DESC' },
    });

    if (recent) {
      return;
    }

    await this.notificationRepository.save(
      this.notificationRepository.create({
        tenantId: input.tenantId,
        kind: NotificationKind.MissedFollowUp,
        title: 'Follow-up overdue',
        body: input.body,
        leadId: input.leadId,
        dealId: input.dealId,
        read: false,
      }),
    );
  }
}
