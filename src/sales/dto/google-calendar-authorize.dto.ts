import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class GoogleCalendarAuthorizeDto {
  @ApiPropertyOptional({
    description:
      'OAuth redirect URI registered in Google Cloud (must match authorize callback)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(512)
  redirectUri?: string;
}
