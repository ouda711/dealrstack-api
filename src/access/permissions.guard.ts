import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolePermissionEntity } from './infrastructure/persistence/relational/entities/role-permission.entity';
import {
  TenantMembershipEntity,
  TenantMembershipStatus,
} from './infrastructure/persistence/relational/entities/tenant-membership.entity';
import { ACCESS_PERMISSIONS_KEY } from './permissions.decorator';

const PLATFORM_OWNER_PERMISSION = 'platform.manage';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
    @InjectRepository(TenantMembershipEntity)
    private readonly tenantMembershipRepository: Repository<TenantMembershipEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      ACCESS_PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = Number(request.user?.id);
    const platformRoleId = Number(request.user?.role?.id);

    if (!userId || !platformRoleId) {
      return false;
    }

    const platformPermissionKeys =
      await this.findRolePermissionKeys(platformRoleId);

    if (platformPermissionKeys.includes(PLATFORM_OWNER_PERMISSION)) {
      return true;
    }

    if (this.hasAnyPermission(platformPermissionKeys, requiredPermissions)) {
      return true;
    }

    const tenantId = this.getTenantIdFromRequest(request);

    if (!tenantId) {
      return false;
    }

    const membership = await this.tenantMembershipRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        tenant: {
          id: tenantId,
        },
        status: TenantMembershipStatus.Active,
      },
    });

    if (!membership?.role?.id) {
      return false;
    }

    const tenantPermissionKeys = await this.findRolePermissionKeys(
      membership.role.id,
    );

    return this.hasAnyPermission(tenantPermissionKeys, requiredPermissions);
  }

  private async findRolePermissionKeys(roleId: number): Promise<string[]> {
    const rolePermissions = await this.rolePermissionRepository.find({
      where: {
        role: {
          id: roleId,
        },
      },
    });

    return rolePermissions.map(
      (rolePermission) => rolePermission.permission.key,
    );
  }

  private hasAnyPermission(
    grantedPermissions: string[],
    requiredPermissions: string[],
  ): boolean {
    return requiredPermissions.some((permission) =>
      grantedPermissions.includes(permission),
    );
  }

  private getTenantIdFromRequest(request): number | undefined {
    const rawTenantId =
      request.params?.tenantId ??
      request.query?.tenantId ??
      request.body?.tenantId ??
      request.headers?.['x-tenant-id'];

    const tenantId = Number(rawTenantId);

    return Number.isFinite(tenantId) && tenantId > 0 ? tenantId : undefined;
  }
}
