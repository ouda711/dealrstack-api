import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Tenant } from '../domain/tenant';

export class FilterTenantDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class SortTenantDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Tenant;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryTenantDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterTenantDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterTenantDto)
  filters?: FilterTenantDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortTenantDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortTenantDto)
  sort?: SortTenantDto[] | null;
}
