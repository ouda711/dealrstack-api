import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AccessService } from '../access/access.service';
import { RoleEnum } from '../roles/roles.enum';
import { Tenant } from '../tenants/domain/tenant';
import { TenantsService } from '../tenants/tenants.service';
import { User } from '../users/domain/user';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { NullableType } from '../utils/types/nullable.type';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Branch } from './domain/branch';
import { BranchRepository } from './infrastructure/persistence/branch.repository';

type BranchActor = Pick<User, 'id' | 'role'>;

@Injectable()
export class BranchesService {
  constructor(
    private readonly branchesRepository: BranchRepository,
    private readonly tenantsService: TenantsService,
    private readonly accessService: AccessService,
  ) {}

  async create(
    tenantId: Tenant['id'],
    createBranchDto: CreateBranchDto,
    actor: BranchActor,
  ): Promise<Branch> {
    const tenant = await this.getTenantOrThrow(tenantId);
    await this.ensureCanManageAllBranches(Number(tenant.id), actor);
    await this.ensureCodeIsAvailable(Number(tenant.id), createBranchDto.code);
    const manager = await this.resolveTenantManager(
      Number(tenant.id),
      createBranchDto.managerId,
    );

    return this.branchesRepository.create({
      tenant: {
        id: Number(tenant.id),
        name: tenant.name,
        slug: tenant.slug,
      },
      name: createBranchDto.name,
      code: createBranchDto.code,
      city: createBranchDto.city,
      address: createBranchDto.address,
      phone: createBranchDto.phone,
      manager,
      openingHours: createBranchDto.openingHours,
      isActive: createBranchDto.isActive ?? true,
    });
  }

  async findByTenantId(tenantId: Tenant['id']): Promise<Branch[]> {
    await this.getTenantOrThrow(tenantId);

    return this.branchesRepository.findByTenantId(Number(tenantId));
  }

  async findByTenantIdAndId(
    tenantId: Tenant['id'],
    id: Branch['id'],
  ): Promise<NullableType<Branch>> {
    await this.getTenantOrThrow(tenantId);

    return this.branchesRepository.findByTenantIdAndId(Number(tenantId), id);
  }

  async update(
    tenantId: Tenant['id'],
    id: Branch['id'],
    updateBranchDto: UpdateBranchDto,
    actor: BranchActor,
  ): Promise<Branch | null> {
    await this.getTenantOrThrow(tenantId);
    const existingBranch = await this.getBranchOrThrow(tenantId, id);
    const canManageAllBranches = await this.canManageAllBranches(
      Number(tenantId),
      actor,
    );

    this.ensureCanManageBranch(existingBranch, actor, canManageAllBranches);

    if (updateBranchDto.managerId !== undefined && !canManageAllBranches) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        error: 'branchManagerCannotReassignBranchManager',
      });
    }

    if (updateBranchDto.code) {
      await this.ensureCodeIsAvailable(
        Number(tenantId),
        updateBranchDto.code,
        id,
      );
    }

    const payload: DeepPartial<Branch> = {};

    if (updateBranchDto.name !== undefined) payload.name = updateBranchDto.name;
    if (updateBranchDto.code !== undefined) payload.code = updateBranchDto.code;
    if (updateBranchDto.city !== undefined) payload.city = updateBranchDto.city;
    if (updateBranchDto.address !== undefined) {
      payload.address = updateBranchDto.address;
    }
    if (updateBranchDto.phone !== undefined)
      payload.phone = updateBranchDto.phone;
    if (updateBranchDto.managerId !== undefined) {
      payload.manager = await this.resolveTenantManager(
        Number(tenantId),
        updateBranchDto.managerId,
      );
    }
    if (updateBranchDto.openingHours !== undefined) {
      payload.openingHours = updateBranchDto.openingHours;
    }
    if (updateBranchDto.isActive !== undefined) {
      payload.isActive = updateBranchDto.isActive;
    }

    return this.branchesRepository.update(Number(tenantId), id, payload);
  }

  async remove(
    tenantId: Tenant['id'],
    id: Branch['id'],
    actor: BranchActor,
  ): Promise<void> {
    await this.getTenantOrThrow(tenantId);
    await this.ensureCanManageAllBranches(Number(tenantId), actor);
    await this.branchesRepository.remove(Number(tenantId), id);
  }

  private async getTenantOrThrow(tenantId: Tenant['id']): Promise<Tenant> {
    const tenant = await this.tenantsService.findById(tenantId);

    if (!tenant) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'tenantNotFound',
      });
    }

    return tenant;
  }

  private async ensureCodeIsAvailable(
    tenantId: number,
    code: Branch['code'],
    ignoredBranchId?: Branch['id'],
  ) {
    const existingBranch = await this.branchesRepository.findByTenantIdAndCode(
      tenantId,
      code,
    );

    if (
      existingBranch &&
      (!ignoredBranchId ||
        Number(existingBranch.id) !== Number(ignoredBranchId))
    ) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          code: 'branchCodeAlreadyExists',
        },
      });
    }
  }

  private async getBranchOrThrow(
    tenantId: Tenant['id'],
    id: Branch['id'],
  ): Promise<Branch> {
    const branch = await this.branchesRepository.findByTenantIdAndId(
      Number(tenantId),
      id,
    );

    if (!branch) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'branchNotFound',
      });
    }

    return branch;
  }

  private async ensureCanManageAllBranches(
    tenantId: number,
    actor: BranchActor,
  ): Promise<void> {
    if (await this.canManageAllBranches(tenantId, actor)) {
      return;
    }

    throw new ForbiddenException({
      status: HttpStatus.FORBIDDEN,
      error: 'branchManagementRequiresTenantAdmin',
    });
  }

  private async canManageAllBranches(
    tenantId: number,
    actor: BranchActor,
  ): Promise<boolean> {
    if (Number(actor.role?.id) === RoleEnum.superAdmin) {
      return true;
    }

    const membership = await this.getActorTenantMembership(tenantId, actor);

    return ['owner', 'tenant-admin'].includes(membership?.role?.key || '');
  }

  private ensureCanManageBranch(
    branch: Branch,
    actor: BranchActor,
    canManageAllBranches: boolean,
  ): void {
    if (
      canManageAllBranches ||
      Number(branch.manager?.id) === Number(actor.id)
    ) {
      return;
    }

    throw new ForbiddenException({
      status: HttpStatus.FORBIDDEN,
      error: 'branchManagerCanOnlyManageAssignedBranch',
    });
  }

  private async getActorTenantMembership(tenantId: number, actor: BranchActor) {
    const memberships =
      await this.accessService.findTenantMemberships(tenantId);

    return memberships.find(
      (membership) => Number(membership.user.id) === Number(actor.id),
    );
  }

  private async resolveTenantManager(
    tenantId: number,
    managerId?: number | null,
  ): Promise<Pick<User, 'id' | 'email' | 'firstName' | 'lastName'> | null> {
    if (!managerId) {
      return null;
    }

    const memberships =
      await this.accessService.findTenantMemberships(tenantId);
    const membership = memberships.find(
      (tenantMembership) => Number(tenantMembership.user.id) === managerId,
    );

    if (!membership) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          managerId: 'branchManagerMustBeActiveTenantMember',
        },
      });
    }

    return {
      id: membership.user.id,
      email: membership.user.email,
      firstName: membership.user.firstName,
      lastName: membership.user.lastName,
    };
  }
}
