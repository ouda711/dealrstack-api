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
import {
  LEAD_CAPTURE_EVENT_SOURCE,
  SalesLeadCaptureEventService,
} from './sales-lead-capture-event.service';
import { SalesWorkspaceService } from './sales-workspace.service';

@Injectable()
export class SalesLeadCaptureService {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>,
    private readonly salesWorkspaceService: SalesWorkspaceService,
    private readonly captureEventService: SalesLeadCaptureEventService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async getConfig(tenantId: number): Promise<SalesLeadCaptureConfigDto> {
    const tenant = await this.getTenantOrThrow(tenantId);
    const apiBase = this.resolveApiBaseUrl();
    const token = tenant.websiteLeadCaptureToken;
    const metaWebhookUrl = `${apiBase}/api/v1/webhooks/meta/lead-ads`;
    const websiteWebhookUrl = `${apiBase}/api/v1/public/tenants/${tenant.slug}/leads`;

    return {
      websiteWebhookUrl,
      websiteTokenMasked: token ? this.maskToken(token) : null,
      websiteConfigured: Boolean(token),
      metaPageId: tenant.metaPageId ?? null,
      metaLeadAdsConfigured: Boolean(tenant.metaPageId),
      metaWebhookUrl,
      metaPageAccessTokenMasked: tenant.metaPageAccessToken
        ? this.maskToken(tenant.metaPageAccessToken)
        : null,
      metaTokenConfigured: Boolean(tenant.metaPageAccessToken),
      websiteEmbedSnippet: this.buildWebsiteEmbedSnippet({
        webhookUrl: websiteWebhookUrl,
      }),
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
    idempotencyKey?: string,
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

    const normalizedKey = idempotencyKey?.trim();

    if (normalizedKey) {
      const existing = await this.captureEventService.findProcessed(
        tenant.id,
        LEAD_CAPTURE_EVENT_SOURCE.website,
        normalizedKey,
      );

      if (existing) {
        return { success: true, idempotent: true };
      }
    }

    const lead = await this.salesWorkspaceService.captureInboundLead(
      tenant.id,
      {
        source: LeadSource.Website,
        customerName: dto.customerName,
        customerPhone: dto.customerPhone,
        interestSummary: dto.interestSummary ?? '',
        vehicleId: dto.vehicleId,
      },
    );

    if (normalizedKey) {
      await this.captureEventService.recordProcessed({
        tenantId: tenant.id,
        source: LEAD_CAPTURE_EVENT_SOURCE.website,
        externalId: normalizedKey,
        leadId: lead.id,
      });
    }

    return { success: true, leadId: lead.id };
  }

  async updateMetaPageId(tenantId: number, metaPageId: string | null) {
    const tenant = await this.getTenantOrThrow(tenantId);
    tenant.metaPageId = metaPageId?.trim() || null;
    await this.tenantRepository.save(tenant);

    return this.getConfig(tenantId);
  }

  async updateMetaPageAccessToken(
    tenantId: number,
    metaPageAccessToken: string | null,
  ) {
    const tenant = await this.getTenantOrThrow(tenantId);
    tenant.metaPageAccessToken = metaPageAccessToken?.trim() || null;
    await this.tenantRepository.save(tenant);

    const config = await this.getConfig(tenantId);

    if (metaPageAccessToken?.trim()) {
      return {
        ...config,
        metaPageAccessTokenMasked: metaPageAccessToken.trim(),
      };
    }

    return config;
  }

  resolveMetaPageAccessToken(tenant: TenantEntity): string | undefined {
    const tenantToken = tenant.metaPageAccessToken?.trim();

    if (tenantToken) {
      return tenantToken;
    }

    return (
      this.configService.get('metaLeadAds.pageAccessToken', {
        infer: true,
      }) || undefined
    );
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

  private buildWebsiteEmbedSnippet(input: { webhookUrl: string }) {
    const escapedUrl = input.webhookUrl.replace(/'/g, "\\'");

    return `<!-- DealrStack website lead capture -->
<form id="dealrstack-lead-form">
  <input name="customerName" required placeholder="Your name" />
  <input name="customerPhone" required placeholder="Phone (e.g. +2547…)" />
  <textarea name="interestSummary" placeholder="What vehicle are you interested in?"></textarea>
  <button type="submit">Request callback</button>
</form>
<script>
(function () {
  var form = document.getElementById('dealrstack-lead-form');
  if (!form) return;
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var data = new FormData(form);
  fetch('${escapedUrl}', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Lead-Capture-Token': 'YOUR_CAPTURE_TOKEN'
      },
      body: JSON.stringify({
        customerName: data.get('customerName'),
        customerPhone: data.get('customerPhone'),
        interestSummary: data.get('interestSummary') || undefined
      })
    })
      .then(function () {
        alert('Thanks — our sales team will contact you shortly.');
        form.reset();
      })
      .catch(function () {
        alert('Could not submit. Please call us directly.');
      });
  });
})();
</script>`;
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
