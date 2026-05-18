import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SalesLeadCaptureConfigDto {
  @ApiProperty({
    example:
      'https://api.dealrstack.com/api/v1/public/tenants/nairobi-auto-hub/leads',
  })
  websiteWebhookUrl: string;

  @ApiPropertyOptional({
    example: '••••••••••••abcd',
    description: 'Masked website capture token (full token after regenerate)',
  })
  websiteTokenMasked?: string | null;

  @ApiProperty({ example: true })
  websiteConfigured: boolean;

  @ApiPropertyOptional({ example: '123456789012345' })
  metaPageId?: string | null;

  @ApiProperty({ example: false })
  metaLeadAdsConfigured: boolean;

  @ApiProperty({
    example: 'https://api.dealrstack.com/api/v1/webhooks/meta/lead-ads',
  })
  metaWebhookUrl: string;

  @ApiPropertyOptional({
    example: '••••••••••••abcd',
    description: 'Masked Meta page access token for Graph API lead fetch',
  })
  metaPageAccessTokenMasked?: string | null;

  @ApiProperty({ example: false })
  metaTokenConfigured: boolean;

  @ApiProperty({
    description: 'Copy-paste HTML snippet for dealership websites',
  })
  websiteEmbedSnippet: string;
}
