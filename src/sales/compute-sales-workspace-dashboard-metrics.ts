import { MessageDirection } from './domain/sales.enums';
import { VehicleStatus } from '../vehicles/infrastructure/persistence/relational/entities/vehicle.entity';

const TERMINAL_DEAL_STAGES = new Set(['sold', 'lost']);

export type DashboardMetricsLead = {
  id: number;
  source: string;
  assignedUserId: number | null;
  createdAt: Date;
};

export type DashboardMetricsDeal = {
  stageKey: string;
  valueKes: number;
  assignedUserId: number;
};

export type DashboardMetricsStaff = {
  userId: number;
  name: string;
};

export type DashboardMetricsMessage = {
  conversationId: number;
  direction: MessageDirection;
  sentAt: Date;
};

export type DashboardMetricsVehicle = {
  createdAt: Date;
};

export type SalesWorkspaceDashboardMetrics = {
  avgResponseMinutes: number;
  leadsBySource: { source: string; count: number }[];
  conversionRatePct: number;
  openPipelineValueKes: number;
  wonDealsCount: number;
  lostDealsCount: number;
  inventoryAgingDaysAvg: number;
  overdueFollowUpsCount: number;
  staffPerformance: {
    staffId: string;
    name: string;
    leadsAssigned: number;
    dealsWon: number;
    avgResponseMinutes: number;
  }[];
};

function roundMinutes(ms: number): number {
  return Math.max(0, Math.round(ms / 60_000));
}

function average(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }

  return Math.round(
    values.reduce((sum, value) => sum + value, 0) / values.length,
  );
}

export function leadResponseMinutes(
  lead: DashboardMetricsLead,
  messagesByConversationId: Map<number, DashboardMetricsMessage[]>,
  conversationIdByLeadId: Map<number, number>,
): number | null {
  const conversationId = conversationIdByLeadId.get(lead.id);

  if (!conversationId) {
    return null;
  }

  const messages = messagesByConversationId.get(conversationId) ?? [];

  if (messages.length === 0) {
    return null;
  }

  const firstInbound = messages.find(
    (message) => message.direction === MessageDirection.Inbound,
  );
  const referenceAt = firstInbound?.sentAt ?? lead.createdAt;

  const firstOutbound = messages.find(
    (message) =>
      message.direction === MessageDirection.Outbound &&
      message.sentAt.getTime() >= referenceAt.getTime(),
  );

  if (!firstOutbound) {
    return null;
  }

  return roundMinutes(firstOutbound.sentAt.getTime() - referenceAt.getTime());
}

export function computeSalesWorkspaceDashboardMetrics(input: {
  leads: DashboardMetricsLead[];
  deals: DashboardMetricsDeal[];
  staff: DashboardMetricsStaff[];
  messages: DashboardMetricsMessage[];
  conversationIdByLeadId: Map<number, number>;
  inventoryVehicles: DashboardMetricsVehicle[];
  overdueFollowUpsCount: number;
}): SalesWorkspaceDashboardMetrics {
  const messagesByConversationId = new Map<number, DashboardMetricsMessage[]>();

  for (const message of input.messages) {
    const bucket = messagesByConversationId.get(message.conversationId) ?? [];
    bucket.push(message);
    messagesByConversationId.set(message.conversationId, bucket);
  }

  for (const bucket of messagesByConversationId.values()) {
    bucket.sort((a, b) => a.sentAt.getTime() - b.sentAt.getTime());
  }

  const responseMinutes = input.leads
    .map((lead) =>
      leadResponseMinutes(
        lead,
        messagesByConversationId,
        input.conversationIdByLeadId,
      ),
    )
    .filter((value): value is number => value !== null);

  const wonDealsCount = input.deals.filter(
    (deal) => deal.stageKey === 'sold',
  ).length;
  const lostDealsCount = input.deals.filter(
    (deal) => deal.stageKey === 'lost',
  ).length;
  const closedDeals = wonDealsCount + lostDealsCount;

  const sourceCounts = new Map<string, number>();

  for (const lead of input.leads) {
    sourceCounts.set(lead.source, (sourceCounts.get(lead.source) ?? 0) + 1);
  }

  const openPipelineValueKes = input.deals
    .filter((deal) => !TERMINAL_DEAL_STAGES.has(deal.stageKey))
    .reduce((sum, deal) => sum + Number(deal.valueKes), 0);

  const now = Date.now();
  const inventoryAgingDays =
    input.inventoryVehicles.length > 0
      ? input.inventoryVehicles.map((vehicle) =>
          Math.max(
            0,
            Math.floor(
              (now - vehicle.createdAt.getTime()) / (24 * 60 * 60 * 1000),
            ),
          ),
        )
      : [];

  const staffPerformance = input.staff.map((member) => {
    const assignedLeads = input.leads.filter(
      (lead) => lead.assignedUserId === member.userId,
    );
    const staffResponses = assignedLeads
      .map((lead) =>
        leadResponseMinutes(
          lead,
          messagesByConversationId,
          input.conversationIdByLeadId,
        ),
      )
      .filter((value): value is number => value !== null);

    return {
      staffId: String(member.userId),
      name: member.name,
      leadsAssigned: assignedLeads.length,
      dealsWon: input.deals.filter(
        (deal) =>
          deal.assignedUserId === member.userId && deal.stageKey === 'sold',
      ).length,
      avgResponseMinutes: average(staffResponses),
    };
  });

  return {
    avgResponseMinutes: average(responseMinutes),
    leadsBySource: [...sourceCounts.entries()]
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count),
    conversionRatePct: closedDeals
      ? Math.round((wonDealsCount / closedDeals) * 100)
      : 0,
    openPipelineValueKes,
    wonDealsCount,
    lostDealsCount,
    inventoryAgingDaysAvg: average(inventoryAgingDays),
    overdueFollowUpsCount: input.overdueFollowUpsCount,
    staffPerformance: staffPerformance.sort(
      (a, b) => b.dealsWon - a.dealsWon || b.leadsAssigned - a.leadsAssigned,
    ),
  };
}

export const INVENTORY_AGING_STATUSES = [
  VehicleStatus.Available,
  VehicleStatus.Reserved,
];
