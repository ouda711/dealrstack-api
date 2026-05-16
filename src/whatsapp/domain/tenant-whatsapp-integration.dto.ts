import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TenantWhatsAppIntegrationDto {
  @ApiProperty()
  tenantId: string;

  @ApiProperty()
  phoneNumberId: string;

  @ApiPropertyOptional()
  wabaId?: string | null;

  @ApiPropertyOptional()
  displayPhoneNumber?: string | null;

  @ApiProperty()
  isEnabled: boolean;

  @ApiProperty({
    description:
      'Whether an access token is stored (token value is never returned)',
  })
  hasAccessToken: boolean;

  @ApiPropertyOptional({
    description: 'Last four characters of the stored token, if available',
  })
  accessTokenLast4?: string | null;
}
