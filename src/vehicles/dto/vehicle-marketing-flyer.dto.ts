import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export type VehicleMarketingFlyerTheme =
  | 'midnight'
  | 'sunset'
  | 'forest'
  | 'clean';

export class VehicleMarketingFlyerArtifactDto {
  @ApiProperty({ example: '2019 Mazda CX-5 — immaculate finish' })
  headline!: string;

  @ApiPropertyOptional({ example: 'City-ready SUV with premium touches' })
  tagline?: string;

  @ApiProperty({ example: 'KES 2,650,000' })
  priceLine!: string;

  @ApiPropertyOptional({ example: '72,500 km · Sonic Silver · AWD' })
  specsLine?: string;

  @ApiPropertyOptional({
    type: [String],
    example: ['Sunroof', 'Leather seats'],
  })
  highlights?: string[];

  @ApiPropertyOptional({ example: 'DM “CX5” to book a viewing today.' })
  cta?: string;

  @ApiPropertyOptional({
    enum: ['midnight', 'sunset', 'forest', 'clean'],
    example: 'midnight',
  })
  theme?: VehicleMarketingFlyerTheme;

  @ApiPropertyOptional({
    description:
      'Optional hero image URL (https). Prefer listing gallery URLs; set in the flyer editor.',
    example: 'https://cdn.example.com/listings/photo.jpg',
  })
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  @Matches(/^https?:\/\/.+/i, {
    message: 'heroImageUrl must start with http:// or https://',
  })
  heroImageUrl?: string;
}

export class CreateFlyerMarketingThreadDto {
  @ApiPropertyOptional({
    description:
      'Optional parent thread — assistant receives summarized ancestor context.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  parentThreadId?: number;

  @ApiPropertyOptional({ example: 'Weekend promo flyer' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;
}

export class UpdateFlyerMarketingThreadDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;
}

export class FlyerMarketingChatStreamDto {
  @ApiProperty({
    description: 'New user message appended before streaming assistant reply.',
    example: 'Make it bolder with luxury cues for Instagram Stories.',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(8000)
  message!: string;
}

export class UpdateFlyerMarketingMessageDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(32000)
  content?: string;

  @ApiPropertyOptional({
    description:
      'Structured flyer preview payload (merged server-side when sent).',
    type: Object,
  })
  @IsOptional()
  @IsObject()
  artifact?: Record<string, unknown>;
}

export class VehicleMarketingFlyerMessageResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty({ enum: ['user', 'assistant'] })
  role!: 'user' | 'assistant';

  @ApiProperty()
  content!: string;

  @ApiPropertyOptional({ type: Object })
  artifact?: Record<string, unknown> | null;

  @ApiProperty()
  createdAt!: string;
}

export class VehicleMarketingFlyerThreadSummaryDto {
  @ApiProperty()
  id!: number;

  @ApiPropertyOptional()
  title?: string | null;

  @ApiPropertyOptional()
  parentThreadId?: number | null;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}

export class VehicleMarketingFlyerThreadDetailDto extends VehicleMarketingFlyerThreadSummaryDto {
  @ApiProperty({ type: [VehicleMarketingFlyerMessageResponseDto] })
  messages!: VehicleMarketingFlyerMessageResponseDto[];
}
