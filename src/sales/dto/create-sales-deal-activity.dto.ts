import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { SalesActivityType } from '../domain/sales.enums';

export class CreateSalesDealActivityDto {
  @ApiProperty({ example: 'Customer requested revised financing quote' })
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  summary: string;

  @ApiPropertyOptional({
    enum: SalesActivityType,
    example: SalesActivityType.Note,
  })
  @IsOptional()
  @IsEnum(SalesActivityType)
  type?: SalesActivityType;
}
