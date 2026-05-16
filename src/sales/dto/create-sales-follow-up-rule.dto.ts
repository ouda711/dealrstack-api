import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

export class CreateSalesFollowUpRuleDto {
  @ApiProperty({ example: 'No response in 10 minutes' })
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  label: string;

  @ApiProperty({ example: 'whatsapp_no_reply_10m' })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  trigger: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(1)
  @Max(525600)
  delayMinutes: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}
