import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccessModule } from '../access/access.module';
import { PermissionsGuard } from '../access/permissions.guard';
import { BranchesModule } from '../branches/branches.module';
import { SettingsModule } from '../settings/settings.module';
import { SalesPipelineModule } from '../sales-pipeline/sales-pipeline.module';
import { TenantsModule } from '../tenants/tenants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEntity } from '../tenants/infrastructure/persistence/relational/entities/tenant.entity';
import { RelationalSalesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import metaLeadAdsConfig from './config/meta-lead-ads.config';
import { MetaLeadAdsWebhookController } from './meta-lead-ads-webhook.controller';
import { MetaLeadAdsWebhookService } from './meta-lead-ads-webhook.service';
import { PublicWebsiteLeadController } from './public-website-lead.controller';
import { SalesController } from './sales.controller';
import { SalesLeadCaptureService } from './sales-lead-capture.service';
import { SalesAssignmentModule } from './sales-assignment.module';
import { SalesFollowUpAutomationService } from './sales-follow-up-automation.service';
import { SalesLeadEscalationService } from './sales-lead-escalation.service';
import { SalesWorkspaceService } from './sales-workspace.service';
import { WhatsAppModule } from '../whatsapp/whatsapp.module';

@Module({
  imports: [
    ConfigModule.forFeature(metaLeadAdsConfig),
    TypeOrmModule.forFeature([TenantEntity]),
    RelationalSalesPersistenceModule,
    SalesPipelineModule,
    TenantsModule,
    BranchesModule,
    AccessModule,
    SalesAssignmentModule,
    SettingsModule,
    WhatsAppModule,
  ],
  controllers: [
    SalesController,
    PublicWebsiteLeadController,
    MetaLeadAdsWebhookController,
  ],
  providers: [
    MetaLeadAdsWebhookService,
    SalesLeadCaptureService,
    SalesWorkspaceService,
    SalesFollowUpAutomationService,
    SalesLeadEscalationService,
    PermissionsGuard,
  ],
  exports: [SalesWorkspaceService, RelationalSalesPersistenceModule],
})
export class SalesModule {}
