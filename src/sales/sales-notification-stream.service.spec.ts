import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SalesNotificationEntity } from './infrastructure/persistence/relational/entities/sales-notification.entity';
import { SalesNotificationStreamService } from './sales-notification-stream.service';
import { NotificationKind } from './domain/sales.enums';

describe('SalesNotificationStreamService', () => {
  let service: SalesNotificationStreamService;
  const count = jest.fn();

  beforeEach(async () => {
    count.mockReset();
    count.mockResolvedValue(2);

    const module = await Test.createTestingModule({
      providers: [
        SalesNotificationStreamService,
        {
          provide: getRepositoryToken(SalesNotificationEntity),
          useValue: { count },
        },
      ],
    }).compile();

    service = module.get(SalesNotificationStreamService);
  });

  it('should publish notification and unread_count to subscribers', async () => {
    const events: unknown[] = [];
    const subscription = service.subscribe(7).subscribe((event) => {
      events.push(event);
    });

    const createdAt = new Date('2026-05-16T10:00:00.000Z');
    service.publishNotification({
      id: 42,
      tenantId: 7,
      kind: NotificationKind.NewLead,
      title: 'New lead',
      body: 'Jane Doe',
      leadId: 9,
      dealId: null,
      read: false,
      createdAt,
    } as SalesNotificationEntity);

    await new Promise((resolve) => setImmediate(resolve));

    expect(events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'notification',
          notification: expect.objectContaining({
            id: '42',
            tenantId: '7',
            title: 'New lead',
          }),
        }),
        expect.objectContaining({ type: 'unread_count', count: 2 }),
      ]),
    );

    subscription.unsubscribe();
  });
});
