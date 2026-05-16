import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateSalesPipelineDealDto {
  @ApiProperty({ example: 'new_lead' })
  @IsString()
  @MaxLength(50)
  stageKey: string;

  @ApiProperty({ example: '2021 Toyota Harrier — deposit follow-up' })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title: string;

  @ApiProperty({ example: 'James Mwangi' })
  @IsString()
  @MinLength(1)
  @MaxLength(150)
  customerName: string;

  @ApiProperty({ example: '+254712345678' })
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  customerPhone: string;

  @ApiPropertyOptional({ example: 'Interested in financing options' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  interestSummary?: string;

  @ApiPropertyOptional({ example: 3500000 })
  @IsOptional()
  @IsInt()
  @Min(0)
  valueKes?: number;

  @ApiPropertyOptional({
    example: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600',
  })
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  imageUrl?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  branchId?: number;

  @ApiPropertyOptional({ example: 30 })
  @IsOptional()
  @IsInt()
  assignedUserId?: number;
}
