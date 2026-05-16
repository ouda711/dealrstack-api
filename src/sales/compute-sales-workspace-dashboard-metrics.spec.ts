import { MessageDirection } from './domain/sales.enums';
import {
  computeSalesWorkspaceDashboardMetrics,
  leadResponseMinutes,
} from './compute-sales-workspace-dashboard-metrics';

describe('computeSalesWorkspaceDashboardMetrics', () => {
  it('should compute conversion and open pipeline from deal stages', () => {
    const metrics = computeSalesWorkspaceDashboardMetrics({
      leads: [
        {
          id: 1,
          source: 'whatsapp',
          assignedUserId: 10,
          createdAt: new Date('2026-01-01'),
        },
      ],
      deals: [
        { stageKey: 'negotiation', valueKes: 1_000_000, assignedUserId: 10 },
        { stageKey: 'sold', valueKes: 2_000_000, assignedUserId: 10 },
        { stageKey: 'lost', valueKes: 500_000, assignedUserId: 10 },
      ],
      staff: [{ userId: 10, name: 'Alex' }],
      messages: [],
      conversationIdByLeadId: new Map(),
      inventoryVehicles: [{ createdAt: new Date('2026-04-01') }],
      overdueFollowUpsCount: 2,
    });

    expect(metrics.openPipelineValueKes).toBe(1_000_000);
    expect(metrics.wonDealsCount).toBe(1);
    expect(metrics.lostDealsCount).toBe(1);
    expect(metrics.conversionRatePct).toBe(50);
    expect(metrics.overdueFollowUpsCount).toBe(2);
  });

  it('should derive response time from first outbound after inbound', () => {
    const lead = {
      id: 1,
      source: 'whatsapp',
      assignedUserId: 10,
      createdAt: new Date('2026-01-01T10:00:00Z'),
    };
    const conversationIdByLeadId = new Map([[1, 99]]);
    const messagesByConversationId = new Map([
      [
        99,
        [
          {
            conversationId: 99,
            direction: MessageDirection.Inbound,
            sentAt: new Date('2026-01-01T10:00:00Z'),
          },
          {
            conversationId: 99,
            direction: MessageDirection.Outbound,
            sentAt: new Date('2026-01-01T10:20:00Z'),
          },
        ],
      ],
    ]);

    expect(
      leadResponseMinutes(
        lead,
        messagesByConversationId,
        conversationIdByLeadId,
      ),
    ).toBe(20);
  });
});
