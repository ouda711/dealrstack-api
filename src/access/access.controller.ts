import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoleEntity } from '../roles/infrastructure/persistence/relational/entities/role.entity';
import { PermissionEntity } from './infrastructure/persistence/relational/entities/permission.entity';
import { TenantMembershipEntity } from './infrastructure/persistence/relational/entities/tenant-membership.entity';
import { AccessService } from './access.service';
import { RequirePermissions } from './permissions.decorator';
import { PermissionsGuard } from './permissions.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@ApiTags('Access')
@Controller({
  path: 'access',
  version: '1',
})
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @ApiOkResponse({
    type: PermissionEntity,
    isArray: true,
  })
  @Get('permissions')
  @RequirePermissions('platform.manage')
  @HttpCode(HttpStatus.OK)
  findPermissions(): Promise<PermissionEntity[]> {
    return this.accessService.findPermissions();
  }

  @ApiOkResponse({
    type: RoleEntity,
    isArray: true,
  })
  @Get('roles')
  @RequirePermissions('team.manage')
  @HttpCode(HttpStatus.OK)
  findRoles(@Query('tenantId') tenantId?: string): Promise<RoleEntity[]> {
    return this.accessService.findRoles(
      tenantId ? Number(tenantId) : undefined,
    );
  }

  @ApiOkResponse({
    type: PermissionEntity,
    isArray: true,
  })
  @Get('roles/:id/permissions')
  @RequirePermissions('team.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findRolePermissions(@Param('id') id: string): Promise<PermissionEntity[]> {
    return this.accessService.findRolePermissions(Number(id));
  }

  @ApiOkResponse({
    type: TenantMembershipEntity,
    isArray: true,
  })
  @Get('tenants/:tenantId/memberships')
  @RequirePermissions('team.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'tenantId',
    type: String,
    required: true,
  })
  findTenantMemberships(
    @Param('tenantId') tenantId: string,
  ): Promise<TenantMembershipEntity[]> {
    return this.accessService.findTenantMemberships(Number(tenantId));
  }
}
