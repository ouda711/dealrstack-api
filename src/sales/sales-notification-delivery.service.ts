import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllConfigType } from '../config/config.type';
import { SettingsService } from '../settings/settings.service';
import { TenantsService } from '../tenants/tenants.service';
import { SalesNotificationDeliveryConfigDto } from './dto/sales-notification-delivery-config.dto';
import { UpdateSalesNotificationDeliveryDto } from './dto/update-sales-notification-delivery.dto';
import { UpsertSalesPushSubscriptionDto } from './dto/upsert-sales-push-subscription.dto';
import { SalesPushSubscriptionEntity } from './infrastructure/persistence/relational/entities/sales-push-subscription.entity';
import {
  normalizeSalesNotificationDelivery,
  salesNotificationDeliveryKey,
} from './sales-notification-delivery.util';

@Injectable()
export class SalesNotificationDeliveryService {
  constructor(
    @InjectRepository(SalesPushSubscriptionEntity)
    private readonly pushSubscriptionRepository: Repository<SalesPushSubscriptionEntity>,
    private readonly settingsService: SettingsService,
    private readonly tenantsService: TenantsService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async getConfig(
    tenantId: number,
  ): Promise<SalesNotificationDeliveryConfigDto> {
    await this.getTenantOrThrow(tenantId);
    const preferences = normalizeSalesNotificationDelivery(
      await this.settingsService.getCachedJson(
        salesNotificationDeliveryKey(tenantId),
      ),
    );
    const publicKey = this.configService.get('webPush.publicKey', {
      infer: true,
    });
    const privateKey = this.configService.get('webPush.privateKey', {
      infer: true,
    });

    return {
      ...preferences,
      webPushPublicKey: publicKey ?? null,
      webPushConfigured: Boolean(publicKey && privateKey),
    };
  }

  async updateConfig(
    tenantId: number,
    dto: UpdateSalesNotificationDeliveryDto,
  ): Promise<SalesNotificationDeliveryConfigDto> {
    await this.getTenantOrThrow(tenantId);
    const current = normalizeSalesNotificationDelivery(
      await this.settingsService.getCachedJson(
        salesNotificationDeliveryKey(tenantId),
      ),
    );

    const next = {
      emailEnabled: dto.emailEnabled ?? current.emailEnabled,
      pushEnabled: dto.pushEnabled ?? current.pushEnabled,
      kinds: {
        ...current.kinds,
        ...(dto.kinds ?? {}),
      },
    };

    await this.settingsService.upsertValue(
      salesNotificationDeliveryKey(tenantId),
      next as unknown as Record<string, unknown>,
    );

    return this.getConfig(tenantId);
  }

  async upsertPushSubscription(
    tenantId: number,
    userId: number,
    dto: UpsertSalesPushSubscriptionDto,
  ) {
    await this.getTenantOrThrow(tenantId);

    const existing = await this.pushSubscriptionRepository.findOne({
      where: { endpoint: dto.endpoint },
    });

    if (existing) {
      existing.tenantId = tenantId;
      existing.userId = userId;
      existing.p256dh = dto.p256dh;
      existing.auth = dto.auth;
      await this.pushSubscriptionRepository.save(existing);
      return { success: true };
    }

    await this.pushSubscriptionRepository.save(
      this.pushSubscriptionRepository.create({
        tenantId,
        userId,
        endpoint: dto.endpoint,
        p256dh: dto.p256dh,
        auth: dto.auth,
      }),
    );

    return { success: true };
  }

  async removePushSubscription(userId: number, endpoint: string) {
    await this.pushSubscriptionRepository.delete({ userId, endpoint });
    return { success: true };
  }

  private async getTenantOrThrow(tenantId: number) {
    const tenant = await this.tenantsService.findById(tenantId);

    if (!tenant) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'tenantNotFound',
      });
    }

    return tenant;
  }
}
