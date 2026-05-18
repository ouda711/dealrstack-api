import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpsertSalesPushSubscriptionDto {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  endpoint: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  p256dh: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  auth: string;
}
