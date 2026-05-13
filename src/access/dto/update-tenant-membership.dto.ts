import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { TenantMembershipStatus } from '../infrastructure/persistence/relational/entities/tenant-membership.entity';

export class UpdateTenantMembershipDto {
  @ApiPropertyOptional({
    example: 12,
    description: 'Tenant-scoped role ID to assign to the member.',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  roleId?: number;

  @ApiPropertyOptional({
    example: 'Branch Manager',
    nullable: true,
    description: 'Operational title shown for this tenant membership.',
  })
  @IsOptional()
  @IsString()
  title?: string | null;

  @ApiPropertyOptional({
    enum: TenantMembershipStatus,
    example: TenantMembershipStatus.Active,
    description: 'Membership lifecycle status in the tenant workspace.',
  })
  @IsOptional()
  @IsEnum(TenantMembershipStatus)
  status?: TenantMembershipStatus;
}
