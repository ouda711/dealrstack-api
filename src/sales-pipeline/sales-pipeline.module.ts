import { Module } from '@nestjs/common';
import { AccessModule } from '../access/access.module';
import { PermissionsGuard } from '../access/permissions.guard';
import { BranchesModule } from '../branches/branches.module';
import { TenantsModule } from '../tenants/tenants.module';
import { RelationalSalesPipelinePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { SalesPipelineController } from './sales-pipeline.controller';
import { SalesPipelineService } from './sales-pipeline.service';

@Module({
  imports: [
    RelationalSalesPipelinePersistenceModule,
    TenantsModule,
    BranchesModule,
    AccessModule,
  ],
  controllers: [SalesPipelineController],
  providers: [SalesPipelineService, PermissionsGuard],
  exports: [SalesPipelineService, RelationalSalesPipelinePersistenceModule],
})
export class SalesPipelineModule {}
