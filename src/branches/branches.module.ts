import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionEntity } from '../access/infrastructure/persistence/relational/entities/role-permission.entity';
import { TenantMembershipEntity } from '../access/infrastructure/persistence/relational/entities/tenant-membership.entity';
import { PermissionsGuard } from '../access/permissions.guard';
import { TenantsModule } from '../tenants/tenants.module';
import { BranchesController } from './branches.controller';
import { BranchesService } from './branches.service';
import { RelationalBranchPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    RelationalBranchPersistenceModule,
    TenantsModule,
    TypeOrmModule.forFeature([RolePermissionEntity, TenantMembershipEntity]),
  ],
  controllers: [BranchesController],
  providers: [BranchesService, PermissionsGuard],
  exports: [BranchesService, RelationalBranchPersistenceModule],
})
export class BranchesModule {}
