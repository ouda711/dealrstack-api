import { TenantEntity } from '../../../../../tenants/infrastructure/persistence/relational/entities/tenant.entity';
import { Branch } from '../../../../domain/branch';
import { BranchEntity } from '../entities/branch.entity';

export class BranchMapper {
  static toDomain(raw: BranchEntity): Branch {
    const domainEntity = new Branch();
    domainEntity.id = raw.id;
    domainEntity.tenant = {
      id: raw.tenant.id,
      name: raw.tenant.name,
      slug: raw.tenant.slug,
    };
    domainEntity.name = raw.name;
    domainEntity.code = raw.code;
    domainEntity.city = raw.city;
    domainEntity.address = raw.address;
    domainEntity.phone = raw.phone;
    domainEntity.isActive = raw.isActive;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: Branch): BranchEntity {
    const persistenceEntity = new BranchEntity();

    if (domainEntity.id && typeof domainEntity.id === 'number') {
      persistenceEntity.id = domainEntity.id;
    }

    const tenant = new TenantEntity();
    tenant.id = Number(domainEntity.tenant.id);
    persistenceEntity.tenant = tenant;
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.code = domainEntity.code;
    persistenceEntity.city = domainEntity.city;
    persistenceEntity.address = domainEntity.address;
    persistenceEntity.phone = domainEntity.phone;
    persistenceEntity.isActive = domainEntity.isActive;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;

    return persistenceEntity;
  }
}
