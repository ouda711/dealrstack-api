import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  builtInTenantRolePresets,
  permissionCatalog,
} from '../../../../access/domain/permission-catalog';
import { PermissionEntity } from '../../../../access/infrastructure/persistence/relational/entities/permission.entity';
import { RolePermissionEntity } from '../../../../access/infrastructure/persistence/relational/entities/role-permission.entity';
import {
  TenantMembershipEntity,
  TenantMembershipStatus,
} from '../../../../access/infrastructure/persistence/relational/entities/tenant-membership.entity';
import {
  RoleEntity,
  RoleScope,
} from '../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { RoleEnum } from '../../../../roles/roles.enum';
import { TenantEntity } from '../../../../tenants/infrastructure/persistence/relational/entities/tenant.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Injectable()
export class AccessSeedService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
    @InjectRepository(TenantMembershipEntity)
    private readonly tenantMembershipRepository: Repository<TenantMembershipEntity>,
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async run() {
    const permissions = await this.seedPermissions();
    await this.seedPlatformRoles(permissions);
    await this.seedTenantRolesAndMemberships(permissions);
  }

  private async seedPermissions() {
    for (const permission of permissionCatalog) {
      const existingPermission = await this.permissionRepository.findOne({
        where: {
          key: permission.key,
        },
      });

      await this.permissionRepository.save(
        this.permissionRepository.create({
          ...existingPermission,
          ...permission,
        }),
      );
    }

    return this.permissionRepository.find({
      where: {
        key: In(permissionCatalog.map((permission) => permission.key)),
      },
    });
  }

  private async seedPlatformRoles(permissions: PermissionEntity[]) {
    const platformRoles = [
      {
        id: RoleEnum.superAdmin,
        key: 'super-admin',
        name: 'Super Admin',
        description:
          'Owner-level role for administering DealrStack across the whole application.',
        permissionKeys: ['platform.manage'],
      },
      {
        id: RoleEnum.user,
        key: 'platform-user',
        name: 'User',
        description:
          'Default platform user role. Tenant access is controlled through workspace memberships.',
        permissionKeys: [],
      },
    ];

    for (const rolePreset of platformRoles) {
      const existingRole = await this.roleRepository.findOne({
        where: {
          id: rolePreset.id,
        },
      });

      const role = await this.roleRepository.save(
        this.roleRepository.create({
          ...existingRole,
          id: rolePreset.id,
          key: rolePreset.key,
          name: rolePreset.name,
          description: rolePreset.description,
          scope: RoleScope.Platform,
          tenant: null,
          isSystem: true,
          isActive: true,
        }),
      );

      await this.seedRolePermissions(
        role,
        permissions,
        rolePreset.permissionKeys,
      );
    }
  }

  private async seedTenantRolesAndMemberships(permissions: PermissionEntity[]) {
    const tenants = await this.tenantRepository.find();

    for (const tenant of tenants) {
      const rolesByKey = new Map<string, RoleEntity>();

      for (const rolePreset of builtInTenantRolePresets) {
        const existingRole = await this.roleRepository.findOne({
          where: {
            scope: RoleScope.Tenant,
            tenant: {
              id: tenant.id,
            },
            key: rolePreset.key,
          },
        });

        const role = await this.roleRepository.save(
          this.roleRepository.create({
            ...existingRole,
            tenant,
            key: rolePreset.key,
            name: rolePreset.name,
            description: rolePreset.description,
            scope: RoleScope.Tenant,
            isSystem: true,
            isActive: true,
          }),
        );

        await this.seedRolePermissions(
          role,
          permissions,
          rolePreset.permissionKeys,
        );
        rolesByKey.set(rolePreset.key, role);
      }

      if (tenant.slug === 'nairobi-auto-hub') {
        await this.seedMembership({
          email: 'admin@dealrstack.com',
          tenant,
          role: rolesByKey.get('owner'),
          title: 'Owner',
        });
        await this.seedMembership({
          email: 'sales@dealrstack.com',
          tenant,
          role: rolesByKey.get('salesperson'),
          title: 'Salesperson',
        });
        await this.seedMembership({
          email: 'tenant-admin@dealrstack.com',
          tenant,
          role: rolesByKey.get('tenant-admin'),
          title: 'Tenant Admin',
        });
        await this.seedMembership({
          email: 'grace@nairobi-auto-hub.co.ke',
          tenant,
          role: rolesByKey.get('manager'),
          title: 'Branch Manager',
        });
        await this.seedMembership({
          email: 'brian@nairobi-auto-hub.co.ke',
          tenant,
          role: rolesByKey.get('manager'),
          title: 'Branch Manager',
        });
      }

      if (tenant.slug === 'mombasa-motors-yard') {
        await this.seedMembership({
          email: 'tenant-admin@dealrstack.com',
          tenant,
          role: rolesByKey.get('manager'),
          title: 'Branch Manager',
        });
        await this.seedMembership({
          email: 'amina@mombasa-motors.co.ke',
          tenant,
          role: rolesByKey.get('manager'),
          title: 'Branch Manager',
        });
        await this.seedMembership({
          email: 'hassan@mombasa-motors.co.ke',
          tenant,
          role: rolesByKey.get('manager'),
          title: 'Branch Manager',
        });
      }
    }
  }

  private async seedRolePermissions(
    role: RoleEntity,
    permissions: PermissionEntity[],
    permissionKeys: string[],
  ) {
    const permissionsByKey = new Map(
      permissions.map((permission) => [permission.key, permission]),
    );

    const desiredPermissions = permissionKeys
      .map((permissionKey) => permissionsByKey.get(permissionKey))
      .filter(Boolean) as PermissionEntity[];
    const desiredPermissionIds = new Set(
      desiredPermissions.map((permission) => permission.id),
    );
    const existingRolePermissions = await this.rolePermissionRepository.find({
      where: {
        role: {
          id: role.id,
        },
      },
    });
    const staleRolePermissions = existingRolePermissions.filter(
      (rolePermission) =>
        !desiredPermissionIds.has(rolePermission.permission.id),
    );

    if (staleRolePermissions.length) {
      await this.rolePermissionRepository.remove(staleRolePermissions);
    }

    for (const permission of desiredPermissions) {
      const existingRolePermission =
        await this.rolePermissionRepository.findOne({
          where: {
            role: {
              id: role.id,
            },
            permission: {
              id: permission.id,
            },
          },
        });

      if (!existingRolePermission) {
        await this.rolePermissionRepository.save(
          this.rolePermissionRepository.create({
            role,
            permission,
          }),
        );
      }
    }
  }

  private async seedMembership({
    email,
    tenant,
    role,
    title,
  }: {
    email: string;
    tenant: TenantEntity;
    role?: RoleEntity;
    title: string;
  }) {
    if (!role) {
      return;
    }

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return;
    }

    const existingMembership = await this.tenantMembershipRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
        tenant: {
          id: tenant.id,
        },
      },
    });

    await this.tenantMembershipRepository.save(
      this.tenantMembershipRepository.create({
        ...existingMembership,
        user,
        tenant,
        role,
        title,
        status: TenantMembershipStatus.Active,
      }),
    );
  }
}
