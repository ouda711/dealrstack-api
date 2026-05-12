import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBranchDto {
  @ApiProperty({
    example: 'Westlands Showroom',
    type: String,
    description: 'Human-readable branch or showroom name.',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'WST',
    type: String,
    description: 'Short tenant-unique branch code used in operations.',
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    example: 'Nairobi',
    type: String,
    description: 'Primary city where the branch operates.',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiPropertyOptional({
    example: 'Waiyaki Way, Westlands',
    type: String,
    description: 'Optional branch street address or location note.',
  })
  @IsOptional()
  @IsString()
  address?: string | null;

  @ApiPropertyOptional({
    example: '+254700000101',
    type: String,
    description: 'Optional branch contact phone number.',
  })
  @IsOptional()
  @IsString()
  phone?: string | null;

  @ApiPropertyOptional({
    example: 'Grace Wanjiku',
    type: String,
    description: 'Optional branch manager display name.',
  })
  @IsOptional()
  @IsString()
  managerName?: string | null;

  @ApiPropertyOptional({
    example: '+254700000111',
    type: String,
    description: 'Optional branch manager contact phone.',
  })
  @IsOptional()
  @IsString()
  managerPhone?: string | null;

  @ApiPropertyOptional({
    example: 'grace@nairobi-auto-hub.co.ke',
    type: String,
    description: 'Optional branch manager email.',
  })
  @IsOptional()
  @IsString()
  managerEmail?: string | null;

  @ApiPropertyOptional({
    example: 'Mon-Sat, 8:30 AM - 6:00 PM',
    type: String,
    description: 'Optional public or internal branch operating hours.',
  })
  @IsOptional()
  @IsString()
  openingHours?: string | null;

  @ApiPropertyOptional({
    example: true,
    type: Boolean,
    description: 'Whether this branch is available for active operations.',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
