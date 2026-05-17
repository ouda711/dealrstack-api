import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class PublicWebsiteLeadDto {
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

  @ApiPropertyOptional({ example: 'Interested in Toyota Harrier' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  interestSummary?: string;
}
