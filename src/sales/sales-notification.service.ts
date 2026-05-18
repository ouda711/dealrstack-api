import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationKind } from './domain/sales.enums';
import { SalesNotificationEntity } from './infrastructure/persistence/relational/entities/sales-notification.entity';
import { SalesNotificationDispatchService } from './sales-notification-dispatch.service';

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

    void this.dispatchService.dispatch(notification).catch(() => undefined);

    return notification;
  }
}
