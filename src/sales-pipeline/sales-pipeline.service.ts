import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { BranchesService } from '../branches/branches.service';
import { TenantsService } from '../tenants/tenants.service';
import { DEFAULT_SALES_PIPELINE_STAGES } from './constants/default-pipeline-stages';
import { SalesPipeline } from './domain/sales-pipeline';
import { UpdateSalesPipelineStageDto } from './dto/update-sales-pipeline-stage.dto';
import { SalesPipelineRepository } from './infrastructure/persistence/sales-pipeline.repository';

@Injectable()
export class SalesPipelineService {
  constructor(
    private readonly salesPipelineRepository: SalesPipelineRepository,
    private readonly tenantsService: TenantsService,
    private readonly branchesService: BranchesService,
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
    const activeStages = pipeline.stages.filter((stage) => !stage.deletedAt);

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

    await this.salesPipelineRepository.softDeleteStage(stageId);

    return this.getPipeline(tenantId, branchId);
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
}
