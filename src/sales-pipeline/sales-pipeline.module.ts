import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessModule } from '../access/access.module';
import { PermissionsGuard } from '../access/permissions.guard';
import { BranchesModule } from '../branches/branches.module';
import { SalesDealEntity } from '../sales/infrastructure/persistence/relational/entities/sales-deal.entity';
import { TenantsModule } from '../tenants/tenants.module';
import { RelationalSalesPipelinePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { SalesPipelineController } from './sales-pipeline.controller';
import { SalesPipelineService } from './sales-pipeline.service';

@Module({
  imports: [
    RelationalSalesPipelinePersistenceModule,
    TypeOrmModule.forFeature([SalesDealEntity]),
    TenantsModule,
    BranchesModule,
    AccessModule,
  ],
  controllers: [SalesPipelineController],
  providers: [SalesPipelineService, PermissionsGuard],
  exports: [SalesPipelineService, RelationalSalesPipelinePersistenceModule],
})
export class SalesPipelineModule {}
