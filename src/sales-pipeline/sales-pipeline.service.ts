import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BranchesService } from '../branches/branches.service';
import { SalesDealEntity } from '../sales/infrastructure/persistence/relational/entities/sales-deal.entity';
import { TenantsService } from '../tenants/tenants.service';
import { DEFAULT_SALES_PIPELINE_STAGES } from './constants/default-pipeline-stages';
import { SalesPipeline } from './domain/sales-pipeline';
import { CreateSalesPipelineStageDto } from './dto/create-sales-pipeline-stage.dto';
import { UpdateSalesPipelineStageDto } from './dto/update-sales-pipeline-stage.dto';
import { SalesPipelineRepository } from './infrastructure/persistence/sales-pipeline.repository';

@Injectable()
export class SalesPipelineService {
  constructor(
    private readonly salesPipelineRepository: SalesPipelineRepository,
    private readonly tenantsService: TenantsService,
    private readonly branchesService: BranchesService,
    @InjectRepository(SalesDealEntity)
    private readonly dealRepository: Repository<SalesDealEntity>,
  ) {}

  async getPipeline(
    tenantId: number,
    branchId?: number,
  ): Promise<SalesPipeline> {
    await this.ensureTenantExists(tenantId);

    if (branchId) {
      await this.ensureBranchExists(tenantId, branchId);
      const branchPipeline =
        await this.salesPipelineRepository.findByTenantIdAndBranchId(
          tenantId,
          branchId,
        );

      if (branchPipeline) {
        return branchPipeline;
      }

      const tenantPipeline = await this.ensureTenantPipeline(tenantId);

      return {
        ...tenantPipeline,
        scope: 'tenant',
        inherited: true,
      };
    }

    return this.ensureTenantPipeline(tenantId);
  }

  async createStage(
    tenantId: number,
    dto: CreateSalesPipelineStageDto,
    branchId?: number,
  ) {
    const pipeline = await this.resolveMutablePipeline(tenantId, branchId);
    const activeStages = this.getActiveStages(pipeline);

    if (!dto.label?.trim()) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          label: 'labelRequired',
        },
      });
    }

    const stageKey = this.buildUniqueStageKey(
      dto.label,
      activeStages.map((stage) => stage.stageKey),
    );
    const created = await this.salesPipelineRepository.createStage({
      pipelineId: pipeline.id,
      stageKey,
      label: dto.label.trim(),
      sortOrder: activeStages.length,
      color: dto.color ?? 'primary',
      isWonStage: false,
      isLostStage: false,
    });

    const firstTerminalIndex = activeStages.findIndex(
      (stage) => stage.isWonStage || stage.isLostStage,
    );
    const insertIndex =
      firstTerminalIndex === -1 ? activeStages.length : firstTerminalIndex;
    const orderedStageIds = [
      ...activeStages.slice(0, insertIndex).map((stage) => stage.id),
      created.id,
      ...activeStages.slice(insertIndex).map((stage) => stage.id),
    ];

    await this.salesPipelineRepository.reorderStages(
      pipeline.id,
      orderedStageIds,
    );

    return this.getPipeline(tenantId, branchId);
  }

  async updateStage(
    tenantId: number,
    stageId: number,
    dto: UpdateSalesPipelineStageDto,
    branchId?: number,
  ) {
    const pipeline = await this.resolveMutablePipeline(tenantId, branchId);
    const stage = pipeline.stages.find((item) => item.id === stageId);

    if (!stage) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'pipelineStageNotFound',
      });
    }

    if (!dto.label) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          label: 'labelRequired',
        },
      });
    }

    await this.salesPipelineRepository.updateStage(stageId, {
      label: dto.label,
    });

    return this.getPipeline(tenantId, branchId);
  }

  async deleteStage(tenantId: number, stageId: number, branchId?: number) {
    const pipeline = await this.resolveMutablePipeline(tenantId, branchId);
    const activeStages = this.getActiveStages(pipeline);

    if (activeStages.length <= 1) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'pipelineMustRetainAtLeastOneStage',
      });
    }

    const stage = activeStages.find((item) => item.id === stageId);

    if (!stage) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'pipelineStageNotFound',
      });
    }

    if (stage.isWonStage || stage.isLostStage) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'pipelineCannotDeleteTerminalStage',
      });
    }

    const fallbackStage =
      activeStages.find(
        (item) => item.id !== stageId && !item.isWonStage && !item.isLostStage,
      ) ?? activeStages.find((item) => item.id !== stageId);

    if (fallbackStage) {
      await this.dealRepository.update(
        { tenantId, stageKey: stage.stageKey },
        { stageKey: fallbackStage.stageKey },
      );
    }

    await this.salesPipelineRepository.softDeleteStage(stageId);

    return this.getPipeline(tenantId, branchId);
  }

  assertStageKeyExists(pipeline: SalesPipeline, stageKey: string) {
    const exists = this.getActiveStages(pipeline).some(
      (stage) => stage.stageKey === stageKey,
    );

    if (!exists) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'pipelineStageKeyNotFound',
      });
    }
  }

  async reorderStages(tenantId: number, stageIds: number[], branchId?: number) {
    const pipeline = await this.resolveMutablePipeline(tenantId, branchId);
    const activeStageIds = new Set(pipeline.stages.map((stage) => stage.id));

    if (stageIds.length !== activeStageIds.size) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'pipelineReorderMustIncludeAllActiveStages',
      });
    }

    for (const stageId of stageIds) {
      if (!activeStageIds.has(stageId)) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'pipelineReorderContainsUnknownStage',
        });
      }
    }

    await this.salesPipelineRepository.reorderStages(pipeline.id, stageIds);

    return this.getPipeline(tenantId, branchId);
  }

  async ensureSystemDefaultPipeline(): Promise<SalesPipeline> {
    const existing = await this.salesPipelineRepository.findSystemDefault();

    if (existing) {
      return existing;
    }

    const pipeline = await this.salesPipelineRepository.createPipeline({
      isSystemDefault: true,
    });

    await this.salesPipelineRepository.createStages(
      DEFAULT_SALES_PIPELINE_STAGES.map((stage) => ({
        pipelineId: pipeline.id,
        stageKey: stage.stageKey,
        label: stage.label,
        sortOrder: stage.sortOrder,
        color: stage.color,
        isWonStage: stage.isWonStage,
        isLostStage: stage.isLostStage,
      })),
    );

    const created = await this.salesPipelineRepository.findSystemDefault();

    if (!created) {
      throw new Error('Failed to seed system default sales pipeline');
    }

    return created;
  }

  private async ensureTenantPipeline(tenantId: number): Promise<SalesPipeline> {
    const existing =
      await this.salesPipelineRepository.findByTenantId(tenantId);

    if (existing) {
      return existing;
    }

    return this.clonePipelineForTenant(tenantId);
  }

  private async clonePipelineForTenant(
    tenantId: number,
  ): Promise<SalesPipeline> {
    const source = await this.ensureSystemDefaultPipeline();
    const pipeline = await this.salesPipelineRepository.createPipeline({
      tenantId,
    });

    await this.cloneStages(source, pipeline.id);

    const created = await this.salesPipelineRepository.findByTenantId(tenantId);

    if (!created) {
      throw new Error(`Failed to create tenant sales pipeline for ${tenantId}`);
    }

    return created;
  }

  private async clonePipelineForBranch(
    tenantId: number,
    branchId: number,
  ): Promise<SalesPipeline> {
    const source = await this.ensureTenantPipeline(tenantId);
    const pipeline = await this.salesPipelineRepository.createPipeline({
      tenantId,
      branchId,
    });

    await this.cloneStages(source, pipeline.id);

    const created =
      await this.salesPipelineRepository.findByTenantIdAndBranchId(
        tenantId,
        branchId,
      );

    if (!created) {
      throw new Error(
        `Failed to create branch sales pipeline for tenant ${tenantId}, branch ${branchId}`,
      );
    }

    return created;
  }

  private async cloneStages(source: SalesPipeline, targetPipelineId: number) {
    await this.salesPipelineRepository.createStages(
      source.stages.map((stage) => ({
        pipelineId: targetPipelineId,
        stageKey: stage.stageKey,
        label: stage.label,
        sortOrder: stage.sortOrder,
        color: stage.color,
        isWonStage: stage.isWonStage,
        isLostStage: stage.isLostStage,
      })),
    );
  }

  private async resolveMutablePipeline(
    tenantId: number,
    branchId?: number,
  ): Promise<SalesPipeline> {
    if (!branchId) {
      return this.ensureTenantPipeline(tenantId);
    }

    await this.ensureBranchExists(tenantId, branchId);

    const branchPipeline =
      await this.salesPipelineRepository.findByTenantIdAndBranchId(
        tenantId,
        branchId,
      );

    if (branchPipeline) {
      return branchPipeline;
    }

    return this.clonePipelineForBranch(tenantId, branchId);
  }

  private async ensureTenantExists(tenantId: number) {
    const tenant = await this.tenantsService.findById(tenantId);

    if (!tenant) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'tenantNotFound',
      });
    }
  }

  private async ensureBranchExists(tenantId: number, branchId: number) {
    const branch = await this.branchesService.findByTenantIdAndId(
      tenantId,
      branchId,
    );

    if (!branch) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'branchNotFound',
      });
    }
  }

  private getActiveStages(pipeline: SalesPipeline) {
    return pipeline.stages
      .filter((stage) => !stage.deletedAt)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  private buildUniqueStageKey(label: string, existingKeys: string[]) {
    const base =
      label
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .slice(0, 40) || 'stage';
    const keys = new Set(existingKeys);

    if (!keys.has(base)) {
      return base;
    }

    let suffix = 2;

    while (keys.has(`${base}_${suffix}`)) {
      suffix += 1;
    }

    return `${base}_${suffix}`;
  }
}
