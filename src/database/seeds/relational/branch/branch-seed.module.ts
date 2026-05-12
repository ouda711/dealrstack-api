import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchEntity } from '../../../../branches/infrastructure/persistence/relational/entities/branch.entity';
import { TenantEntity } from '../../../../tenants/infrastructure/persistence/relational/entities/tenant.entity';
import { BranchSeedService } from './branch-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([BranchEntity, TenantEntity])],
  providers: [BranchSeedService],
  exports: [BranchSeedService],
})
export class BranchSeedModule {}
