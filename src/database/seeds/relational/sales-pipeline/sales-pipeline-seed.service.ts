import { Injectable } from '@nestjs/common';
import { SalesPipelineService } from '../../../../sales-pipeline/sales-pipeline.service';

@Injectable()
export class SalesPipelineSeedService {
  constructor(private readonly salesPipelineService: SalesPipelineService) {}

  async run() {
    await this.salesPipelineService.ensureSystemDefaultPipeline();
  }
}
