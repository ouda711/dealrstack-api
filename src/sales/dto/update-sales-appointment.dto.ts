import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import {
  SalesAppointmentStatus,
  SalesAppointmentType,
} from '../domain/sales.enums';

export class UpdateSalesAppointmentDto {
  @ApiPropertyOptional({ enum: SalesAppointmentType })
  @IsOptional()
  @IsEnum(SalesAppointmentType)
  type?: SalesAppointmentType;

  @ApiPropertyOptional({ enum: SalesAppointmentStatus })
  @IsOptional()
  @IsEnum(SalesAppointmentStatus)
  status?: SalesAppointmentStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @ApiPropertyOptional({ example: 5 })
  @IsOptional()
  @IsInt()
  @Min(1)
  assignedUserId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(15)
  @Max(480)
  durationMinutes?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  location?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
