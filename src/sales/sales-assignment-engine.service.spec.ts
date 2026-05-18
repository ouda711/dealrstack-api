import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccessService } from '../access/access.service';
import { BranchesService } from '../branches/branches.service';
import { AssignmentRuleType } from './domain/sales.enums';
import { SalesAssignmentEngineService } from './sales-assignment-engine.service';
import { SalesAssignmentRuleEntity } from './infrastructure/persistence/relational/entities/sales-assignment-rule.entity';
import { SalesLeadEntity } from './infrastructure/persistence/relational/entities/sales-lead.entity';
import { SalesDealEntity } from './infrastructure/persistence/relational/entities/sales-deal.entity';
import { SalesConversationEntity } from './infrastructure/persistence/relational/entities/sales-conversation.entity';
import { SalesNotificationService } from './sales-notification.service';

describe('SalesAssignmentEngineService', () => {
  let service: SalesAssignmentEngineService;

  const rules: SalesAssignmentRuleEntity[] = [
    {
      id: 1,
      tenantId: 1,
      type: AssignmentRuleType.RoundRobin,
      label: 'Round robin',
      description: '',
      enabled: true,
      priority: 1,
    } as SalesAssignmentRuleEntity,
  ];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SalesAssignmentEngineService,
        {
          provide: getRepositoryToken(SalesAssignmentRuleEntity),
          useValue: {
            find: jest.fn(() => rules),
          },
        },
        {
          provide: getRepositoryToken(SalesLeadEntity),
          useValue: {
            createQueryBuilder: jest.fn(() => ({
              select: jest.fn().mockReturnThis(),
              addSelect: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              andWhere: jest.fn().mockReturnThis(),
              groupBy: jest.fn().mockReturnThis(),
              getRawMany: jest.fn(() => [
                { userId: '10', count: '2' },
                { userId: '11', count: '0' },
              ]),
            })),
          },
        },
        {
          provide: getRepositoryToken(SalesDealEntity),
          useValue: {},
        },
        {
          provide: getRepositoryToken(SalesConversationEntity),
          useValue: {},
        },
        {
          provide: SalesNotificationService,
          useValue: { create: jest.fn() },
        },
        {
          provide: AccessService,
          useValue: {
            findTenantMemberships: jest.fn(() => [
              {
                user: { id: 10 },
                role: { key: 'salesperson' },
                assignedBranches: [{ id: 5 }],
              },
              {
                user: { id: 11 },
                role: { key: 'salesperson' },
                assignedBranches: [{ id: 5 }],
              },
            ]),
          },
        },
        {
          provide: BranchesService,
          useValue: {
            findByTenantId: jest.fn(() => [
              { id: 5, code: 'WST', city: 'Nairobi', manager: null },
            ]),
          },
        },
      ],
    }).compile();

    service = moduleRef.get(SalesAssignmentEngineService);
  });

  it('should assign to the salesperson with the fewest open leads', async () => {
    const result = await service.resolveAssignment(1, {
      tenantId: 1,
      branchId: 5,
      branchCode: 'WST',
      branchCity: 'Nairobi',
      interestSummary: 'Toyota Prado inquiry',
    });

    expect(result).toEqual({
      userId: 11,
      reason: 'Round robin (round robin)',
    });
  });
});
