import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';
import { VehicleMediaKind } from '../infrastructure/persistence/relational/entities/vehicle-media.entity';

export class CreateVehicleMediaDto {
  @ApiProperty({ enum: VehicleMediaKind })
  @IsEnum(VehicleMediaKind)
  kind: VehicleMediaKind;

  @ApiProperty({
    example: 'https://cdn.example.com/vehicles/photo-1.jpg',
  })
  @IsString()
  @MaxLength(2048)
  @IsUrl({ require_tld: false })
  url: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  caption?: string | null;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  sortOrder?: number;
}
