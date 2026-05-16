import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { AssignmentRuleType } from '../domain/sales.enums';

export class UpdateSalesAssignmentRuleDto {
  @ApiPropertyOptional({ enum: AssignmentRuleType })
  @IsOptional()
  @IsEnum(AssignmentRuleType)
  type?: AssignmentRuleType;

  @ApiPropertyOptional({ example: 'Round robin' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  label?: string;

  @ApiPropertyOptional({
    example: 'Rotate new leads across available salespeople.',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(999)
  priority?: number;
}
