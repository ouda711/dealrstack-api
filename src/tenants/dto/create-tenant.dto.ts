import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';

export class CreateTenantDto {
  @ApiProperty({ example: 'Nairobi Auto Hub', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'nairobi-auto-hub', type: String })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug must be lowercase words separated by hyphens',
  })
  slug: string;

  @ApiProperty({ example: 'KE', type: String })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ example: 'Africa/Nairobi', type: String })
  @IsNotEmpty()
  @IsString()
  timezone: string;

  @ApiProperty({ example: 'KES', type: String })
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiPropertyOptional({ example: '+254700000000', type: String })
  @IsOptional()
  @IsString()
  phone?: string | null;

  @ApiPropertyOptional({
    example: 'sales@nairobi-auto-hub.co.ke',
    type: String,
  })
  @IsOptional()
  @IsEmail()
  email?: string | null;

  @ApiPropertyOptional({
    example: 'https://nairobi-auto-hub.co.ke',
    type: String,
  })
  @IsOptional()
  @IsUrl({ require_tld: false })
  website?: string | null;

  @ApiPropertyOptional({ example: true, type: Boolean })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
