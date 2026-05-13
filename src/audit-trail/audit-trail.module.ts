import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsGuard } from '../access/permissions.guard';
import { RolePermissionEntity } from '../access/infrastructure/persistence/relational/entities/role-permission.entity';
import { TenantMembershipEntity } from '../access/infrastructure/persistence/relational/entities/tenant-membership.entity';
import { BranchEntity } from '../branches/infrastructure/persistence/relational/entities/branch.entity';
import { AuditTrailController } from './audit-trail.controller';
import { AuditTrailService } from './audit-trail.service';
import { AuditTrailEntity } from './infrastructure/persistence/relational/entities/audit-trail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuditTrailEntity,
      BranchEntity,
      RolePermissionEntity,
      TenantMembershipEntity,
    ]),
  ],
  controllers: [AuditTrailController],
  providers: [AuditTrailService, PermissionsGuard],
  exports: [AuditTrailService],
})
export class AuditTrailModule {}
