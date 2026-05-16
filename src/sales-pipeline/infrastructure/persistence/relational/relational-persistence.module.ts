import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesPipelineRepository } from '../sales-pipeline.repository';
import { SalesPipelineEntity } from './entities/sales-pipeline.entity';
import { SalesPipelineStageEntity } from './entities/sales-pipeline-stage.entity';
import { SalesPipelineRelationalRepository } from './repositories/sales-pipeline.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SalesPipelineEntity, SalesPipelineStageEntity]),
  ],
  providers: [
    {
      provide: SalesPipelineRepository,
      useClass: SalesPipelineRelationalRepository,
    },
  ],
  exports: [SalesPipelineRepository],
})
export class RelationalSalesPipelinePersistenceModule {}
