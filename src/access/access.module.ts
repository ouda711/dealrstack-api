import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchEntity } from '../branches/infrastructure/persistence/relational/entities/branch.entity';
import { RoleEntity } from '../roles/infrastructure/persistence/relational/entities/role.entity';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';
import { PermissionEntity } from './infrastructure/persistence/relational/entities/permission.entity';
import { RolePermissionEntity } from './infrastructure/persistence/relational/entities/role-permission.entity';
import { TenantMembershipEntity } from './infrastructure/persistence/relational/entities/tenant-membership.entity';
import { PermissionsGuard } from './permissions.guard';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      PermissionEntity,
      BranchEntity,
      RoleEntity,
      RolePermissionEntity,
      TenantMembershipEntity,
    ]),
  ],
  controllers: [AccessController],
  providers: [AccessService, PermissionsGuard],
  exports: [AccessService, PermissionsGuard],
})
export class AccessModule {}
