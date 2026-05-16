import { Module } from '@nestjs/common';
import { AccessModule } from '../access/access.module';
import { BranchesModule } from '../branches/branches.module';
import { RelationalSalesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { SalesAssignmentEngineService } from './sales-assignment-engine.service';

@Module({
  imports: [RelationalSalesPersistenceModule, BranchesModule, AccessModule],
  providers: [SalesAssignmentEngineService],
  exports: [SalesAssignmentEngineService],
})
export class SalesAssignmentModule {}
