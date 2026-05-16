import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSalesPipelineStageDto {
  @ApiProperty({ example: 'Finance review' })
  @IsString()
  @MaxLength(100)
  label: string;

  @ApiPropertyOptional({ example: 'primary' })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  color?: string;
}
