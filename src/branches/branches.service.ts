import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Tenant } from '../tenants/domain/tenant';
import { TenantsService } from '../tenants/tenants.service';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { NullableType } from '../utils/types/nullable.type';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Branch } from './domain/branch';
import { BranchRepository } from './infrastructure/persistence/branch.repository';

@Injectable()
export class BranchesService {
  constructor(
    private readonly branchesRepository: BranchRepository,
    private readonly tenantsService: TenantsService,
  ) {}

  async create(
    tenantId: Tenant['id'],
    createBranchDto: CreateBranchDto,
  ): Promise<Branch> {
    const tenant = await this.getTenantOrThrow(tenantId);
    await this.ensureCodeIsAvailable(Number(tenant.id), createBranchDto.code);

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
      managerName: createBranchDto.managerName,
      managerPhone: createBranchDto.managerPhone,
      managerEmail: createBranchDto.managerEmail,
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
  ): Promise<Branch | null> {
    await this.getTenantOrThrow(tenantId);

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
    if (updateBranchDto.managerName !== undefined) {
      payload.managerName = updateBranchDto.managerName;
    }
    if (updateBranchDto.managerPhone !== undefined) {
      payload.managerPhone = updateBranchDto.managerPhone;
    }
    if (updateBranchDto.managerEmail !== undefined) {
      payload.managerEmail = updateBranchDto.managerEmail;
    }
    if (updateBranchDto.openingHours !== undefined) {
      payload.openingHours = updateBranchDto.openingHours;
    }
    if (updateBranchDto.isActive !== undefined) {
      payload.isActive = updateBranchDto.isActive;
    }

    return this.branchesRepository.update(Number(tenantId), id, payload);
  }

  async remove(tenantId: Tenant['id'], id: Branch['id']): Promise<void> {
    await this.getTenantOrThrow(tenantId);
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
}
