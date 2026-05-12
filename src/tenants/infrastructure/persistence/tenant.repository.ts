import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Tenant } from '../../domain/tenant';
import { FilterTenantDto, SortTenantDto } from '../../dto/query-tenant.dto';

export abstract class TenantRepository {
  abstract create(
    data: Omit<Tenant, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Tenant>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterTenantDto | null;
    sortOptions?: SortTenantDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Tenant[]>;

  abstract findById(id: Tenant['id']): Promise<NullableType<Tenant>>;
  abstract findBySlug(slug: Tenant['slug']): Promise<NullableType<Tenant>>;

  abstract update(
    id: Tenant['id'],
    payload: DeepPartial<Tenant>,
  ): Promise<Tenant | null>;

  abstract remove(id: Tenant['id']): Promise<void>;
}
