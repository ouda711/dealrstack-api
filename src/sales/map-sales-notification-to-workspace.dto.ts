import { SalesWorkspaceNotificationDto } from './domain/sales-workspace';
import { SalesNotificationEntity } from './infrastructure/persistence/relational/entities/sales-notification.entity';

export function mapSalesNotificationToWorkspaceDto(
  notification: SalesNotificationEntity,
): SalesWorkspaceNotificationDto {
  return {
    id: String(notification.id),
    tenantId: String(notification.tenantId),
    kind: notification.kind,
    title: notification.title,
    body: notification.body,
    leadId: notification.leadId ? String(notification.leadId) : null,
    dealId: notification.dealId ? String(notification.dealId) : null,
    read: notification.read,
    createdAt: notification.createdAt.toISOString(),
  };
}
