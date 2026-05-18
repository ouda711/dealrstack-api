import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SalesNotificationDeliveryPreferences } from '../sales-notification-delivery.util';

export class SalesNotificationDeliveryConfigDto {
  @ApiProperty()
  emailEnabled: boolean;

  @ApiProperty()
  pushEnabled: boolean;

  @ApiPropertyOptional()
  kinds?: SalesNotificationDeliveryPreferences['kinds'];

  @ApiPropertyOptional({
    description: 'VAPID public key for browser push subscription',
  })
  webPushPublicKey?: string | null;

  @ApiProperty({ example: true })
  webPushConfigured: boolean;
}
