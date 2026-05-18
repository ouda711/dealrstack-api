import { Module } from '@nestjs/common';
import { AccessModule } from '../access/access.module';
import { BranchesModule } from '../branches/branches.module';
import { RelationalSalesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { SalesAssignmentEngineService } from './sales-assignment-engine.service';
import { SalesNotificationsModule } from './sales-notifications.module';

@Module({
  imports: [
    RelationalSalesPersistenceModule,
    BranchesModule,
    AccessModule,
    SalesNotificationsModule,
  ],
  providers: [SalesAssignmentEngineService],
  exports: [SalesAssignmentEngineService],
})
export class SalesAssignmentModule {}
