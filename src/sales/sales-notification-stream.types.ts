import { SalesWorkspaceNotificationDto } from './domain/sales-workspace';

export type SalesNotificationStreamEvent =
  | { type: 'connected'; unreadCount: number }
  | { type: 'notification'; notification: SalesWorkspaceNotificationDto }
  | { type: 'notification_read'; id: string }
  | { type: 'notifications_read_all' }
  | { type: 'unread_count'; count: number }
  | { type: 'heartbeat' };
