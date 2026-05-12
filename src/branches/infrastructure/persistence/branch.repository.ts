import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { Branch } from '../../domain/branch';

export abstract class BranchRepository {
  abstract create(
    data: Omit<Branch, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Branch>;

  abstract findByTenantId(tenantId: number): Promise<Branch[]>;

  abstract findByTenantIdAndId(
    tenantId: number,
    id: Branch['id'],
  ): Promise<NullableType<Branch>>;

  abstract findByTenantIdAndCode(
    tenantId: number,
    code: Branch['code'],
  ): Promise<NullableType<Branch>>;

  abstract update(
    tenantId: number,
    id: Branch['id'],
    payload: DeepPartial<Branch>,
  ): Promise<Branch | null>;

  abstract remove(tenantId: number, id: Branch['id']): Promise<void>;
}
