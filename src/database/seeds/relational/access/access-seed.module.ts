import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from '../../../../access/infrastructure/persistence/relational/entities/permission.entity';
import { RolePermissionEntity } from '../../../../access/infrastructure/persistence/relational/entities/role-permission.entity';
import { TenantMembershipEntity } from '../../../../access/infrastructure/persistence/relational/entities/tenant-membership.entity';
import { RoleEntity } from '../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { TenantEntity } from '../../../../tenants/infrastructure/persistence/relational/entities/tenant.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { AccessSeedService } from 'src/database/seeds/relational/access/access-seed.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PermissionEntity,
      RoleEntity,
      RolePermissionEntity,
      TenantMembershipEntity,
      TenantEntity,
      UserEntity,
    ]),
  ],
  providers: [AccessSeedService],
  exports: [AccessSeedService],
})
export class AccessSeedModule {}
