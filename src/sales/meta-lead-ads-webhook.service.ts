import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { createHmac, timingSafeEqual } from 'crypto';
import { Repository } from 'typeorm';
import { AllConfigType } from '../config/config.type';
import { TenantEntity } from '../tenants/infrastructure/persistence/relational/entities/tenant.entity';
import { LeadSource } from './domain/sales.enums';
import { SalesWorkspaceService } from './sales-workspace.service';

type MetaLeadgenValue = {
  leadgen_id?: string;
  page_id?: string;
  form_id?: string;
};

type MetaWebhookPayload = {
  object?: string;
  entry?: Array<{
    id?: string;
    changes?: Array<{
      field?: string;
      value?: MetaLeadgenValue;
    }>;
  }>;
};

type MetaFieldData = {
  name: string;
  values: string[];
};

@Injectable()
export class MetaLeadAdsWebhookService {
  private readonly logger = new Logger(MetaLeadAdsWebhookService.name);

  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>,
    private readonly salesWorkspaceService: SalesWorkspaceService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  verifySubscription(query: {
    mode?: string;
    verifyToken?: string;
    challenge?: string;
  }): string {
    const expectedToken = this.configService.get('metaLeadAds.verifyToken', {
      infer: true,
    });

    if (!expectedToken) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'metaLeadAdsVerifyTokenNotConfigured',
      });
    }

    if (
      query.mode === 'subscribe' &&
      query.verifyToken === expectedToken &&
      query.challenge
    ) {
      return query.challenge;
    }

    throw new ForbiddenException({
      status: HttpStatus.FORBIDDEN,
      error: 'metaLeadAdsVerificationFailed',
    });
  }

  assertValidSignature(rawBody: Buffer | undefined, signatureHeader?: string) {
    const appSecret = this.configService.get('facebook.appSecret', {
      infer: true,
    });

    if (!appSecret) {
      return;
    }

    if (!signatureHeader?.startsWith('sha256=') || !rawBody) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        error: 'metaLeadAdsSignatureMissing',
      });
    }

    const expected = createHmac('sha256', appSecret)
      .update(rawBody)
      .digest('hex');
    const received = signatureHeader.slice('sha256='.length);
    const expectedBuffer = Buffer.from(expected, 'utf8');
    const receivedBuffer = Buffer.from(received, 'utf8');

    if (
      expectedBuffer.length !== receivedBuffer.length ||
      !timingSafeEqual(expectedBuffer, receivedBuffer)
    ) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        error: 'metaLeadAdsSignatureInvalid',
      });
    }
  }

  async handleWebhook(payload: MetaWebhookPayload): Promise<void> {
    const entries = payload.entry ?? [];

    for (const entry of entries) {
      for (const change of entry.changes ?? []) {
        if (change.field !== 'leadgen' || !change.value?.leadgen_id) {
          continue;
        }

        await this.processLeadgen({
          leadgenId: change.value.leadgen_id,
          pageId: change.value.page_id ?? entry.id,
        });
      }
    }
  }

  private async processLeadgen(input: { leadgenId: string; pageId?: string }) {
    if (!input.pageId) {
      this.logger.warn(`Leadgen ${input.leadgenId} missing page_id`);
      return;
    }

    const tenant = await this.tenantRepository.findOne({
      where: { metaPageId: input.pageId, isActive: true },
    });

    if (!tenant) {
      this.logger.warn(
        `No tenant mapped for Meta page ${input.pageId} (leadgen ${input.leadgenId})`,
      );
      return;
    }

    const accessToken = this.configService.get('metaLeadAds.pageAccessToken', {
      infer: true,
    });

    if (!accessToken) {
      this.logger.warn(
        'META_PAGE_ACCESS_TOKEN not configured; skipping leadgen',
      );
      return;
    }

    const leadDetails = await this.fetchLeadgenDetails(
      input.leadgenId,
      accessToken,
    );

    if (!leadDetails) {
      return;
    }

    await this.salesWorkspaceService.createLead(tenant.id, {
      source: leadDetails.source as LeadSource.Facebook | LeadSource.Instagram,
      customerName: leadDetails.customerName,
      customerPhone: leadDetails.customerPhone,
      interestSummary: leadDetails.interestSummary,
    });
  }

  private async fetchLeadgenDetails(leadgenId: string, accessToken: string) {
    const url = new URL(
      `https://graph.facebook.com/v21.0/${encodeURIComponent(leadgenId)}`,
    );
    url.searchParams.set('access_token', accessToken);
    url.searchParams.set('fields', 'field_data,platform,created_time');

    const response = await fetch(url);

    if (!response.ok) {
      this.logger.warn(
        `Graph API leadgen fetch failed (${response.status}) for ${leadgenId}`,
      );
      return null;
    }

    const body = (await response.json()) as {
      field_data?: MetaFieldData[];
      platform?: string;
    };

    const fields = new Map(
      (body.field_data ?? []).map((field) => [
        field.name.toLowerCase(),
        field.values[0]?.trim() ?? '',
      ]),
    );

    const customerName =
      fields.get('full_name') ||
      [fields.get('first_name'), fields.get('last_name')]
        .filter(Boolean)
        .join(' ') ||
      'Meta lead';
    const customerPhone =
      fields.get('phone_number') ||
      fields.get('phone') ||
      fields.get('mobile') ||
      '';

    if (!customerPhone) {
      this.logger.warn(`Leadgen ${leadgenId} has no phone field`);
      return null;
    }

    const platform = (body.platform ?? '').toUpperCase();
    const source =
      platform === 'IG' || platform.includes('INSTAGRAM')
        ? LeadSource.Instagram
        : LeadSource.Facebook;

    const interestParts = [
      fields.get('email') ? `Email: ${fields.get('email')}` : '',
      fields.get('city') ? `City: ${fields.get('city')}` : '',
      fields.get('vehicle') ? `Vehicle: ${fields.get('vehicle')}` : '',
    ].filter(Boolean);

    return {
      source,
      customerName,
      customerPhone,
      interestSummary: interestParts.join(' · ') || 'Inbound Meta Lead Ad',
    };
  }
}
