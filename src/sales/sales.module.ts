import { Module } from '@nestjs/common';
import { AccessModule } from '../access/access.module';
import { PermissionsGuard } from '../access/permissions.guard';
import { BranchesModule } from '../branches/branches.module';
import { SalesPipelineModule } from '../sales-pipeline/sales-pipeline.module';
import { TenantsModule } from '../tenants/tenants.module';
import { RelationalSalesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { SalesController } from './sales.controller';
import { SalesAssignmentModule } from './sales-assignment.module';
import { SalesFollowUpAutomationService } from './sales-follow-up-automation.service';
import { SalesLeadEscalationService } from './sales-lead-escalation.service';
import { SalesWorkspaceService } from './sales-workspace.service';
import { WhatsAppModule } from '../whatsapp/whatsapp.module';

@Module({
  imports: [
    RelationalSalesPersistenceModule,
    SalesPipelineModule,
    TenantsModule,
    BranchesModule,
    AccessModule,
    SalesAssignmentModule,
    WhatsAppModule,
  ],
  controllers: [SalesController],
  providers: [
    SalesWorkspaceService,
    SalesFollowUpAutomationService,
    SalesLeadEscalationService,
    PermissionsGuard,
  ],
  exports: [SalesWorkspaceService, RelationalSalesPersistenceModule],
})
export class SalesModule {}
