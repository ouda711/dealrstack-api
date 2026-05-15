import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

export const VEHICLE_MARKETING_PURPOSES = [
  'instagram_caption',
  'facebook_post',
  'whatsapp_status',
  'flyer_copy',
  'hashtags',
  'twitter_post',
] as const;

export type VehicleMarketingPurpose =
  (typeof VEHICLE_MARKETING_PURPOSES)[number];

export class VehicleMarketingGenerateDto {
  @ApiProperty({
    enum: VEHICLE_MARKETING_PURPOSES,
    example: 'instagram_caption',
  })
  @IsString()
  @IsIn([...VEHICLE_MARKETING_PURPOSES])
  purpose: VehicleMarketingPurpose;

  @ApiPropertyOptional({
    enum: ['professional', 'friendly', 'urgent', 'neutral'],
    default: 'friendly',
  })
  @IsOptional()
  @IsString()
  @IsIn(['professional', 'friendly', 'urgent', 'neutral'])
  tone?: 'professional' | 'friendly' | 'urgent' | 'neutral';
}
