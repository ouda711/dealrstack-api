import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchEntity } from '../../../../branches/infrastructure/persistence/relational/entities/branch.entity';
import { RelationalSalesPersistenceModule } from '../../../../sales/infrastructure/persistence/relational/relational-persistence.module';
import { TenantEntity } from '../../../../tenants/infrastructure/persistence/relational/entities/tenant.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { SalesDemoSeedService } from './sales-demo-seed.service';

@Module({
  imports: [
    RelationalSalesPersistenceModule,
    TypeOrmModule.forFeature([TenantEntity, BranchEntity, UserEntity]),
  ],
  providers: [SalesDemoSeedService],
  exports: [SalesDemoSeedService],
})
export class SalesDemoSeedModule {}
