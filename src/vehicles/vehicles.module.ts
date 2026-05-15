import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllConfigType } from '../config/config.type';
import { RolePermissionEntity } from '../access/infrastructure/persistence/relational/entities/role-permission.entity';
import { TenantMembershipEntity } from '../access/infrastructure/persistence/relational/entities/tenant-membership.entity';
import { PermissionsGuard } from '../access/permissions.guard';
import { AuditTrailModule } from '../audit-trail/audit-trail.module';
import { BranchEntity } from '../branches/infrastructure/persistence/relational/entities/branch.entity';
import { TenantsModule } from '../tenants/tenants.module';
import { UserEntity } from '../users/infrastructure/persistence/relational/entities/user.entity';
import { VehicleBodyTypeEntity } from './infrastructure/persistence/relational/entities/vehicle-body-type.entity';
import { VehicleBrandEntity } from './infrastructure/persistence/relational/entities/vehicle-brand.entity';
import { VehicleEngineEntity } from './infrastructure/persistence/relational/entities/vehicle-engine.entity';
import { VehicleGenerationEntity } from './infrastructure/persistence/relational/entities/vehicle-generation.entity';
import { VehicleModelEntity } from './infrastructure/persistence/relational/entities/vehicle-model.entity';
import { VehicleDocumentEntity } from './infrastructure/persistence/relational/entities/vehicle-document.entity';
import { VehicleMediaEntity } from './infrastructure/persistence/relational/entities/vehicle-media.entity';
import { VehicleTrimEntity } from './infrastructure/persistence/relational/entities/vehicle-trim.entity';
import { VehicleEntity } from './infrastructure/persistence/relational/entities/vehicle.entity';
import { VehicleListingViewEntity } from './infrastructure/persistence/relational/entities/vehicle-listing-view.entity';
import { VehicleMarketingMessageEntity } from './infrastructure/persistence/relational/entities/vehicle-marketing-message.entity';
import { VehicleMarketingThreadEntity } from './infrastructure/persistence/relational/entities/vehicle-marketing-thread.entity';
import { VehicleShareLinkEntity } from './infrastructure/persistence/relational/entities/vehicle-share-link.entity';
import { AiModule } from '../ai/ai.module';
import { TenantEntity } from '../tenants/infrastructure/persistence/relational/entities/tenant.entity';
import { PublicListingsController } from './public-listings.controller';
import { VehicleMarketingFlyerThreadsController } from './vehicle-marketing-flyer.controller';
import { VehicleMarketingFlyerService } from './vehicle-marketing-flyer.service';
import { VehicleMarketingController } from './vehicle-marketing.controller';
import { VehicleMarketingService } from './vehicle-marketing.service';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { createVehicleAttachmentMulterOptions } from './vehicle-attachment.multer';

@Module({
  imports: [
    AiModule,
    AuditTrailModule,
    TenantsModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfigType>) =>
        createVehicleAttachmentMulterOptions(
          configService.get('file.maxFileSize', { infer: true }) ?? 0,
        ),
    }),
    TypeOrmModule.forFeature([
      BranchEntity,
      RolePermissionEntity,
      TenantMembershipEntity,
      UserEntity,
      VehicleBodyTypeEntity,
      VehicleBrandEntity,
      VehicleEngineEntity,
      VehicleDocumentEntity,
      VehicleEntity,
      VehicleGenerationEntity,
      VehicleMediaEntity,
      VehicleModelEntity,
      VehicleTrimEntity,
      VehicleListingViewEntity,
      VehicleMarketingMessageEntity,
      VehicleMarketingThreadEntity,
      VehicleShareLinkEntity,
      TenantEntity,
    ]),
  ],
  controllers: [
    VehiclesController,
    VehicleMarketingController,
    VehicleMarketingFlyerThreadsController,
    PublicListingsController,
  ],
  providers: [
    VehiclesService,
    VehicleMarketingService,
    VehicleMarketingFlyerService,
    PermissionsGuard,
  ],
  exports: [
    VehiclesService,
    VehicleMarketingService,
    VehicleMarketingFlyerService,
  ],
})
export class VehiclesModule {}
