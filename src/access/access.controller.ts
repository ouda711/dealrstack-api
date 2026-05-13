import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoleEntity } from '../roles/infrastructure/persistence/relational/entities/role.entity';
import { PermissionEntity } from './infrastructure/persistence/relational/entities/permission.entity';
import { TenantMembershipEntity } from './infrastructure/persistence/relational/entities/tenant-membership.entity';
import { AccessService } from './access.service';
import { UpdateTenantMembershipDto } from './dto/update-tenant-membership.dto';
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
  @RequirePermissions('team.manage', 'team.view-branch')
  @HttpCode(HttpStatus.OK)
  findRoles(
    @Query('tenantId') tenantId?: string,
    @Request() request?: { user?: { id: number; role?: { id: number } } },
  ): Promise<RoleEntity[]> {
    return this.accessService.findRoles(
      tenantId ? Number(tenantId) : undefined,
      request?.user,
    );
  }

  @ApiOkResponse({
    type: PermissionEntity,
    isArray: true,
  })
  @Get('roles/:id/permissions')
  @RequirePermissions('team.manage', 'team.view-branch')
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
  @RequirePermissions('team.manage', 'team.view-branch')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List tenant team memberships',
    description:
      'Returns tenant members, their roles, status, titles, and branch assignment context.',
  })
  @ApiParam({
    name: 'tenantId',
    type: String,
    required: true,
  })
  findTenantMemberships(
    @Param('tenantId') tenantId: string,
    @Request() request: { user?: { id: number; role?: { id: number } } },
  ): Promise<TenantMembershipEntity[]> {
    return this.accessService.findTenantMemberships(
      Number(tenantId),
      request.user,
      {
        activeOnly: false,
      },
    );
  }

  @ApiOkResponse({
    type: TenantMembershipEntity,
  })
  @Patch('tenants/:tenantId/memberships/:membershipId')
  @RequirePermissions('team.manage')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update a tenant team membership',
    description:
      'Updates a member role, title, or membership status within the selected tenant workspace.',
  })
  @ApiBody({
    type: UpdateTenantMembershipDto,
  })
  @ApiParam({
    name: 'tenantId',
    type: String,
    required: true,
  })
  @ApiParam({
    name: 'membershipId',
    type: String,
    required: true,
  })
  updateTenantMembership(
    @Param('tenantId') tenantId: string,
    @Param('membershipId') membershipId: string,
    @Body() updateTenantMembershipDto: UpdateTenantMembershipDto,
    @Request() request: { user?: { id: number; role?: { id: number } } },
  ): Promise<TenantMembershipEntity> {
    return this.accessService.updateTenantMembership(
      Number(tenantId),
      Number(membershipId),
      updateTenantMembershipDto,
      request.user,
    );
  }
}
