import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccessModule } from '../access/access.module';
import { MailModule } from '../mail/mail.module';
import { SettingsModule } from '../settings/settings.module';
import { TenantsModule } from '../tenants/tenants.module';
import webPushConfig from './config/web-push.config';
import { RelationalSalesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { SalesNotificationDeliveryService } from './sales-notification-delivery.service';
import { SalesNotificationDispatchService } from './sales-notification-dispatch.service';
import { SalesNotificationStreamService } from './sales-notification-stream.service';
import { SalesNotificationService } from './sales-notification.service';

@Module({
  imports: [
    ConfigModule.forFeature(webPushConfig),
    RelationalSalesPersistenceModule,
    MailModule,
    SettingsModule,
    AccessModule,
    TenantsModule,
  ],
  providers: [
    SalesNotificationDispatchService,
    SalesNotificationStreamService,
    SalesNotificationService,
    SalesNotificationDeliveryService,
  ],
  exports: [
    SalesNotificationService,
    SalesNotificationDeliveryService,
    SalesNotificationStreamService,
    SalesNotificationDispatchService,
  ],
})
export class SalesNotificationsModule {}
