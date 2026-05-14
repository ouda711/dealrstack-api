import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { VehicleDocumentType } from '../infrastructure/persistence/relational/entities/vehicle-document.entity';

export class CreateVehicleDocumentDto {
  @ApiProperty({ enum: VehicleDocumentType })
  @IsEnum(VehicleDocumentType)
  documentType: VehicleDocumentType;

  @ApiProperty({ example: 'Logbook copy' })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    example: 'https://cdn.example.com/docs/logbook.pdf',
  })
  @IsString()
  @MaxLength(2048)
  @IsUrl({ require_tld: false })
  url: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  notes?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  expiresAt?: string | null;
}
