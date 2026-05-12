import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { NullableType } from '../utils/types/nullable.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { FilterTenantDto, SortTenantDto } from './dto/query-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './domain/tenant';
import { TenantRepository } from './infrastructure/persistence/tenant.repository';

@Injectable()
export class TenantsService {
  constructor(private readonly tenantsRepository: TenantRepository) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    const existingTenant = await this.tenantsRepository.findBySlug(
      createTenantDto.slug,
    );

    if (existingTenant) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          slug: 'slugAlreadyExists',
        },
      });
    }

    return this.tenantsRepository.create({
      name: createTenantDto.name,
      slug: createTenantDto.slug,
      country: createTenantDto.country,
      timezone: createTenantDto.timezone,
      currency: createTenantDto.currency,
      phone: createTenantDto.phone,
      email: createTenantDto.email,
      website: createTenantDto.website,
      isActive: createTenantDto.isActive ?? true,
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterTenantDto | null;
    sortOptions?: SortTenantDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Tenant[]> {
    return this.tenantsRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: Tenant['id']): Promise<NullableType<Tenant>> {
    return this.tenantsRepository.findById(id);
  }

  findBySlug(slug: Tenant['slug']): Promise<NullableType<Tenant>> {
    return this.tenantsRepository.findBySlug(slug);
  }

  async update(
    id: Tenant['id'],
    updateTenantDto: UpdateTenantDto,
  ): Promise<Tenant | null> {
    if (updateTenantDto.slug) {
      const existingTenant = await this.tenantsRepository.findBySlug(
        updateTenantDto.slug,
      );

      if (existingTenant && Number(existingTenant.id) !== Number(id)) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            slug: 'slugAlreadyExists',
          },
        });
      }
    }

    const payload: DeepPartial<Tenant> = {};

    if (updateTenantDto.name !== undefined) payload.name = updateTenantDto.name;
    if (updateTenantDto.slug !== undefined) payload.slug = updateTenantDto.slug;
    if (updateTenantDto.country !== undefined) {
      payload.country = updateTenantDto.country;
    }
    if (updateTenantDto.timezone !== undefined) {
      payload.timezone = updateTenantDto.timezone;
    }
    if (updateTenantDto.currency !== undefined) {
      payload.currency = updateTenantDto.currency;
    }
    if (updateTenantDto.phone !== undefined) {
      payload.phone = updateTenantDto.phone;
    }
    if (updateTenantDto.email !== undefined) {
      payload.email = updateTenantDto.email;
    }
    if (updateTenantDto.website !== undefined) {
      payload.website = updateTenantDto.website;
    }
    if (updateTenantDto.isActive !== undefined) {
      payload.isActive = updateTenantDto.isActive;
    }

    return this.tenantsRepository.update(id, payload);
  }

  async remove(id: Tenant['id']): Promise<void> {
    await this.tenantsRepository.remove(id);
  }
}
