import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CompleteWhatsAppEmbeddedSignupDto {
  @ApiProperty({
    description:
      'Authorization code returned by Meta Embedded Signup / FB.login',
  })
  @IsString()
  @MinLength(8)
  code: string;

  @ApiProperty({
    description: 'Must match the redirect URI used in the OAuth dialog',
    example: 'http://localhost:3000/workspace/conversations/whatsapp-callback',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(500)
  redirectUri: string;

  @ApiPropertyOptional({
    description:
      'Phone number ID from the WA_EMBEDDED_SIGNUP FINISH event, if available',
  })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  phoneNumberId?: string;

  @ApiPropertyOptional({
    description:
      'WhatsApp Business Account ID from the FINISH event, if available',
  })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  wabaId?: string;
}
