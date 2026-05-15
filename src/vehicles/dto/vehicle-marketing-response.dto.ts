import { ApiProperty } from '@nestjs/swagger';

export class VehicleShareLinkDto {
  @ApiProperty()
  channel: string;

  @ApiProperty()
  label: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  clickCount: number;
}

export class VehicleShareProfileDto {
  @ApiProperty()
  listingSlug: string;

  @ApiProperty()
  canonicalUrl: string;

  @ApiProperty()
  publicPreviewUrl: string;

  @ApiProperty({ type: [VehicleShareLinkDto] })
  links: VehicleShareLinkDto[];
}

export class VehicleAnalyticsSourceDto {
  @ApiProperty()
  source: string;

  @ApiProperty()
  count: number;
}

export class VehicleMarketingAnalyticsDto {
  @ApiProperty()
  periodDays: number;

  @ApiProperty()
  totalViews: number;

  @ApiProperty()
  shareLinkClicks: number;

  @ApiProperty()
  daysOnMarket: number;

  @ApiProperty({ type: [VehicleAnalyticsSourceDto] })
  viewsBySource: VehicleAnalyticsSourceDto[];

  @ApiProperty({ nullable: true })
  listingSlug: string | null;
}

export class VehicleMarketingGenerateResponseDto {
  @ApiProperty()
  purpose: string;

  @ApiProperty()
  content: string;

  @ApiProperty({ type: [String], required: false })
  hashtags?: string[];

  @ApiProperty()
  generatedAt: string;

  @ApiProperty({ example: 'template' })
  provider: string;
}

export class PublicVehicleListingDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ nullable: true })
  year?: number | null;

  @ApiProperty()
  make: string;

  @ApiProperty()
  model: string;

  @ApiProperty({ nullable: true })
  price?: string | null;

  @ApiProperty({ nullable: true })
  mileage?: number | null;

  @ApiProperty({ nullable: true })
  exteriorColor?: string | null;

  @ApiProperty({ nullable: true })
  description?: string | null;

  @ApiProperty({ nullable: true })
  primaryImageUrl?: string | null;

  @ApiProperty()
  tenantName: string;

  @ApiProperty()
  tenantSlug: string;

  @ApiProperty()
  listingSlug: string;

  @ApiProperty()
  status: string;
}
