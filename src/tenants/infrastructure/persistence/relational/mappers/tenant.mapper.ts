import { Tenant } from '../../../../domain/tenant';
import { TenantEntity } from '../entities/tenant.entity';

export class TenantMapper {
  static toDomain(raw: TenantEntity): Tenant {
    const domainEntity = new Tenant();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.slug = raw.slug;
    domainEntity.country = raw.country;
    domainEntity.timezone = raw.timezone;
    domainEntity.currency = raw.currency;
    domainEntity.phone = raw.phone;
    domainEntity.email = raw.email;
    domainEntity.website = raw.website;
    domainEntity.isActive = raw.isActive;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: Tenant): TenantEntity {
    const persistenceEntity = new TenantEntity();
    if (domainEntity.id && typeof domainEntity.id === 'number') {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.slug = domainEntity.slug;
    persistenceEntity.country = domainEntity.country;
    persistenceEntity.timezone = domainEntity.timezone;
    persistenceEntity.currency = domainEntity.currency;
    persistenceEntity.phone = domainEntity.phone;
    persistenceEntity.email = domainEntity.email;
    persistenceEntity.website = domainEntity.website;
    persistenceEntity.isActive = domainEntity.isActive;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;
    return persistenceEntity;
  }
}
