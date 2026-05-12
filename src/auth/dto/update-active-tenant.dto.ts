import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class UpdateActiveTenantDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Tenant workspace to persist as the user active context.',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  tenantId: number;
}
