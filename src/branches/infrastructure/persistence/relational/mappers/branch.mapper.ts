import { TenantEntity } from '../../../../../tenants/infrastructure/persistence/relational/entities/tenant.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
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
    domainEntity.manager = raw.manager
      ? {
          id: raw.manager.id,
          email: raw.manager.email,
          firstName: raw.manager.firstName,
          lastName: raw.manager.lastName,
        }
      : null;
    domainEntity.openingHours = raw.openingHours;
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
    if (domainEntity.manager) {
      const manager = new UserEntity();
      manager.id = Number(domainEntity.manager.id);
      persistenceEntity.manager = manager;
    } else if (domainEntity.manager === null) {
      persistenceEntity.manager = null;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.code = domainEntity.code;
    persistenceEntity.city = domainEntity.city;
    persistenceEntity.address = domainEntity.address;
    persistenceEntity.phone = domainEntity.phone;
    persistenceEntity.openingHours = domainEntity.openingHours;
    persistenceEntity.isActive = domainEntity.isActive;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;

    return persistenceEntity;
  }
}
