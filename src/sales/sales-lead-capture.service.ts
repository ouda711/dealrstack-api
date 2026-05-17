import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, timingSafeEqual } from 'crypto';
import { Repository } from 'typeorm';
import { AllConfigType } from '../config/config.type';
import { TenantEntity } from '../tenants/infrastructure/persistence/relational/entities/tenant.entity';
import { LeadSource } from './domain/sales.enums';
import { PublicWebsiteLeadDto } from './dto/public-website-lead.dto';
import { SalesLeadCaptureConfigDto } from './dto/sales-lead-capture-config.dto';
import { SalesWorkspaceService } from './sales-workspace.service';

@Injectable()
export class SalesLeadCaptureService {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>,
    private readonly salesWorkspaceService: SalesWorkspaceService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async getConfig(tenantId: number): Promise<SalesLeadCaptureConfigDto> {
    const tenant = await this.getTenantOrThrow(tenantId);
    const apiBase = this.resolveApiBaseUrl();
    const token = tenant.websiteLeadCaptureToken;

    return {
      websiteWebhookUrl: `${apiBase}/api/v1/public/tenants/${tenant.slug}/leads`,
      websiteTokenMasked: token ? this.maskToken(token) : null,
      websiteConfigured: Boolean(token),
      metaPageId: tenant.metaPageId ?? null,
      metaLeadAdsConfigured: Boolean(tenant.metaPageId),
    };
  }

  async regenerateWebsiteToken(
    tenantId: number,
  ): Promise<SalesLeadCaptureConfigDto> {
    const tenant = await this.getTenantOrThrow(tenantId);
    tenant.websiteLeadCaptureToken = randomBytes(24).toString('hex');
    await this.tenantRepository.save(tenant);

    const config = await this.getConfig(tenantId);
    return {
      ...config,
      websiteTokenMasked: tenant.websiteLeadCaptureToken,
    };
  }

  async createWebsiteLead(
    tenantSlug: string,
    token: string | undefined,
    dto: PublicWebsiteLeadDto,
  ) {
    const tenant = await this.tenantRepository.findOne({
      where: { slug: tenantSlug, isActive: true },
    });

    if (!tenant) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'tenantNotFound',
      });
    }

    this.assertWebsiteToken(tenant.websiteLeadCaptureToken, token);

    return this.salesWorkspaceService.createLead(tenant.id, {
      source: LeadSource.Website,
      customerName: dto.customerName,
      customerPhone: dto.customerPhone,
      interestSummary: dto.interestSummary,
    });
  }

  async updateMetaPageId(tenantId: number, metaPageId: string | null) {
    const tenant = await this.getTenantOrThrow(tenantId);
    tenant.metaPageId = metaPageId?.trim() || null;
    await this.tenantRepository.save(tenant);

    return this.getConfig(tenantId);
  }

  async ensureDemoWebsiteToken(tenantSlug: string) {
    const tenant = await this.tenantRepository.findOne({
      where: { slug: tenantSlug },
    });

    if (!tenant || tenant.websiteLeadCaptureToken) {
      return;
    }

    tenant.websiteLeadCaptureToken = randomBytes(24).toString('hex');
    await this.tenantRepository.save(tenant);
  }

  private assertWebsiteToken(
    expected: string | null | undefined,
    received: string | undefined,
  ) {
    if (!expected || !received) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'leadCaptureTokenInvalid',
      });
    }

    const expectedBuffer = Buffer.from(expected, 'utf8');
    const receivedBuffer = Buffer.from(received, 'utf8');

    if (
      expectedBuffer.length !== receivedBuffer.length ||
      !timingSafeEqual(expectedBuffer, receivedBuffer)
    ) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'leadCaptureTokenInvalid',
      });
    }
  }

  private async getTenantOrThrow(tenantId: number) {
    const tenant = await this.tenantRepository.findOne({
      where: { id: tenantId, isActive: true },
    });

    if (!tenant) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'tenantNotFound',
      });
    }

    return tenant;
  }

  private maskToken(token: string) {
    if (token.length <= 8) {
      return '••••••••';
    }

    return `••••••••${token.slice(-4)}`;
  }

  private resolveApiBaseUrl() {
    const backendDomain = this.configService.get('app.backendDomain', {
      infer: true,
    });
    const port = this.configService.get('app.port', { infer: true });

    if (backendDomain) {
      const hasProtocol =
        backendDomain.startsWith('http://') ||
        backendDomain.startsWith('https://');
      return hasProtocol
        ? backendDomain.replace(/\/$/, '')
        : `https://${backendDomain}`;
    }

    if (!port) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'apiBaseUrlNotConfigured',
      });
    }

    return `http://localhost:${port}`;
  }
}
