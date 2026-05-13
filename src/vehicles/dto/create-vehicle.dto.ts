import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import {
  VehicleListingType,
  VehicleStatus,
} from '../infrastructure/persistence/relational/entities/vehicle.entity';

export class CreateVehicleDto {
  @ApiPropertyOptional({
    example: 1,
    description:
      'Preferred catalog brand ID. If omitted, make is used to create or resolve a brand.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  brandId?: number | null;

  @ApiPropertyOptional({
    example: 1,
    description:
      'Preferred catalog model ID. If omitted, model is used to create or resolve a model under the selected brand.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  modelId?: number | null;

  @ApiPropertyOptional({ example: 1, nullable: true })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  generationId?: number | null;

  @ApiPropertyOptional({ example: 1, nullable: true })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  trimId?: number | null;

  @ApiPropertyOptional({ example: 1, nullable: true })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  engineId?: number | null;

  @ApiPropertyOptional({ example: 1, nullable: true })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  bodyTypeId?: number | null;

  @ApiPropertyOptional({ example: 'Toyota' })
  @IsOptional()
  @IsString()
  make?: string | null;

  @ApiPropertyOptional({ example: 'Land Cruiser Prado' })
  @IsOptional()
  @IsString()
  model?: string | null;

  @ApiPropertyOptional({ example: 2021 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1886)
  @Max(new Date().getFullYear() + 1)
  year?: number | null;

  @ApiPropertyOptional({ example: 'SUV' })
  @IsOptional()
  @IsString()
  bodyType?: string | null;

  @ApiPropertyOptional({ example: 1, nullable: true })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  branchId?: number | null;

  @ApiPropertyOptional({ example: 4, nullable: true })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  assignedToId?: number | null;

  @ApiPropertyOptional({ example: 'JTEBU3FJ50K123456' })
  @IsOptional()
  @IsString()
  vin?: string | null;

  @ApiPropertyOptional({ example: 'KDA 123A' })
  @IsOptional()
  @IsString()
  plateNumber?: string | null;

  @ApiPropertyOptional({ example: 42000 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  mileage?: number;

  @ApiPropertyOptional({ example: 'locally_used' })
  @IsOptional()
  @IsString()
  condition?: string | null;

  @ApiPropertyOptional({ enum: VehicleListingType })
  @IsOptional()
  @IsEnum(VehicleListingType)
  listingType?: VehicleListingType;

  @ApiPropertyOptional({ enum: VehicleStatus })
  @IsOptional()
  @IsEnum(VehicleStatus)
  status?: VehicleStatus;

  @ApiPropertyOptional({ example: 8500000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price?: number | null;

  @ApiPropertyOptional({ example: 'Nairobi' })
  @IsOptional()
  @IsString()
  location?: string | null;

  @ApiPropertyOptional({ example: 'Pearl White' })
  @IsOptional()
  @IsString()
  exteriorColor?: string | null;

  @ApiPropertyOptional({ example: 'Black Leather' })
  @IsOptional()
  @IsString()
  interiorColor?: string | null;

  @ApiPropertyOptional({ example: '2021 Toyota Prado TX-L' })
  @IsOptional()
  @IsString()
  title?: string | null;

  @ApiPropertyOptional({ example: 'Clean SUV with full service history.' })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject()
  engineDetails?: Record<string, unknown> | null;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject()
  gearboxDetails?: Record<string, unknown> | null;

  @ApiPropertyOptional({ example: 'awd' })
  @IsOptional()
  @IsString()
  drivetrain?: string | null;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject()
  categorizedFeatures?: Record<string, string[]> | null;

  @ApiPropertyOptional({ type: Array })
  @IsOptional()
  @IsArray()
  flaws?: unknown[] | null;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject()
  listedOnBehalfOf?: Record<string, unknown> | null;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject()
  saleOptions?: Record<string, unknown> | null;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject()
  auctionOptions?: Record<string, unknown> | null;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject()
  rentalOptions?: Record<string, unknown> | null;

  @ApiPropertyOptional({ type: Array })
  @IsOptional()
  @IsArray()
  media?: unknown[] | null;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  highlights?: string[] | null;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  equipment?: string[] | null;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  modifications?: string[] | null;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  videoLinks?: string[] | null;

  @ApiPropertyOptional({
    type: Object,
    description:
      'Legacy flat fields such as transmission, fuelType, horsepower, torque, displacement, and engine.',
  })
  @IsOptional()
  @IsObject()
  backwardCompatibility?: Record<string, unknown> | null;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
