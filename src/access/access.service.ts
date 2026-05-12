import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  RoleEntity,
  RoleScope,
} from '../roles/infrastructure/persistence/relational/entities/role.entity';
import { PermissionEntity } from './infrastructure/persistence/relational/entities/permission.entity';
import { RolePermissionEntity } from './infrastructure/persistence/relational/entities/role-permission.entity';
import {
  TenantMembershipEntity,
  TenantMembershipStatus,
} from './infrastructure/persistence/relational/entities/tenant-membership.entity';

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
}
