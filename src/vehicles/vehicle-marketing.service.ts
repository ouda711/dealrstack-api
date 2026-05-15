import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { AllConfigType } from '../config/config.type';
import { TenantEntity } from '../tenants/infrastructure/persistence/relational/entities/tenant.entity';
import {
  VehicleMarketingGenerateDto,
  VehicleMarketingPurpose,
} from './dto/vehicle-marketing-generate.dto';
import {
  PublicVehicleListingDto,
  VehicleMarketingAnalyticsDto,
  VehicleMarketingGenerateResponseDto,
  VehicleShareProfileDto,
} from './dto/vehicle-marketing-response.dto';
import { VehicleListingViewEntity } from './infrastructure/persistence/relational/entities/vehicle-listing-view.entity';
import { VehicleShareLinkEntity } from './infrastructure/persistence/relational/entities/vehicle-share-link.entity';
import { VehicleEntity } from './infrastructure/persistence/relational/entities/vehicle.entity';
import {
  normalizeListingReferrer,
  SHARE_CHANNELS,
} from './vehicle-marketing.constants';
import { DealrstackAiService } from '../ai/dealrstack-ai.service';
import {
  buildVehicleMarketingUserPrompt,
  VEHICLE_MARKETING_SYSTEM_PROMPT,
} from './vehicle-marketing-prompts';

@Injectable()
export class VehicleMarketingService {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>,
    @InjectRepository(VehicleListingViewEntity)
    private readonly listingViewRepository: Repository<VehicleListingViewEntity>,
    @InjectRepository(VehicleShareLinkEntity)
    private readonly shareLinkRepository: Repository<VehicleShareLinkEntity>,
    private readonly configService: ConfigService<AllConfigType>,
    private readonly dealrstackAiService: DealrstackAiService,
  ) {}

  async getShareProfile(
    tenantId: number,
    vehicleId: number,
  ): Promise<VehicleShareProfileDto> {
    const { vehicle, tenant } = await this.getVehicleWithTenant(
      tenantId,
      vehicleId,
    );
    const listingSlug = await this.ensureListingSlug(vehicle);
    const links = await this.syncShareLinks(vehicle, tenant, listingSlug);

    const canonicalUrl = this.buildListingUrl(tenant.slug, listingSlug);

    return {
      listingSlug,
      canonicalUrl,
      publicPreviewUrl: canonicalUrl,
      links,
    };
  }

  async getAnalytics(
    tenantId: number,
    vehicleId: number,
    periodDays = 30,
  ): Promise<VehicleMarketingAnalyticsDto> {
    const { vehicle } = await this.getVehicleWithTenant(tenantId, vehicleId);
    const since = new Date();
    since.setDate(since.getDate() - periodDays);

    const views = await this.listingViewRepository.find({
      where: {
        vehicle: { id: vehicle.id },
        createdAt: MoreThanOrEqual(since),
      },
      select: ['source'],
    });

    const bySource = new Map<string, number>();
    for (const view of views) {
      const key = view.source || 'direct';
      bySource.set(key, (bySource.get(key) || 0) + 1);
    }

    const daysOnMarket = Math.max(
      0,
      Math.floor(
        (Date.now() - new Date(vehicle.createdAt).getTime()) /
          (1000 * 60 * 60 * 24),
      ),
    );

    return {
      periodDays,
      totalViews: views.length,
      shareLinkClicks: vehicle.shareLinkClickCount ?? 0,
      daysOnMarket,
      listingSlug: vehicle.listingSlug ?? null,
      viewsBySource: Array.from(bySource.entries())
        .map(([source, count]) => ({ source, count }))
        .sort((a, b) => b.count - a.count),
    };
  }

  async generateCopy(
    tenantId: number,
    vehicleId: number,
    dto: VehicleMarketingGenerateDto,
  ): Promise<VehicleMarketingGenerateResponseDto> {
    const { vehicle } = await this.getVehicleWithTenant(tenantId, vehicleId);
    return this.buildTemplateCopy(vehicle, dto.purpose, dto.tone ?? 'friendly');
  }

  /**
   * Streams AI-generated marketing copy over SSE (see controller).
   * Falls back to template copy when no AI keys succeed.
   */
  async streamGenerateCopy(
    tenantId: number,
    vehicleId: number,
    dto: VehicleMarketingGenerateDto,
    writeEvent: (payload: Record<string, unknown>) => void,
  ): Promise<void> {
    const { vehicle } = await this.getVehicleWithTenant(tenantId, vehicleId);
    const tone = dto.tone ?? 'friendly';
    const fallback = this.buildTemplateCopy(vehicle, dto.purpose, tone);

    const userPrompt = buildVehicleMarketingUserPrompt(
      vehicle,
      dto.purpose,
      tone,
    );

    const aiResult = await this.dealrstackAiService.streamMarketingCopy(
      VEHICLE_MARKETING_SYSTEM_PROMPT,
      userPrompt,
      (text) => writeEvent({ type: 'delta', text }),
    );

    if (aiResult) {
      const extracted = this.extractHashtagsFromContent(aiResult.fullText);
      const hashtags =
        dto.purpose === 'hashtags'
          ? extracted
          : extracted.length > 0
            ? extracted
            : (fallback.hashtags ?? []);

      writeEvent({
        type: 'done',
        purpose: dto.purpose,
        provider: aiResult.provider,
        hashtags,
        generatedAt: new Date().toISOString(),
      });
      return;
    }

    writeEvent({ type: 'delta', text: fallback.content });
    writeEvent({
      type: 'done',
      purpose: dto.purpose,
      provider: 'template',
      hashtags: fallback.hashtags ?? [],
      generatedAt: new Date().toISOString(),
    });
  }

  async getPublicListing(
    tenantSlug: string,
    listingSlug: string,
    referrer?: string | null,
  ): Promise<PublicVehicleListingDto> {
    const tenant = await this.tenantRepository.findOne({
      where: { slug: tenantSlug, isActive: true },
    });

    if (!tenant) {
      throw new NotFoundException('Listing not found');
    }

    const vehicle = await this.vehicleRepository.findOne({
      where: {
        tenant: { id: tenant.id },
        listingSlug,
        isActive: true,
      },
      relations: ['mediaAssets'],
    });

    if (!vehicle) {
      throw new NotFoundException('Listing not found');
    }

    const source = normalizeListingReferrer(referrer);
    await this.listingViewRepository.save(
      this.listingViewRepository.create({
        vehicle,
        source,
      }),
    );

    const primaryImage =
      vehicle.mediaAssets?.find((m) => m.kind === 'image')?.url ||
      (Array.isArray(vehicle.media) &&
      vehicle.media[0] &&
      typeof vehicle.media[0] === 'object' &&
      vehicle.media[0] !== null &&
      'url' in vehicle.media[0]
        ? String((vehicle.media[0] as { url?: string }).url || '')
        : null) ||
      null;

    return {
      id: vehicle.id,
      title:
        vehicle.title ||
        [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(' '),
      year: vehicle.year,
      make: vehicle.make,
      model: vehicle.model,
      price: vehicle.price,
      mileage: vehicle.mileage,
      exteriorColor: vehicle.exteriorColor,
      description: vehicle.description,
      primaryImageUrl: primaryImage,
      tenantName: tenant.name,
      tenantSlug: tenant.slug,
      listingSlug: vehicle.listingSlug || listingSlug,
      status: vehicle.status,
    };
  }

  async recordShareLinkClick(
    tenantSlug: string,
    listingSlug: string,
    channel: string,
  ): Promise<void> {
    const tenant = await this.tenantRepository.findOne({
      where: { slug: tenantSlug },
    });
    if (!tenant) {
      return;
    }

    const vehicle = await this.vehicleRepository.findOne({
      where: {
        tenant: { id: tenant.id },
        listingSlug,
      },
    });
    if (!vehicle) {
      return;
    }

    const normalizedChannel = normalizeListingReferrer(channel);
    await this.shareLinkRepository.increment(
      { vehicle: { id: vehicle.id }, channel: normalizedChannel },
      'clickCount',
      1,
    );
    await this.vehicleRepository.increment(
      { id: vehicle.id },
      'shareLinkClickCount',
      1,
    );
  }

  private async getVehicleWithTenant(
    tenantId: number,
    vehicleId: number,
  ): Promise<{ vehicle: VehicleEntity; tenant: TenantEntity }> {
    const tenant = await this.tenantRepository.findOne({
      where: { id: tenantId, isActive: true },
    });
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    const vehicle = await this.vehicleRepository.findOne({
      where: {
        id: vehicleId,
        tenant: { id: tenantId },
      },
      relations: ['tenant', 'mediaAssets'],
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    return { vehicle, tenant };
  }

  private async ensureListingSlug(vehicle: VehicleEntity): Promise<string> {
    if (vehicle.listingSlug) {
      return vehicle.listingSlug;
    }

    const base = [vehicle.year, vehicle.make, vehicle.model]
      .filter(Boolean)
      .join('-')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40);

    const suffix = randomStringGenerator().slice(0, 6).toLowerCase();
    const listingSlug = `${base || 'vehicle'}-${suffix}`;

    vehicle.listingSlug = listingSlug;
    await this.vehicleRepository.save(vehicle);

    return listingSlug;
  }

  private buildListingUrl(tenantSlug: string, listingSlug: string): string {
    const frontend = this.configService.get('app.frontendDomain', {
      infer: true,
    });
    const origin = frontend?.replace(/\/$/, '') || 'http://localhost:3000';
    return `${origin}/listings/${tenantSlug}/${listingSlug}`;
  }

  private buildTrackedUrl(baseUrl: string, channel: string): string {
    const url = new URL(baseUrl);
    url.searchParams.set('ref', channel);
    url.searchParams.set('utm_source', 'dealrstack');
    url.searchParams.set('utm_medium', channel);
    url.searchParams.set('utm_campaign', 'vehicle-listing');
    return url.toString();
  }

  private async syncShareLinks(
    vehicle: VehicleEntity,
    tenant: TenantEntity,
    listingSlug: string,
  ) {
    const baseUrl = this.buildListingUrl(tenant.slug, listingSlug);
    const existing = await this.shareLinkRepository.find({
      where: { vehicle: { id: vehicle.id } },
    });
    const byChannel = new Map(existing.map((link) => [link.channel, link]));

    for (const channel of SHARE_CHANNELS) {
      if (!byChannel.has(channel.id)) {
        const created = await this.shareLinkRepository.save(
          this.shareLinkRepository.create({
            vehicle,
            channel: channel.id,
            url: this.buildTrackedUrl(baseUrl, channel.id),
          }),
        );
        byChannel.set(channel.id, created);
      } else {
        const link = byChannel.get(channel.id)!;
        const nextUrl = this.buildTrackedUrl(baseUrl, channel.id);
        if (link.url !== nextUrl) {
          link.url = nextUrl;
          await this.shareLinkRepository.save(link);
        }
      }
    }

    return SHARE_CHANNELS.map((channel) => {
      const link = byChannel.get(channel.id)!;
      return {
        channel: channel.id,
        label: channel.label,
        url: link.url,
        clickCount: link.clickCount,
      };
    });
  }

  private buildTemplateCopy(
    vehicle: VehicleEntity,
    purpose: VehicleMarketingPurpose,
    tone: string,
  ): VehicleMarketingGenerateResponseDto {
    const title =
      vehicle.title ||
      [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(' ');
    const priceLabel = vehicle.price
      ? `KES ${Number(vehicle.price).toLocaleString('en-KE')}`
      : 'Price on request';
    const mileageLabel = vehicle.mileage
      ? `${Number(vehicle.mileage).toLocaleString('en-KE')} km`
      : null;
    const highlights = [
      ...(vehicle.highlights || []),
      ...(vehicle.equipment || []).slice(0, 3),
    ].filter(Boolean);

    const toneOpener =
      tone === 'urgent'
        ? 'Limited availability — '
        : tone === 'professional'
          ? ''
          : '';

    const specLine = [mileageLabel, vehicle.exteriorColor, vehicle.bodyType]
      .filter(Boolean)
      .join(' · ');

    const hashtagBase = [
      vehicle.make,
      vehicle.model,
      vehicle.year,
      'UsedCars',
      'CarsForSale',
      'Kenya',
    ]
      .filter(Boolean)
      .map((tag) =>
        String(tag)
          .replace(/[^a-zA-Z0-9]/g, '')
          .replace(/^(.)/, (_, c) => c.toUpperCase()),
      )
      .filter((tag) => tag.length > 1);

    const hashtags = [...new Set(hashtagBase)].slice(0, 8).map((t) => `#${t}`);

    let content = '';
    switch (purpose) {
      case 'instagram_caption':
        content = `${toneOpener}${title}\n${priceLabel}${specLine ? `\n${specLine}` : ''}${highlights.length ? `\n\n✨ ${highlights.slice(0, 3).join(' · ')}` : ''}\n\nDM us or tap the link in bio to enquire.`;
        break;
      case 'facebook_post':
        content = `${toneOpener}Now showing: ${title}\n\n${vehicle.description?.trim() || `Well-presented ${vehicle.make} ${vehicle.model} ready for viewing.`}\n\n${priceLabel}${specLine ? ` | ${specLine}` : ''}\n\nMessage us today to schedule a visit or test drive.`;
        break;
      case 'whatsapp_status':
        content = `${toneOpener}${title} — ${priceLabel}. Reply to this status or WhatsApp us to book a viewing.`;
        break;
      case 'flyer_copy':
        content = `HEADLINE: ${title}\nPRICE: ${priceLabel}\n${specLine ? `DETAILS: ${specLine}\n` : ''}${highlights.length ? `HIGHLIGHTS:\n• ${highlights.slice(0, 5).join('\n• ')}\n` : ''}CALL TO ACTION: Visit us today — enquiries welcome.`;
        break;
      case 'twitter_post':
        content =
          `${title} | ${priceLabel}${mileageLabel ? ` | ${mileageLabel}` : ''}. Enquire now. ${hashtags.slice(0, 3).join(' ')}`.slice(
            0,
            280,
          );
        break;
      case 'hashtags':
        content = hashtags.join(' ');
        break;
      default:
        content = `${title} — ${priceLabel}. Contact us for details.`;
    }

    return {
      purpose,
      content,
      hashtags: purpose === 'hashtags' ? hashtags : hashtags.slice(0, 5),
      generatedAt: new Date().toISOString(),
      provider: 'template',
    };
  }

  private extractHashtagsFromContent(content: string): string[] {
    const matches = content.match(/#[\w]+/gu) ?? [];
    return [...new Set(matches)].slice(0, 12);
  }
}
