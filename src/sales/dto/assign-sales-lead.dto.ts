import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class AssignSalesLeadDto {
  @ApiProperty({ example: 30 })
  @IsInt()
  assignedUserId: number;

  @ApiPropertyOptional({ example: 'Round robin (SUV leads)' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  assignmentReason?: string;
}
