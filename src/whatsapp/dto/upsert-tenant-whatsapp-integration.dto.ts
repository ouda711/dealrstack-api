import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpsertTenantWhatsAppIntegrationDto {
  @ApiProperty({ example: '123456789012345' })
  @IsString()
  @MinLength(5)
  @MaxLength(64)
  phoneNumberId: string;

  @ApiProperty({
    description: 'Long-lived access token from Meta for this WABA',
  })
  @IsString()
  @MinLength(20)
  accessToken: string;

  @ApiPropertyOptional({ example: '123456789012345' })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  wabaId?: string;

  @ApiPropertyOptional({ example: '+254712345678' })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  displayPhoneNumber?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;
}
