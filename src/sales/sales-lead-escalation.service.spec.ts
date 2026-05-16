import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LeadPriority, LeadStatus } from './domain/sales.enums';
import { SalesLeadEscalationService } from './sales-lead-escalation.service';
import { SalesLeadEntity } from './infrastructure/persistence/relational/entities/sales-lead.entity';
import { SalesNotificationEntity } from './infrastructure/persistence/relational/entities/sales-notification.entity';

describe('SalesLeadEscalationService', () => {
  let service: SalesLeadEscalationService;
  let savedLeads: SalesLeadEntity[];

  beforeEach(async () => {
    savedLeads = [];

    const moduleRef = await Test.createTestingModule({
      providers: [
        SalesLeadEscalationService,
        {
          provide: getRepositoryToken(SalesLeadEntity),
          useValue: {
            find: jest.fn(() => [
              {
                id: 1,
                tenantId: 1,
                status: LeadStatus.New,
                priority: LeadPriority.Normal,
                customerName: 'Jane',
                assignedUserId: null,
                unread: true,
                slaDueAt: new Date('2026-05-10T00:00:00Z'),
                lastActivityAt: new Date('2026-05-10T00:00:00Z'),
                createdAt: new Date('2026-05-10T00:00:00Z'),
              } as SalesLeadEntity,
            ]),
            save: jest.fn((lead: SalesLeadEntity) => {
              savedLeads.push(lead);

              return lead;
            }),
          },
        },
        {
          provide: getRepositoryToken(SalesNotificationEntity),
          useValue: {
            findOne: jest.fn(() => null),
            save: jest.fn((notification) => notification),
            create: jest.fn((input) => input),
          },
        },
      ],
    }).compile();

    service = moduleRef.get(SalesLeadEscalationService);
  });

  it('should escalate an unassigned lead that exceeded the wait threshold', async () => {
    const count = await service.evaluateTenant(1);

    expect(count).toBe(1);
    expect(savedLeads[0]?.priority).toBe(LeadPriority.Urgent);
  });
});
