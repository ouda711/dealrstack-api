import { NullableType } from '../../../utils/types/nullable.type';
import { SalesPipeline } from '../../domain/sales-pipeline';
import { SalesPipelineStage } from '../../domain/sales-pipeline-stage';

export type CreateSalesPipelineInput = {
  tenantId?: number | null;
  branchId?: number | null;
  isSystemDefault?: boolean;
};

export type CreateSalesPipelineStageInput = {
  pipelineId: number;
  stageKey: string;
  label: string;
  sortOrder: number;
  color: string;
  isWonStage: boolean;
  isLostStage: boolean;
};

export abstract class SalesPipelineRepository {
  abstract findSystemDefault(): Promise<NullableType<SalesPipeline>>;

  abstract findByTenantId(
    tenantId: number,
  ): Promise<NullableType<SalesPipeline>>;

  abstract findByTenantIdAndBranchId(
    tenantId: number,
    branchId: number,
  ): Promise<NullableType<SalesPipeline>>;

  abstract createPipeline(
    input: CreateSalesPipelineInput,
  ): Promise<SalesPipeline>;

  abstract createStages(stages: CreateSalesPipelineStageInput[]): Promise<void>;

  abstract findStageById(
    tenantId: number,
    stageId: number,
    branchId?: number | null,
  ): Promise<NullableType<SalesPipelineStage & { pipelineId: number }>>;

  abstract updateStage(
    stageId: number,
    payload: Partial<
      Pick<
        SalesPipelineStage,
        'label' | 'sortOrder' | 'color' | 'isWonStage' | 'isLostStage'
      >
    >,
  ): Promise<NullableType<SalesPipelineStage>>;

  abstract softDeleteStage(stageId: number): Promise<void>;

  abstract reorderStages(
    pipelineId: number,
    orderedStageIds: number[],
  ): Promise<void>;

  abstract findPipelineWithStages(
    pipelineId: number,
  ): Promise<NullableType<SalesPipeline>>;
}
