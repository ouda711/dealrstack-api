import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { LeadSource } from '../domain/sales.enums';

export const CAPTURE_LEAD_SOURCES = [
  LeadSource.Website,
  LeadSource.Facebook,
  LeadSource.Instagram,
  LeadSource.Phone,
  LeadSource.WalkIn,
  LeadSource.Csv,
  LeadSource.Jiji,
  LeadSource.Cheki,
  LeadSource.Manual,
] as const;

export class CreateSalesLeadDto {
  @ApiProperty({ enum: CAPTURE_LEAD_SOURCES, example: LeadSource.Website })
  @IsEnum(CAPTURE_LEAD_SOURCES)
  source: (typeof CAPTURE_LEAD_SOURCES)[number];

  @ApiProperty({ example: 'James Mwangi' })
  @IsString()
  @MinLength(1)
  @MaxLength(150)
  customerName: string;

  @ApiProperty({ example: '+254712345678' })
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  customerPhone: string;

  @ApiPropertyOptional({ example: 'Interested in a Toyota Harrier' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  interestSummary?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  branchId?: number;

  @ApiPropertyOptional({ example: 42 })
  @IsOptional()
  @IsInt()
  vehicleId?: number;

  @ApiPropertyOptional({
    example: 'https://jiji.co.ke/cars/toyota-harrier-123',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  listingUrl?: string;
}
