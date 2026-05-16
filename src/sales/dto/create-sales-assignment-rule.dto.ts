import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

export class CreateSalesAssignmentRuleDto {
  @ApiProperty({
    enum: AssignmentRuleType,
    example: AssignmentRuleType.RoundRobin,
  })
  @IsEnum(AssignmentRuleType)
  type: AssignmentRuleType;

  @ApiProperty({ example: 'Round robin' })
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  label: string;

  @ApiProperty({
    example: 'Rotate new leads across available salespeople at the branch.',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  description: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(999)
  priority?: number;
}
