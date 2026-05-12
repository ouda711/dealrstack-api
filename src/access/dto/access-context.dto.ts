import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AccessPermissionDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'team.manage' })
  key: string;

  @ApiProperty({ example: 'team' })
  domain: string;

  @ApiProperty({ example: 'Manage team' })
  label: string;

  @ApiProperty({
    example:
      'Can invite staff, manage roles, assign people to work, and control access within the workspace.',
  })
  description: string;
}

export class AccessTenantDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Nairobi Auto Hub' })
  name?: string | null;

  @ApiProperty({ example: 'nairobi-auto-hub' })
  slug?: string | null;
}

export class AccessRoleDto {
  @ApiProperty({ example: 10 })
  id: number | string;

  @ApiProperty({ example: 'tenant-admin' })
  key?: string | null;

  @ApiProperty({ example: 'Tenant Admin' })
  name?: string | null;

  @ApiProperty({ example: 'tenant' })
  scope?: string | null;
}

export class TenantMembershipAccessDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'active' })
  status: string;

  @ApiPropertyOptional({ example: 'Tenant Admin' })
  title?: string | null;

  @ApiProperty({ type: () => AccessTenantDto })
  tenant: AccessTenantDto;

  @ApiProperty({ type: () => AccessRoleDto })
  role: AccessRoleDto;

  @ApiProperty({ type: () => AccessPermissionDto, isArray: true })
  permissions: AccessPermissionDto[];
}

export class UserAccessContextDto {
  @ApiPropertyOptional({
    type: () => AccessTenantDto,
    nullable: true,
    description:
      'The active tenant context. Null when the user belongs to multiple tenants and no tenant was selected.',
  })
  currentTenant: AccessTenantDto | null;

  @ApiPropertyOptional({
    type: () => AccessRoleDto,
    nullable: true,
    description: 'The user role within the active tenant context.',
  })
  currentTenantRole: AccessRoleDto | null;

  @ApiPropertyOptional({
    type: () => TenantMembershipAccessDto,
    nullable: true,
    description: 'The active tenant membership for the current tenant context.',
  })
  currentMembership: TenantMembershipAccessDto | null;

  @ApiPropertyOptional({
    type: () => AccessRoleDto,
    nullable: true,
    description:
      'The platform-level role. Tenant capabilities should come from tenant memberships.',
  })
  platformRole: AccessRoleDto | null;

  @ApiProperty({
    type: () => AccessPermissionDto,
    isArray: true,
    description: 'Platform-level permissions granted by the platform role.',
  })
  platformPermissions: AccessPermissionDto[];

  @ApiProperty({
    type: () => TenantMembershipAccessDto,
    isArray: true,
    description:
      'All active tenant memberships. A user can have different roles and permissions in each tenant.',
  })
  tenantMemberships: TenantMembershipAccessDto[];

  @ApiProperty({
    type: () => AccessPermissionDto,
    isArray: true,
    description:
      'Effective permissions for the selected current tenant plus platform permissions.',
  })
  permissions: AccessPermissionDto[];
}
