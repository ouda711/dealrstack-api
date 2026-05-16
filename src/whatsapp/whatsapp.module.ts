import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessModule } from '../access/access.module';
import { BranchesModule } from '../branches/branches.module';
import { RelationalSalesPersistenceModule } from '../sales/infrastructure/persistence/relational/relational-persistence.module';
import { TenantsModule } from '../tenants/tenants.module';
import { TenantWhatsAppIntegrationEntity } from './infrastructure/persistence/relational/entities/tenant-whatsapp-integration.entity';
import { WhatsAppCloudClient } from './whatsapp-cloud.client';
import { WhatsAppInboundService } from './whatsapp-inbound.service';
import { WhatsAppIntegrationController } from './whatsapp-integration.controller';
import { WhatsAppIntegrationService } from './whatsapp-integration.service';
import { WhatsAppOutboundService } from './whatsapp-outbound.service';
import { WhatsAppWebhookController } from './whatsapp-webhook.controller';
import { WhatsAppEmbeddedSignupService } from './whatsapp-embedded-signup.service';
import { WhatsAppWebhookService } from './whatsapp-webhook.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TenantWhatsAppIntegrationEntity]),
    RelationalSalesPersistenceModule,
    TenantsModule,
    BranchesModule,
    AccessModule,
  ],
  controllers: [WhatsAppWebhookController, WhatsAppIntegrationController],
  providers: [
    WhatsAppCloudClient,
    WhatsAppIntegrationService,
    WhatsAppInboundService,
    WhatsAppOutboundService,
    WhatsAppWebhookService,
    WhatsAppEmbeddedSignupService,
  ],
  exports: [
    WhatsAppIntegrationService,
    WhatsAppOutboundService,
    WhatsAppInboundService,
  ],
})
export class WhatsAppModule {}
