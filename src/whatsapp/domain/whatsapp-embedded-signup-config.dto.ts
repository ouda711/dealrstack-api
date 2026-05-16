import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WhatsAppEmbeddedSignupConfigDto {
  @ApiProperty()
  appId: string;

  @ApiPropertyOptional()
  configId?: string | null;

  @ApiProperty()
  redirectUri: string;

  @ApiProperty()
  sdkVersion: string;
}
