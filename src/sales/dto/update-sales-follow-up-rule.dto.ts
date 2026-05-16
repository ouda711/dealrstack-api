import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateSalesFollowUpRuleDto {
  @ApiPropertyOptional({ example: 'No activity in 24 hours' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  label?: string;

  @ApiPropertyOptional({ example: 'lead_idle_24h' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  trigger?: string;

  @ApiPropertyOptional({ example: 1440 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(525600)
  delayMinutes?: number;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}
