import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationalTenantPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';
import { RolePermissionEntity } from '../access/infrastructure/persistence/relational/entities/role-permission.entity';
import { TenantMembershipEntity } from '../access/infrastructure/persistence/relational/entities/tenant-membership.entity';
import { PermissionsGuard } from '../access/permissions.guard';

@Module({
  imports: [
    RelationalTenantPersistenceModule,
    TypeOrmModule.forFeature([RolePermissionEntity, TenantMembershipEntity]),
  ],
  controllers: [TenantsController],
  providers: [TenantsService, PermissionsGuard],
  exports: [TenantsService, RelationalTenantPersistenceModule],
})
export class TenantsModule {}
