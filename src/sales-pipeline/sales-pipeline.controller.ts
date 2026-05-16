import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequirePermissions } from '../access/permissions.decorator';
import { PermissionsGuard } from '../access/permissions.guard';
import { SalesPipeline } from './domain/sales-pipeline';
import { ReorderSalesPipelineStagesDto } from './dto/reorder-sales-pipeline-stages.dto';
import { UpdateSalesPipelineStageDto } from './dto/update-sales-pipeline-stage.dto';
import { SalesPipelineService } from './sales-pipeline.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@ApiTags('Sales pipeline')
@Controller({
  path: 'tenants/:tenantId/sales-pipeline',
  version: '1',
})
export class SalesPipelineController {
  constructor(private readonly salesPipelineService: SalesPipelineService) {}

  @ApiOkResponse({ type: SalesPipeline })
  @ApiOperation({
    summary: 'Get the effective sales pipeline for a tenant or branch',
    description:
      'Returns the branch pipeline when customized, otherwise the tenant pipeline cloned from the system default template.',
  })
  @Get()
  @RequirePermissions('pipeline.manage', 'reports.view')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number, required: true })
  @ApiQuery({
    name: 'branchId',
    type: Number,
    required: false,
    description:
      'Optional branch ID. When omitted, returns the tenant-wide pipeline configuration.',
  })
  getPipeline(
    @Param('tenantId') tenantId: number,
    @Query('branchId') branchId?: string,
  ): Promise<SalesPipeline> {
    return this.salesPipelineService.getPipeline(
      Number(tenantId),
      branchId ? Number(branchId) : undefined,
    );
  }

  @ApiOkResponse({ type: SalesPipeline })
  @ApiOperation({ summary: 'Rename a pipeline stage' })
  @Patch('stages/:stageId')
  @RequirePermissions('pipeline.manage', 'settings.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number, required: true })
  @ApiParam({ name: 'stageId', type: Number, required: true })
  @ApiQuery({ name: 'branchId', type: Number, required: false })
  updateStage(
    @Param('tenantId') tenantId: number,
    @Param('stageId') stageId: number,
    @Body() dto: UpdateSalesPipelineStageDto,
    @Query('branchId') branchId?: string,
  ): Promise<SalesPipeline> {
    return this.salesPipelineService.updateStage(
      Number(tenantId),
      Number(stageId),
      dto,
      branchId ? Number(branchId) : undefined,
    );
  }

  @ApiOkResponse({ type: SalesPipeline })
  @ApiOperation({
    summary: 'Remove a pipeline stage from the active board',
    description:
      'Soft-deletes a stage from the tenant or branch pipeline. Won/lost stages cannot be removed.',
  })
  @Delete('stages/:stageId')
  @RequirePermissions('pipeline.manage', 'settings.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number, required: true })
  @ApiParam({ name: 'stageId', type: Number, required: true })
  @ApiQuery({ name: 'branchId', type: Number, required: false })
  deleteStage(
    @Param('tenantId') tenantId: number,
    @Param('stageId') stageId: number,
    @Query('branchId') branchId?: string,
  ): Promise<SalesPipeline> {
    return this.salesPipelineService.deleteStage(
      Number(tenantId),
      Number(stageId),
      branchId ? Number(branchId) : undefined,
    );
  }

  @ApiOkResponse({ type: SalesPipeline })
  @ApiOperation({ summary: 'Reorder pipeline stages' })
  @Put('stages/reorder')
  @RequirePermissions('pipeline.manage', 'settings.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number, required: true })
  @ApiQuery({ name: 'branchId', type: Number, required: false })
  reorderStages(
    @Param('tenantId') tenantId: number,
    @Body() dto: ReorderSalesPipelineStagesDto,
    @Query('branchId') branchId?: string,
  ): Promise<SalesPipeline> {
    return this.salesPipelineService.reorderStages(
      Number(tenantId),
      dto.stageIds,
      branchId ? Number(branchId) : undefined,
    );
  }
}
