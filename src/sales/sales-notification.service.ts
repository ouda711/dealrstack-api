import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationKind } from './domain/sales.enums';
import { SalesNotificationEntity } from './infrastructure/persistence/relational/entities/sales-notification.entity';
import { SalesNotificationDispatchService } from './sales-notification-dispatch.service';
import { SalesNotificationStreamService } from './sales-notification-stream.service';

export type CreateSalesNotificationInput = {
  tenantId: number;
  kind: NotificationKind;
  title: string;
  body: string;
  leadId?: number | null;
  dealId?: number | null;
  read?: boolean;
  demoKey?: string | null;
};

@Injectable()
export class SalesNotificationService {
  constructor(
    @InjectRepository(SalesNotificationEntity)
    private readonly notificationRepository: Repository<SalesNotificationEntity>,
    private readonly dispatchService: SalesNotificationDispatchService,
    private readonly streamService: SalesNotificationStreamService,
  ) {}

  async create(
    input: CreateSalesNotificationInput,
  ): Promise<SalesNotificationEntity> {
    const notification = await this.notificationRepository.save(
      this.notificationRepository.create({
        tenantId: input.tenantId,
        kind: input.kind,
        title: input.title,
        body: input.body,
        leadId: input.leadId ?? null,
        dealId: input.dealId ?? null,
        read: input.read ?? false,
        demoKey: input.demoKey ?? null,
      }),
    );

    this.streamService.publishNotification(notification);
    void this.dispatchService.dispatch(notification).catch(() => undefined);

    return notification;
  }

  async createForDealStageIfAbsent(
    input: CreateSalesNotificationInput,
  ): Promise<SalesNotificationEntity | null> {
    if (!input.dealId) {
      return this.create(input);
    }

    const existing = await this.notificationRepository.findOne({
      where: {
        tenantId: input.tenantId,
        dealId: input.dealId,
        kind: input.kind,
        read: false,
      },
    });

    if (existing) {
      return null;
    }

    return this.create(input);
  }
}
