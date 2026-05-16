import { Module } from '@nestjs/common';
import { SalesPipelineModule } from '../../../../sales-pipeline/sales-pipeline.module';
import { SalesPipelineSeedService } from './sales-pipeline-seed.service';

@Module({
  imports: [SalesPipelineModule],
  providers: [SalesPipelineSeedService],
  exports: [SalesPipelineSeedService],
})
export class SalesPipelineSeedModule {}
