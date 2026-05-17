import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { LeadStatus } from '../domain/sales.enums';

export class UpdateSalesLeadDto {
  @ApiPropertyOptional({ enum: LeadStatus, example: LeadStatus.Lost })
  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

  @ApiPropertyOptional({ example: 'Bought elsewhere' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  lostReason?: string | null;
}
