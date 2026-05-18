import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  FollowUpStatus,
  LeadSource,
  LeadStatus,
  MessageDirection,
} from './domain/sales.enums';
import {
  FOLLOW_UP_TRIGGER,
  SalesFollowUpAutomationService,
} from './sales-follow-up-automation.service';
import { SalesActivityEntity } from './infrastructure/persistence/relational/entities/sales-activity.entity';
import { SalesNotificationEntity } from './infrastructure/persistence/relational/entities/sales-notification.entity';
import { SalesNotificationService } from './sales-notification.service';

describe('SalesFollowUpAutomationService', () => {
  let service: SalesFollowUpAutomationService;
  let savedActivities: Partial<SalesActivityEntity>[];

  beforeEach(async () => {
    savedActivities = [];

    const moduleRef = await Test.createTestingModule({
      providers: [
        SalesFollowUpAutomationService,
        {
          provide: getRepositoryToken(SalesActivityEntity),
          useValue: {
            find: jest.fn(() => Promise.resolve([])),
            findOne: jest.fn(() => Promise.resolve(null)),
            save: jest.fn((entity) => {
              savedActivities.push(entity);
              return Promise.resolve({ id: savedActivities.length, ...entity });
            }),
            create: jest.fn((entity) => entity),
          },
        },
        {
          provide: getRepositoryToken(SalesNotificationEntity),
          useValue: {
            findOne: jest.fn(() => Promise.resolve(null)),
          },
        },
        {
          provide: SalesNotificationService,
          useValue: { create: jest.fn() },
        },
      ],
    }).compile();

    service = moduleRef.get(SalesFollowUpAutomationService);
  });

  it('should create an overdue WhatsApp no-reply follow-up', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-05-16T12:00:00Z'));

    const inboundAt = new Date('2026-05-16T11:40:00Z');

    await service.evaluateTenant({
      tenantId: 1,
      rules: [
        {
          id: 7,
          tenantId: 1,
          label: 'No response in 10 minutes',
          trigger: FOLLOW_UP_TRIGGER.WhatsappNoReply,
          delayMinutes: 10,
          enabled: true,
        } as never,
      ],
      leads: [
        {
          id: 10,
          tenantId: 1,
          status: LeadStatus.New,
          source: LeadSource.Whatsapp,
          customerName: 'Brian Mwangi',
          lastActivityAt: inboundAt,
        } as never,
      ],
      deals: [],
      conversations: [{ id: 50, tenantId: 1, leadId: 10 } as never],
      messages: [
        {
          id: 1,
          conversationId: 50,
          direction: MessageDirection.Inbound,
          sentAt: inboundAt,
        } as never,
      ],
    });

    expect(savedActivities).toHaveLength(1);
    expect(savedActivities[0].status).toBe(FollowUpStatus.Overdue);
    expect(savedActivities[0].summary).toContain('[rule:7]');

    jest.useRealTimers();
  });
});
