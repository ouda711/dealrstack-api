import { Module } from '@nestjs/common';
import { RelationalTenantPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';

@Module({
  imports: [RelationalTenantPersistenceModule],
  controllers: [TenantsController],
  providers: [TenantsService],
  exports: [TenantsService, RelationalTenantPersistenceModule],
})
export class TenantsModule {}
