import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { RolePermissionEntity } from '../access/infrastructure/persistence/relational/entities/role-permission.entity';
import {
  TenantMembershipEntity,
  TenantMembershipStatus,
} from '../access/infrastructure/persistence/relational/entities/tenant-membership.entity';
import { BranchEntity } from '../branches/infrastructure/persistence/relational/entities/branch.entity';
import { RoleEnum } from '../roles/roles.enum';
import { User } from '../users/domain/user';
import { AuditTrailEntity } from './infrastructure/persistence/relational/entities/audit-trail.entity';
import { CreateAuditTrailEventDto } from './dto/create-audit-trail-event.dto';
import { QueryAuditTrailDto } from './dto/query-audit-trail.dto';

type AuditActor = Pick<User, 'id' | 'role'>;

@Injectable()
export class AuditTrailService {
  constructor(
    @InjectRepository(AuditTrailEntity)
    private readonly auditTrailRepository: Repository<AuditTrailEntity>,
    @InjectRepository(BranchEntity)
    private readonly branchRepository: Repository<BranchEntity>,
    @InjectRepository(TenantMembershipEntity)
    private readonly tenantMembershipRepository: Repository<TenantMembershipEntity>,
    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
  ) {}

  async record(event: CreateAuditTrailEventDto): Promise<AuditTrailEntity> {
    const auditEvent = this.auditTrailRepository.create({
      tenant: {
        id: event.tenantId,
      },
      branch: event.branchId
        ? {
            id: event.branchId,
          }
        : null,
      actor: event.actor?.id
        ? {
            id: Number(event.actor.id),
          }
        : null,
      action: event.action,
      description: event.description,
      metadata: {
        ...(event.metadata || {}),
        actorEmail: event.actor?.email || undefined,
      },
    });

    return this.auditTrailRepository.save(auditEvent);
  }

  async findByTenant(
    tenantId: number,
    actor: AuditActor,
    query: QueryAuditTrailDto,
  ): Promise<{
    data: AuditTrailEntity[];
    total: number;
    page: number;
    limit: number;
  }> {
    const page = query.page || 1;
    const limit = query.limit || 25;
    const visibleBranchIds = await this.getVisibleBranchIds(tenantId, actor);
    const where: FindOptionsWhere<AuditTrailEntity> = {
      tenant: {
        id: tenantId,
      },
      ...(query.action ? { action: query.action } : {}),
    };

    if (query.branchId) {
      where.branch = {
        id: query.branchId,
      };
    } else if (visibleBranchIds) {
      where.branch = {
        id: In(visibleBranchIds),
      };
    }

    const [data, total] = await this.auditTrailRepository.findAndCount({
      where,
      order: {
        occurredAt: 'DESC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  private async getVisibleBranchIds(
    tenantId: number,
    actor: AuditActor,
  ): Promise<number[] | undefined> {
    if (Number(actor.role?.id) === RoleEnum.superAdmin) {
      return undefined;
    }

    const membership = await this.tenantMembershipRepository.findOne({
      where: {
        tenant: {
          id: tenantId,
        },
        user: {
          id: Number(actor.id),
        },
        status: TenantMembershipStatus.Active,
      },
    });

    if (!membership?.role?.id) {
      return [];
    }

    const rolePermissions = await this.rolePermissionRepository.find({
      where: {
        role: {
          id: membership.role.id,
        },
      },
    });

    if (
      rolePermissions.some((rolePermission) =>
        ['branches.manage-all', 'settings.manage', 'workspace.manage'].includes(
          rolePermission.permission.key,
        ),
      )
    ) {
      return undefined;
    }

    const branches = await this.branchRepository.find({
      where: {
        tenant: {
          id: tenantId,
        },
        manager: {
          id: Number(actor.id),
        },
        isActive: true,
      },
    });

    return branches.map((branch) => branch.id);
  }
}
