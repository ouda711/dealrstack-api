import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BranchEntity } from '../branches/infrastructure/persistence/relational/entities/branch.entity';
import {
  RoleEntity,
  RoleScope,
} from '../roles/infrastructure/persistence/relational/entities/role.entity';
import type { Role } from '../roles/domain/role';
import { PermissionEntity } from './infrastructure/persistence/relational/entities/permission.entity';
import { RolePermissionEntity } from './infrastructure/persistence/relational/entities/role-permission.entity';
import {
  TenantMembershipEntity,
  TenantMembershipStatus,
} from './infrastructure/persistence/relational/entities/tenant-membership.entity';

type PermissionGrant = Pick<
  PermissionEntity,
  'id' | 'key' | 'domain' | 'label' | 'description'
>;
type AccessRole = RoleEntity | Role;

type UserTenantMembershipAccess = {
  id: number;
  status: TenantMembershipStatus;
  title?: string | null;
  tenant: {
    id: number;
    name?: string | null;
    slug?: string | null;
  };
  role: RoleEntity;
  permissions: PermissionGrant[];
};

type UserBranchAccess = {
  id: number;
  name: string;
  code: string;
};

export type UserAccessContext = {
  currentTenant: UserTenantMembershipAccess['tenant'] | null;
  currentTenantRole: RoleEntity | null;
  currentMembership: UserTenantMembershipAccess | null;
  currentBranch: UserBranchAccess | null;
  currentBranches: UserBranchAccess[];
  platformRole: AccessRole | null;
  platformPermissions: PermissionGrant[];
  tenantMemberships: UserTenantMembershipAccess[];
  permissions: PermissionGrant[];
};

@Injectable()
export class AccessService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
    @InjectRepository(TenantMembershipEntity)
    private readonly tenantMembershipRepository: Repository<TenantMembershipEntity>,
    @InjectRepository(BranchEntity)
    private readonly branchRepository: Repository<BranchEntity>,
  ) {}

  findPermissions(): Promise<PermissionEntity[]> {
    return this.permissionRepository.find({
      order: {
        domain: 'ASC',
        key: 'ASC',
      },
    });
  }

  async findRoles(tenantId?: number): Promise<RoleEntity[]> {
    if (!tenantId) {
      return this.roleRepository.find({
        where: {
          scope: RoleScope.Platform,
          isActive: true,
        },
        order: {
          scope: 'ASC',
          name: 'ASC',
        },
      });
    }

    return this.roleRepository.find({
      where: [
        {
          scope: RoleScope.Platform,
          isActive: true,
        },
        {
          scope: RoleScope.Tenant,
          tenant: {
            id: tenantId,
          },
          isActive: true,
        },
      ],
      order: {
        scope: 'ASC',
        name: 'ASC',
      },
    });
  }

  async findRolePermissions(roleId: number): Promise<PermissionEntity[]> {
    const rolePermissions = await this.rolePermissionRepository.find({
      where: {
        role: {
          id: roleId,
        },
      },
      order: {
        permission: {
          domain: 'ASC',
          key: 'ASC',
        },
      },
    });

    return rolePermissions.map((rolePermission) => rolePermission.permission);
  }

  async getUserAccessContext({
    userId,
    platformRole,
    currentTenantId,
  }: {
    userId: number;
    platformRole?: AccessRole | null;
    currentTenantId?: number;
  }): Promise<UserAccessContext> {
    const [platformPermissions, tenantMemberships] = await Promise.all([
      platformRole?.id ? this.findRolePermissions(Number(platformRole.id)) : [],
      this.findUserTenantMembershipAccess(userId),
    ]);
    const currentMembership = this.resolveCurrentMembership(
      tenantMemberships,
      currentTenantId,
    );
    const currentTenantPermissions = currentMembership?.role?.id
      ? await this.findRolePermissions(currentMembership.role.id)
      : [];
    const currentMembershipWithPermissions = currentMembership
      ? {
          ...currentMembership,
          permissions: currentTenantPermissions,
        }
      : null;
    const currentBranches = currentMembership
      ? await this.findUserAssignedBranches(userId, currentMembership.tenant.id)
      : [];
    const permissions = this.uniquePermissions([
      ...platformPermissions,
      ...currentTenantPermissions,
    ]);

    return {
      currentTenant: currentMembershipWithPermissions?.tenant || null,
      currentTenantRole: currentMembershipWithPermissions?.role || null,
      currentMembership: currentMembershipWithPermissions,
      currentBranch: currentBranches[0] || null,
      currentBranches,
      platformRole: platformRole || null,
      platformPermissions,
      tenantMemberships,
      permissions,
    };
  }

  findTenantMemberships(tenantId: number): Promise<TenantMembershipEntity[]> {
    return this.tenantMembershipRepository.find({
      where: {
        tenant: {
          id: tenantId,
        },
        status: TenantMembershipStatus.Active,
      },
      order: {
        createdAt: 'ASC',
      },
    });
  }

  private async findUserTenantMembershipAccess(
    userId: number,
  ): Promise<UserTenantMembershipAccess[]> {
    const memberships = await this.tenantMembershipRepository.find({
      where: {
        user: {
          id: userId,
        },
        status: TenantMembershipStatus.Active,
      },
      order: {
        createdAt: 'ASC',
      },
    });

    return memberships.map((membership) => ({
      id: membership.id,
      status: membership.status,
      title: membership.title,
      tenant: {
        id: membership.tenant.id,
        name: membership.tenant.name,
        slug: membership.tenant.slug,
      },
      role: membership.role,
      permissions: [],
    }));
  }

  private async findUserAssignedBranches(
    userId: number,
    tenantId: number,
  ): Promise<UserBranchAccess[]> {
    const branches = await this.branchRepository.find({
      where: {
        tenant: {
          id: tenantId,
        },
        manager: {
          id: userId,
        },
        isActive: true,
      },
      order: {
        createdAt: 'ASC',
        code: 'ASC',
      },
    });

    return branches.map((branch) => ({
      id: branch.id,
      name: branch.name,
      code: branch.code,
    }));
  }

  private resolveCurrentMembership(
    memberships: UserTenantMembershipAccess[],
    currentTenantId?: number,
  ): UserTenantMembershipAccess | null {
    if (currentTenantId) {
      return (
        memberships.find(
          (membership) => membership.tenant.id === currentTenantId,
        ) || null
      );
    }

    return memberships.length === 1 ? memberships[0] : null;
  }

  private uniquePermissions(permissions: PermissionGrant[]): PermissionGrant[] {
    const permissionsByKey = new Map<string, PermissionGrant>();

    permissions.forEach((permission) => {
      permissionsByKey.set(permission.key, permission);
    });

    return Array.from(permissionsByKey.values());
  }
}
