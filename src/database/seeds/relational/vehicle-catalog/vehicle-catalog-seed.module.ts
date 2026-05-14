import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleBrandEntity } from '../../../../vehicles/infrastructure/persistence/relational/entities/vehicle-brand.entity';
import { VehicleCatalogSeedService } from './vehicle-catalog-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleBrandEntity])],
  providers: [VehicleCatalogSeedService],
  exports: [VehicleCatalogSeedService],
})
export class VehicleCatalogSeedModule {}
