import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { LeadPriority } from '../domain/sales.enums';

export class UpdateSalesPipelineDealDto {
  @ApiPropertyOptional({ example: '2021 Toyota Harrier — deposit follow-up' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title?: string;

  @ApiPropertyOptional({ example: 'negotiation' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  stageKey?: string;

  @ApiPropertyOptional({ example: 3500000 })
  @IsOptional()
  @IsInt()
  @Min(0)
  valueKes?: number;

  @ApiPropertyOptional({ example: 30 })
  @IsOptional()
  @IsInt()
  assignedUserId?: number;

  @ApiPropertyOptional({ example: 'James Mwangi' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(150)
  customerName?: string;

  @ApiPropertyOptional({ example: '+254712345678' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  customerPhone?: string;

  @ApiPropertyOptional({ example: 'Interested in financing options' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  interestSummary?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  branchId?: number;

  @ApiPropertyOptional({ enum: LeadPriority, example: LeadPriority.High })
  @IsOptional()
  @IsEnum(LeadPriority)
  priority?: LeadPriority;

  @ApiPropertyOptional({ example: 42, nullable: true })
  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsInt()
  vehicleId?: number | null;
}
