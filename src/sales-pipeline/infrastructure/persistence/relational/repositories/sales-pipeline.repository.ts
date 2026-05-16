import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { SalesPipeline } from '../../../../domain/sales-pipeline';
import { SalesPipelineStage } from '../../../../domain/sales-pipeline-stage';
import {
  CreateSalesPipelineInput,
  CreateSalesPipelineStageInput,
  SalesPipelineRepository,
} from '../../sales-pipeline.repository';
import { SalesPipelineEntity } from '../entities/sales-pipeline.entity';
import { SalesPipelineStageEntity } from '../entities/sales-pipeline-stage.entity';
import { SalesPipelineMapper } from '../mappers/sales-pipeline.mapper';

@Injectable()
export class SalesPipelineRelationalRepository implements SalesPipelineRepository {
  constructor(
    @InjectRepository(SalesPipelineEntity)
    private readonly pipelineRepository: Repository<SalesPipelineEntity>,
    @InjectRepository(SalesPipelineStageEntity)
    private readonly stageRepository: Repository<SalesPipelineStageEntity>,
  ) {}

  async findSystemDefault(): Promise<NullableType<SalesPipeline>> {
    const entity = await this.pipelineRepository.findOne({
      where: {
        isSystemDefault: true,
      },
      relations: {
        stages: true,
      },
    });

    return entity
      ? SalesPipelineMapper.toDomain(entity, {
          scope: 'system',
          inherited: false,
        })
      : null;
  }

  async findByTenantId(tenantId: number): Promise<NullableType<SalesPipeline>> {
    const entity = await this.pipelineRepository.findOne({
      where: {
        tenantId,
        branchId: IsNull(),
      },
      relations: {
        stages: true,
      },
    });

    return entity
      ? SalesPipelineMapper.toDomain(entity, {
          scope: 'tenant',
          inherited: false,
        })
      : null;
  }

  async findByTenantIdAndBranchId(
    tenantId: number,
    branchId: number,
  ): Promise<NullableType<SalesPipeline>> {
    const entity = await this.pipelineRepository.findOne({
      where: {
        tenantId,
        branchId,
      },
      relations: {
        stages: true,
      },
    });

    return entity
      ? SalesPipelineMapper.toDomain(entity, {
          scope: 'branch',
          inherited: false,
        })
      : null;
  }

  async createPipeline(
    input: CreateSalesPipelineInput,
  ): Promise<SalesPipeline> {
    const entity = await this.pipelineRepository.save(
      this.pipelineRepository.create({
        tenantId: input.tenantId ?? null,
        branchId: input.branchId ?? null,
        isSystemDefault: input.isSystemDefault ?? false,
      }),
    );

    const scope = input.branchId
      ? 'branch'
      : input.isSystemDefault
        ? 'system'
        : 'tenant';

    return {
      id: entity.id,
      tenantId: entity.tenantId ?? null,
      branchId: entity.branchId ?? null,
      isSystemDefault: entity.isSystemDefault,
      scope,
      inherited: false,
      stages: [],
    };
  }

  async createStages(stages: CreateSalesPipelineStageInput[]): Promise<void> {
    if (!stages.length) {
      return;
    }

    await this.stageRepository.save(
      stages.map((stage) => this.stageRepository.create(stage)),
    );
  }

  async createStage(
    input: CreateSalesPipelineStageInput,
  ): Promise<SalesPipelineStage> {
    const entity = await this.stageRepository.save(
      this.stageRepository.create(input),
    );

    return SalesPipelineMapper.stageToDomain(entity);
  }

  async findStageById(
    tenantId: number,
    stageId: number,
    branchId?: number | null,
  ): Promise<NullableType<SalesPipelineStage & { pipelineId: number }>> {
    const entity = await this.stageRepository.findOne({
      where: {
        id: stageId,
        pipeline: {
          tenantId,
          branchId: branchId ? branchId : IsNull(),
        },
      },
      relations: {
        pipeline: true,
      },
    });

    if (!entity) {
      return null;
    }

    return {
      ...SalesPipelineMapper.stageToDomain(entity),
      pipelineId: entity.pipelineId,
    };
  }

  async updateStage(
    stageId: number,
    payload: Partial<
      Pick<
        SalesPipelineStage,
        'label' | 'sortOrder' | 'color' | 'isWonStage' | 'isLostStage'
      >
    >,
  ): Promise<NullableType<SalesPipelineStage>> {
    const entity = await this.stageRepository.findOne({
      where: {
        id: stageId,
      },
    });

    if (!entity) {
      return null;
    }

    const updated = await this.stageRepository.save({
      ...entity,
      ...payload,
    });

    return SalesPipelineMapper.stageToDomain(updated);
  }

  async softDeleteStage(stageId: number): Promise<void> {
    await this.stageRepository.softDelete(stageId);
  }

  async reorderStages(
    pipelineId: number,
    orderedStageIds: number[],
  ): Promise<void> {
    const stages = await this.stageRepository.find({
      where: {
        pipelineId,
        id: In(orderedStageIds),
      },
    });

    const stageById = new Map(stages.map((stage) => [stage.id, stage]));

    await this.stageRepository.save(
      orderedStageIds.map((stageId, index) => {
        const stage = stageById.get(stageId);

        if (!stage) {
          throw new Error(
            `Stage ${stageId} not found on pipeline ${pipelineId}`,
          );
        }

        return {
          ...stage,
          sortOrder: index,
        };
      }),
    );
  }

  async findPipelineWithStages(
    pipelineId: number,
  ): Promise<NullableType<SalesPipeline>> {
    const entity = await this.pipelineRepository.findOne({
      where: {
        id: pipelineId,
      },
      relations: {
        stages: true,
      },
    });

    if (!entity) {
      return null;
    }

    return SalesPipelineMapper.toDomain(entity, {
      scope: entity.branchId
        ? 'branch'
        : entity.isSystemDefault
          ? 'system'
          : 'tenant',
      inherited: false,
    });
  }
}
