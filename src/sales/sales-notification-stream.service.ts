import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, Subject } from 'rxjs';
import { Repository } from 'typeorm';
import { SalesNotificationEntity } from './infrastructure/persistence/relational/entities/sales-notification.entity';
import { mapSalesNotificationToWorkspaceDto } from './map-sales-notification-to-workspace.dto';
import { SalesNotificationStreamEvent } from './sales-notification-stream.types';

@Injectable()
export class SalesNotificationStreamService {
  private readonly tenantSubjects = new Map<
    number,
    Subject<SalesNotificationStreamEvent>
  >();

  constructor(
    @InjectRepository(SalesNotificationEntity)
    private readonly notificationRepository: Repository<SalesNotificationEntity>,
  ) {}

  subscribe(tenantId: number): Observable<SalesNotificationStreamEvent> {
    return this.getSubject(tenantId).asObservable();
  }

  publish(tenantId: number, event: SalesNotificationStreamEvent): void {
    this.getSubject(tenantId).next(event);
  }

  async getUnreadCount(tenantId: number): Promise<number> {
    return this.notificationRepository.count({
      where: { tenantId, read: false },
    });
  }

  async publishUnreadCount(tenantId: number): Promise<void> {
    const count = await this.getUnreadCount(tenantId);
    this.publish(tenantId, { type: 'unread_count', count });
  }

  publishNotification(notification: SalesNotificationEntity): void {
    this.publish(notification.tenantId, {
      type: 'notification',
      notification: mapSalesNotificationToWorkspaceDto(notification),
    });
    void this.publishUnreadCount(notification.tenantId);
  }

  publishNotificationRead(tenantId: number, notificationId: number): void {
    this.publish(tenantId, {
      type: 'notification_read',
      id: String(notificationId),
    });
    void this.publishUnreadCount(tenantId);
  }

  publishAllNotificationsRead(tenantId: number): void {
    this.publish(tenantId, { type: 'notifications_read_all' });
    void this.publishUnreadCount(tenantId);
  }

  private getSubject(tenantId: number): Subject<SalesNotificationStreamEvent> {
    let subject = this.tenantSubjects.get(tenantId);

    if (!subject) {
      subject = new Subject<SalesNotificationStreamEvent>();
      this.tenantSubjects.set(tenantId, subject);
    }

    return subject;
  }
}
