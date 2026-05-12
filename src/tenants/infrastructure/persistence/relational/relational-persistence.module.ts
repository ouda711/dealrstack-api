import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantRepository } from '../tenant.repository';
import { TenantEntity } from './entities/tenant.entity';
import { TenantsRelationalRepository } from './repositories/tenant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TenantEntity])],
  providers: [
    {
      provide: TenantRepository,
      useClass: TenantsRelationalRepository,
    },
  ],
  exports: [TenantRepository],
})
export class RelationalTenantPersistenceModule {}
