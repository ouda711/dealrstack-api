import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AccessService } from '../access/access.service';
import { AllConfigType } from '../config/config.type';
import { MailService } from '../mail/mail.service';
import { SettingsService } from '../settings/settings.service';
import { TenantMembershipStatus } from '../access/infrastructure/persistence/relational/entities/tenant-membership.entity';
import { NotificationKind } from './domain/sales.enums';
import { SalesLeadEntity } from './infrastructure/persistence/relational/entities/sales-lead.entity';
import { SalesNotificationEntity } from './infrastructure/persistence/relational/entities/sales-notification.entity';
import { SalesPushSubscriptionEntity } from './infrastructure/persistence/relational/entities/sales-push-subscription.entity';
import {
  isEmailEnabledForKind,
  isPushEnabledForKind,
  normalizeSalesNotificationDelivery,
  salesNotificationDeliveryKey,
} from './sales-notification-delivery.util';

@Injectable()
export class SalesNotificationDispatchService {
  private readonly logger = new Logger(SalesNotificationDispatchService.name);

  constructor(
    @InjectRepository(SalesLeadEntity)
    private readonly leadRepository: Repository<SalesLeadEntity>,
    @InjectRepository(SalesPushSubscriptionEntity)
    private readonly pushSubscriptionRepository: Repository<SalesPushSubscriptionEntity>,
    private readonly accessService: AccessService,
    private readonly mailService: MailService,
    private readonly settingsService: SettingsService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async dispatch(notification: SalesNotificationEntity): Promise<void> {
    const preferences = normalizeSalesNotificationDelivery(
      await this.settingsService.getCachedJson(
        salesNotificationDeliveryKey(notification.tenantId),
      ),
    );

    const recipients = await this.resolveRecipientUserIds(notification);

    if (!recipients.length) {
      return;
    }

    const actionUrl = this.buildActionUrl(notification);

    if (isEmailEnabledForKind(preferences, notification.kind)) {
      await this.sendEmails(notification, recipients, actionUrl);
    }

    if (isPushEnabledForKind(preferences, notification.kind)) {
      await this.sendPush(notification, recipients, actionUrl);
    }
  }

  private async resolveRecipientUserIds(
    notification: SalesNotificationEntity,
  ): Promise<number[]> {
    if (notification.leadId) {
      const lead = await this.leadRepository.findOne({
        where: { id: notification.leadId, tenantId: notification.tenantId },
      });

      if (lead?.assignedUserId) {
        return [lead.assignedUserId];
      }
    }

    const memberships = await this.accessService.findTenantMemberships(
      notification.tenantId,
      undefined,
      { activeOnly: true },
    );

    const managerOwnerIds = memberships
      .filter((membership) => {
        const roleKey = membership.role?.key?.toLowerCase() ?? '';
        return (
          roleKey.includes('owner') ||
          roleKey.includes('manager') ||
          roleKey.includes('admin')
        );
      })
      .map((membership) => Number(membership.user.id))
      .filter((id) => Number.isFinite(id));

    if (managerOwnerIds.length) {
      return [...new Set(managerOwnerIds)];
    }

    return [
      ...new Set(
        memberships
          .filter(
            (membership) =>
              membership.status === TenantMembershipStatus.Active &&
              membership.user?.id,
          )
          .map((membership) => Number(membership.user.id)),
      ),
    ];
  }

  private async sendEmails(
    notification: SalesNotificationEntity,
    userIds: number[],
    actionUrl: string,
  ) {
    const memberships = await this.accessService.findTenantMemberships(
      notification.tenantId,
      undefined,
      { activeOnly: true },
    );
    const emails = [
      ...new Set(
        memberships
          .filter(
            (membership) =>
              userIds.includes(Number(membership.user.id)) &&
              membership.user.email,
          )
          .map((membership) => membership.user.email as string),
      ),
    ];

    await Promise.all(
      emails.map((to) =>
        this.mailService
          .salesAlert({
            to,
            data: {
              title: notification.title,
              body: notification.body,
              actionUrl,
            },
          })
          .catch((error) => {
            this.logger.warn(
              `Sales alert email failed for ${to}: ${error instanceof Error ? error.message : 'unknown'}`,
            );
          }),
      ),
    );
  }

  private async sendPush(
    notification: SalesNotificationEntity,
    userIds: number[],
    actionUrl: string,
  ) {
    const publicKey = this.configService.get('webPush.publicKey', {
      infer: true,
    });
    const privateKey = this.configService.get('webPush.privateKey', {
      infer: true,
    });
    const subject = this.configService.get('webPush.subject', { infer: true });

    if (!publicKey || !privateKey) {
      return;
    }

    const subscriptions = await this.pushSubscriptionRepository.find({
      where: {
        tenantId: notification.tenantId,
        userId: In(userIds),
      },
    });

    if (!subscriptions.length) {
      return;
    }

    const webPush = await import('web-push');
    webPush.setVapidDetails(
      subject ?? 'mailto:support@dealrstack.com',
      publicKey,
      privateKey,
    );

    const payload = JSON.stringify({
      title: notification.title,
      body: notification.body,
      url: actionUrl,
    });

    await Promise.all(
      subscriptions.map((subscription) =>
        webPush
          .sendNotification(
            {
              endpoint: subscription.endpoint,
              keys: {
                p256dh: subscription.p256dh,
                auth: subscription.auth,
              },
            },
            payload,
          )
          .catch(async (error: { statusCode?: number }) => {
            if (error?.statusCode === 404 || error?.statusCode === 410) {
              await this.pushSubscriptionRepository.delete(subscription.id);
            }

            this.logger.warn(
              `Push delivery failed for subscription ${subscription.id}`,
            );
          }),
      ),
    );
  }

  private buildActionUrl(notification: SalesNotificationEntity) {
    const frontend = this.configService.get('app.frontendDomain', {
      infer: true,
    });
    const base = frontend?.startsWith('http')
      ? frontend.replace(/\/$/, '')
      : `https://${frontend ?? 'localhost:3000'}`;

    if (notification.dealId) {
      return `${base}/workspace/pipeline?deal=${notification.dealId}`;
    }

    if (
      notification.kind === NotificationKind.CustomerReply &&
      notification.leadId
    ) {
      return `${base}/workspace/conversations`;
    }

    if (notification.leadId) {
      return `${base}/workspace/leads?lead=${notification.leadId}`;
    }

    return `${base}/workspace/notifications`;
  }
}
