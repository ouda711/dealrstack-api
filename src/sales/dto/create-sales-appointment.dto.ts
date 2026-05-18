import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { SalesAppointmentType } from '../domain/sales.enums';

export class CreateSalesAppointmentDto {
  @ApiProperty({ example: 12 })
  @IsInt()
  @Min(1)
  leadId: number;

  @ApiPropertyOptional({ example: 8 })
  @IsOptional()
  @IsInt()
  @Min(1)
  dealId?: number;

  @ApiPropertyOptional({ example: 42 })
  @IsOptional()
  @IsInt()
  @Min(1)
  vehicleId?: number;

  @ApiPropertyOptional({ example: 5 })
  @IsOptional()
  @IsInt()
  @Min(1)
  assignedUserId?: number;

  @ApiProperty({
    enum: SalesAppointmentType,
    example: SalesAppointmentType.TestDrive,
  })
  @IsEnum(SalesAppointmentType)
  type: SalesAppointmentType;

  @ApiProperty({ example: '2026-05-20T10:00:00.000Z' })
  @IsDateString()
  scheduledAt: string;

  @ApiPropertyOptional({ example: 60 })
  @IsOptional()
  @IsInt()
  @Min(15)
  @Max(480)
  durationMinutes?: number;

  @ApiPropertyOptional({ example: 'Nairobi Auto Hub — Westlands' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  location?: string;

  @ApiPropertyOptional({ example: 'Customer prefers morning slot' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;

  @ApiPropertyOptional({
    description:
      'When scheduling a test drive, move the linked deal to the test-drive pipeline stage if one exists.',
  })
  @IsOptional()
  @IsBoolean()
  moveToTestDriveStage?: boolean;
}
