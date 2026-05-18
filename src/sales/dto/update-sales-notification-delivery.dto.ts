import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { NotificationKind } from '../domain/sales.enums';

class SalesNotificationKindDeliveryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  email?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  push?: boolean;
}

export class UpdateSalesNotificationDeliveryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  emailEnabled?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  pushEnabled?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => SalesNotificationKindDeliveryDto)
  kinds?: Partial<Record<NotificationKind, SalesNotificationKindDeliveryDto>>;
}
