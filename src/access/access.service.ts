import {
  HttpStatus,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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
import { UpdateTenantMembershipDto } from './dto/update-tenant-membership.dto';

type PermissionGrant = Pick<
  PermissionEntity,
  'id' | 'key' | 'domain' | 'label' | 'description'
>;
type AccessRole = RoleEntity | Role;
type AccessActor = {
  id?: number | string;
  role?: {
    id?: number | string;
  } | null;
};

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

export type TenantMembershipWithBranches = TenantMembershipEntity & {
  assignedBranches: UserBranchAccess[];
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

  async findRoles(
    tenantId?: number,
    actor?: AccessActor,
  ): Promise<RoleEntity[]> {
    if (!tenantId) {
      if (!(await this.hasPlatformManagePermission(actor))) {
        return [];
      }

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

    const roles = await this.roleRepository.find({
      where: {
        scope: RoleScope.Tenant,
        tenant: {
          id: tenantId,
        },
        isActive: true,
      },
      order: {
        name: 'ASC',
      },
    });

    if (await this.canViewTenantTeam(tenantId, actor)) {
      return roles;
    }

    return roles.filter(
      (role) => !['owner', 'tenant-admin'].includes(role.key || ''),
    );
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

  async findTenantMemberships(
    tenantId: number,
    actor?: AccessActor,
    options: { activeOnly?: boolean } = {},
  ): Promise<TenantMembershipWithBranches[]> {
    const canViewTenantTeam = actor
      ? await this.canViewTenantTeam(tenantId, actor)
      : true;
    const visibleUserIds = canViewTenantTeam
      ? undefined
      : await this.findBranchScopedVisibleUserIds(tenantId, actor);

    if (visibleUserIds && !visibleUserIds.length) {
      return [];
    }

    const memberships = await this.tenantMembershipRepository.find({
      where: {
        tenant: {
          id: tenantId,
        },
        ...(visibleUserIds
          ? {
              user: {
                id: In(visibleUserIds),
              },
            }
          : {}),
        ...(options.activeOnly === false
          ? {}
          : { status: TenantMembershipStatus.Active }),
      },
      order: {
        createdAt: 'ASC',
      },
    });

    return this.withAssignedBranches(tenantId, memberships);
  }

  async updateTenantMembership(
    tenantId: number,
    membershipId: number,
    updateTenantMembershipDto: UpdateTenantMembershipDto,
    actor?: AccessActor,
  ): Promise<TenantMembershipWithBranches> {
    if (!(await this.canViewTenantTeam(tenantId, actor))) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        error: 'tenantMembershipManageForbidden',
      });
    }

    const membership = await this.tenantMembershipRepository.findOne({
      where: {
        id: membershipId,
        tenant: {
          id: tenantId,
        },
      },
    });

    if (!membership) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'tenantMembershipNotFound',
      });
    }

    if (updateTenantMembershipDto.roleId !== undefined) {
      membership.role = await this.getTenantRoleOrThrow(
        tenantId,
        updateTenantMembershipDto.roleId,
      );
    }

    if (updateTenantMembershipDto.title !== undefined) {
      membership.title = updateTenantMembershipDto.title?.trim() || null;
    }

    if (updateTenantMembershipDto.status !== undefined) {
      membership.status = updateTenantMembershipDto.status;
    }

    const updatedMembership =
      await this.tenantMembershipRepository.save(membership);

    return this.withAssignedBranches(tenantId, [updatedMembership]).then(
      ([membershipWithBranches]) => membershipWithBranches,
    );
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

  private async hasPlatformManagePermission(
    actor?: AccessActor,
  ): Promise<boolean> {
    const platformRoleId = Number(actor?.role?.id);

    if (!platformRoleId) {
      return false;
    }

    const permissions = await this.findRolePermissions(platformRoleId);

    return permissions.some(
      (permission) => permission.key === 'platform.manage',
    );
  }

  private async canViewTenantTeam(
    tenantId: number,
    actor?: AccessActor,
  ): Promise<boolean> {
    if (await this.hasPlatformManagePermission(actor)) {
      return true;
    }

    const userId = Number(actor?.id);

    if (!userId) {
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

    const permissions = await this.findRolePermissions(membership.role.id);

    return permissions.some(
      (permission) => permission.key === 'branches.manage-all',
    );
  }

  private async findBranchScopedVisibleUserIds(
    tenantId: number,
    actor?: AccessActor,
  ): Promise<number[]> {
    const userId = Number(actor?.id);

    if (!userId) {
      return [];
    }

    const actorBranches = await this.branchRepository.find({
      where: {
        tenant: {
          id: tenantId,
        },
        manager: {
          id: userId,
        },
        isActive: true,
      },
    });
    const actorBranchIds = actorBranches.map((branch) => branch.id);

    if (!actorBranchIds.length) {
      return [userId];
    }

    const branchUsers = await this.branchRepository.find({
      where: {
        tenant: {
          id: tenantId,
        },
        id: In(actorBranchIds),
        isActive: true,
      },
    });
    const branchManagerIds = branchUsers
      .map((branch) => branch.manager?.id)
      .filter(Boolean) as number[];

    return Array.from(new Set([userId, ...branchManagerIds]));
  }

  private async withAssignedBranches(
    tenantId: number,
    memberships: TenantMembershipEntity[],
  ): Promise<TenantMembershipWithBranches[]> {
    const userIds = memberships
      .map((membership) => membership.user?.id)
      .filter(Boolean) as number[];

    if (!userIds.length) {
      return memberships.map((membership) =>
        Object.assign(membership, { assignedBranches: [] }),
      );
    }

    const branches = await this.branchRepository.find({
      where: {
        tenant: {
          id: tenantId,
        },
        manager: {
          id: In(userIds),
        },
        isActive: true,
      },
      order: {
        code: 'ASC',
      },
    });
    const branchesByManagerId = branches.reduce(
      (acc, branch) => {
        const managerId = branch.manager?.id;

        if (!managerId) {
          return acc;
        }

        acc[managerId] = acc[managerId] || [];
        acc[managerId].push({
          id: branch.id,
          name: branch.name,
          code: branch.code,
        });

        return acc;
      },
      {} as Record<number, UserBranchAccess[]>,
    );

    return memberships.map((membership) => {
      const safeUser = { ...membership.user };

      delete safeUser.role;
      delete safeUser.password;

      return {
        ...membership,
        user: safeUser,
        assignedBranches: branchesByManagerId[membership.user.id] || [],
      } as TenantMembershipWithBranches;
    });
  }

  private async getTenantRoleOrThrow(
    tenantId: number,
    roleId: number,
  ): Promise<RoleEntity> {
    const role = await this.roleRepository.findOne({
      where: {
        id: roleId,
      },
      relations: {
        tenant: true,
      },
    });

    if (
      !role ||
      role.scope !== RoleScope.Tenant ||
      Number(role.tenant?.id) !== tenantId
    ) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          roleId: 'tenantRoleNotFound',
        },
      });
    }

    return role;
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
