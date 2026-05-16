import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { FollowUpStatus } from '../domain/sales.enums';

export class UpdateSalesActivityDto {
  @ApiProperty({ enum: FollowUpStatus, example: FollowUpStatus.Completed })
  @IsEnum(FollowUpStatus)
  status: FollowUpStatus;
}
