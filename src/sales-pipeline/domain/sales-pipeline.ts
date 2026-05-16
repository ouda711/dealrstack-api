import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SalesPipelineStage } from './sales-pipeline-stage';

export class SalesPipeline {
  @ApiProperty({ type: Number })
  id: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'Null only for the global system default template.',
  })
  tenantId?: number | null;

  @ApiPropertyOptional({
    type: Number,
    description: 'When set, this pipeline is customized for a specific branch.',
  })
  branchId?: number | null;

  @ApiProperty({ example: false, type: Boolean })
  isSystemDefault: boolean;

  @ApiProperty({
    example: 'tenant',
    enum: ['system', 'tenant', 'branch'],
    description:
      'Where this configuration is stored. Branch responses may be inherited from tenant until customized.',
  })
  scope: 'system' | 'tenant' | 'branch';

  @ApiProperty({
    example: false,
    type: Boolean,
    description:
      'True when a branch request is still using the tenant pipeline and has not forked its own copy yet.',
  })
  inherited: boolean;

  @ApiProperty({ type: () => [SalesPipelineStage] })
  stages: SalesPipelineStage[];
}
