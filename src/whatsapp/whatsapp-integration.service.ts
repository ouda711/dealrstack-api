import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantsService } from '../tenants/tenants.service';
import { TenantWhatsAppIntegrationDto } from './domain/tenant-whatsapp-integration.dto';
import { UpsertTenantWhatsAppIntegrationDto } from './dto/upsert-tenant-whatsapp-integration.dto';
import { TenantWhatsAppIntegrationEntity } from './infrastructure/persistence/relational/entities/tenant-whatsapp-integration.entity';

@Injectable()
export class WhatsAppIntegrationService {
  constructor(
    @InjectRepository(TenantWhatsAppIntegrationEntity)
    private readonly integrationRepository: Repository<TenantWhatsAppIntegrationEntity>,
    private readonly tenantsService: TenantsService,
  ) {}

  async getByTenantId(
    tenantId: number,
  ): Promise<TenantWhatsAppIntegrationDto | null> {
    const integration = await this.integrationRepository.findOne({
      where: { tenantId },
    });

    if (!integration) {
      return null;
    }

    return this.toDto(integration);
  }

  async getEnabledByPhoneNumberId(phoneNumberId: string) {
    return this.integrationRepository.findOne({
      where: { phoneNumberId, isEnabled: true },
    });
  }

  async getEnabledByTenantId(tenantId: number) {
    return this.integrationRepository.findOne({
      where: { tenantId, isEnabled: true },
    });
  }

  async upsertForTenant(
    tenantId: number,
    dto: UpsertTenantWhatsAppIntegrationDto,
  ): Promise<TenantWhatsAppIntegrationDto> {
    const tenant = await this.tenantsService.findById(tenantId);

    if (!tenant) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'tenantNotFound',
      });
    }

    const phoneNumberId = dto.phoneNumberId.trim();
    const accessToken = dto.accessToken.trim();

    const conflict = await this.integrationRepository.findOne({
      where: { phoneNumberId },
    });

    if (conflict && conflict.tenantId !== tenantId) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'whatsappPhoneNumberAlreadyLinked',
      });
    }

    const existing = await this.integrationRepository.findOne({
      where: { tenantId },
    });

    const record = existing
      ? Object.assign(existing, {
          phoneNumberId,
          accessToken,
          wabaId: dto.wabaId?.trim() || null,
          displayPhoneNumber: dto.displayPhoneNumber?.trim() || null,
          isEnabled: dto.isEnabled ?? true,
        })
      : this.integrationRepository.create({
          tenantId,
          phoneNumberId,
          accessToken,
          wabaId: dto.wabaId?.trim() || null,
          displayPhoneNumber: dto.displayPhoneNumber?.trim() || null,
          isEnabled: dto.isEnabled ?? true,
        });

    const saved = await this.integrationRepository.save(record);

    return this.toDto(saved);
  }

  async deleteForTenant(tenantId: number): Promise<void> {
    const integration = await this.integrationRepository.findOne({
      where: { tenantId },
    });

    if (!integration) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'whatsappIntegrationNotFound',
      });
    }

    await this.integrationRepository.softRemove(integration);
  }

  private toDto(
    integration: TenantWhatsAppIntegrationEntity,
  ): TenantWhatsAppIntegrationDto {
    const token = integration.accessToken ?? '';

    return {
      tenantId: String(integration.tenantId),
      phoneNumberId: integration.phoneNumberId,
      wabaId: integration.wabaId ?? null,
      displayPhoneNumber: integration.displayPhoneNumber ?? null,
      isEnabled: integration.isEnabled,
      hasAccessToken: token.length > 0,
      accessTokenLast4: token.length >= 4 ? token.slice(-4) : null,
    };
  }
}
