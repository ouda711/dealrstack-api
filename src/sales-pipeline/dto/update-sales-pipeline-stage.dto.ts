import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateSalesPipelineStageDto {
  @ApiPropertyOptional({ example: 'Qualified Lead' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  label?: string;
}
