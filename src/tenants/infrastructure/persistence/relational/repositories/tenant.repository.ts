import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Tenant } from '../../../../domain/tenant';
import {
  FilterTenantDto,
  SortTenantDto,
} from '../../../../dto/query-tenant.dto';
import { TenantRepository } from '../../tenant.repository';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { TenantEntity } from '../entities/tenant.entity';
import { TenantMapper } from '../mappers/tenant.mapper';

@Injectable()
export class TenantsRelationalRepository implements TenantRepository {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantsRepository: Repository<TenantEntity>,
  ) {}

  async create(data: Tenant): Promise<Tenant> {
    const persistenceModel = TenantMapper.toPersistence(data);
    const newEntity = await this.tenantsRepository.save(
      this.tenantsRepository.create(persistenceModel),
    );
    return TenantMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterTenantDto | null;
    sortOptions?: SortTenantDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Tenant[]> {
    const where: FindOptionsWhere<TenantEntity> = {};

    if (filterOptions?.country) {
      where.country = filterOptions.country;
    }

    if (typeof filterOptions?.isActive === 'boolean') {
      where.isActive = filterOptions.isActive;
    }

    const entities = await this.tenantsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities.map((tenant) => TenantMapper.toDomain(tenant));
  }

  async findById(id: Tenant['id']): Promise<NullableType<Tenant>> {
    const entity = await this.tenantsRepository.findOne({
      where: { id: Number(id) },
    });

    return entity ? TenantMapper.toDomain(entity) : null;
  }

  async findBySlug(slug: Tenant['slug']): Promise<NullableType<Tenant>> {
    const entity = await this.tenantsRepository.findOne({
      where: { slug },
    });

    return entity ? TenantMapper.toDomain(entity) : null;
  }

  async update(
    id: Tenant['id'],
    payload: Partial<Tenant>,
  ): Promise<Tenant | null> {
    const entity = await this.tenantsRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      return null;
    }

    const updatedEntity = await this.tenantsRepository.save(
      this.tenantsRepository.create(
        TenantMapper.toPersistence({
          ...TenantMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return TenantMapper.toDomain(updatedEntity);
  }

  async remove(id: Tenant['id']): Promise<void> {
    await this.tenantsRepository.softDelete(id);
  }
}
