import { SalesPipeline } from '../../../../domain/sales-pipeline';
import { SalesPipelineStage } from '../../../../domain/sales-pipeline-stage';
import { SalesPipelineEntity } from '../entities/sales-pipeline.entity';
import { SalesPipelineStageEntity } from '../entities/sales-pipeline-stage.entity';

export class SalesPipelineMapper {
  static stageToDomain(entity: SalesPipelineStageEntity): SalesPipelineStage {
    return {
      id: entity.id,
      stageKey: entity.stageKey,
      label: entity.label,
      sortOrder: entity.sortOrder,
      color: entity.color,
      isWonStage: entity.isWonStage,
      isLostStage: entity.isLostStage,
      deletedAt: entity.deletedAt,
    };
  }

  static toDomain(
    entity: SalesPipelineEntity,
    options: {
      scope: SalesPipeline['scope'];
      inherited: boolean;
    },
  ): SalesPipeline {
    const activeStages = (entity.stages ?? [])
      .filter((stage) => !stage.deletedAt)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    return {
      id: entity.id,
      tenantId: entity.tenantId ?? null,
      branchId: entity.branchId ?? null,
      isSystemDefault: entity.isSystemDefault,
      scope: options.scope,
      inherited: options.inherited,
      stages: activeStages.map((stage) => this.stageToDomain(stage)),
    };
  }
}
