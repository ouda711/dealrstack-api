import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmConfigService } from '../../typeorm-config.service';
import { RoleSeedModule } from './role/role-seed.module';
import { StatusSeedModule } from './status/status-seed.module';
import { UserSeedModule } from './user/user-seed.module';
import databaseConfig from '../../config/database.config';
import appConfig from '../../../config/app.config';
import { TenantSeedModule } from './tenant/tenant-seed.module';
import { AccessSeedModule } from './access/access-seed.module';
import { BranchSeedModule } from './branch/branch-seed.module';
import { VehicleCatalogSeedModule } from './vehicle-catalog/vehicle-catalog-seed.module';
import { SalesPipelineSeedModule } from './sales-pipeline/sales-pipeline-seed.module';
import { SalesDemoSeedModule } from './sales/sales-demo-seed.module';

@Module({
  imports: [
    RoleSeedModule,
    StatusSeedModule,
    UserSeedModule,
    TenantSeedModule,
    AccessSeedModule,
    BranchSeedModule,
    SalesPipelineSeedModule,
    SalesDemoSeedModule,
    VehicleCatalogSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
  ],
})
export class SeedModule {}
