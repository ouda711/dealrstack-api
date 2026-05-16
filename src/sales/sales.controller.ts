import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequirePermissions } from '../access/permissions.decorator';
import { PermissionsGuard } from '../access/permissions.guard';
import { AssignSalesLeadDto } from './dto/assign-sales-lead.dto';
import { CreateSalesDealActivityDto } from './dto/create-sales-deal-activity.dto';
import { CreateSalesPipelineDealDto } from './dto/create-sales-pipeline-deal.dto';
import { MoveSalesDealStageDto } from './dto/move-sales-deal-stage.dto';
import { ReorderSalesDealsDto } from './dto/reorder-sales-deals.dto';
import { SendSalesConversationMessageDto } from './dto/send-sales-conversation-message.dto';
import { UpdateSalesPipelineDealDto } from './dto/update-sales-pipeline-deal.dto';
import { SalesWorkspaceSnapshotDto } from './domain/sales-workspace';
import { SalesWorkspaceService } from './sales-workspace.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@ApiTags('Sales workspace')
@Controller({
  path: 'tenants/:tenantId/sales-workspace',
  version: '1',
})
export class SalesController {
  constructor(private readonly salesWorkspaceService: SalesWorkspaceService) {}

  @ApiOkResponse({ type: SalesWorkspaceSnapshotDto })
  @ApiOperation({
    summary: 'Load sales workspace data for a tenant',
    description:
      'Returns leads, deals, conversations, messages, activities, notifications, staff, and automation rules for the tenant workspace.',
  })
  @Get()
  @RequirePermissions('leads.manage', 'pipeline.manage', 'reports.view')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number, required: true })
  getWorkspace(@Param('tenantId') tenantId: number) {
    return this.salesWorkspaceService.getWorkspace(Number(tenantId));
  }

  @ApiOkResponse({ type: SalesWorkspaceSnapshotDto })
  @ApiOperation({
    summary: 'Create a lead and deal card on the pipeline board',
  })
  @Post('deals')
  @RequirePermissions('pipeline.manage', 'leads.manage')
  @HttpCode(HttpStatus.OK)
  createPipelineDeal(
    @Param('tenantId') tenantId: number,
    @Body() dto: CreateSalesPipelineDealDto,
    @Request() request: { user?: { id: number } },
  ) {
    return this.salesWorkspaceService.createPipelineDeal(
      Number(tenantId),
      dto,
      request.user?.id,
    );
  }

  @ApiOkResponse({ type: SalesWorkspaceSnapshotDto })
  @ApiOperation({ summary: 'Update a pipeline deal card and linked lead' })
  @Patch('deals/:dealId')
  @RequirePermissions('pipeline.manage', 'leads.manage')
  @HttpCode(HttpStatus.OK)
  updatePipelineDeal(
    @Param('tenantId') tenantId: number,
    @Param('dealId') dealId: number,
    @Body() dto: UpdateSalesPipelineDealDto,
  ) {
    return this.salesWorkspaceService.updatePipelineDeal(
      Number(tenantId),
      Number(dealId),
      dto,
    );
  }

  @ApiOkResponse({ type: SalesWorkspaceSnapshotDto })
  @ApiOperation({ summary: 'Add a note or activity entry on a pipeline deal' })
  @Post('deals/:dealId/activities')
  @RequirePermissions('pipeline.manage', 'leads.manage')
  @HttpCode(HttpStatus.OK)
  addDealActivity(
    @Param('tenantId') tenantId: number,
    @Param('dealId') dealId: number,
    @Body() dto: CreateSalesDealActivityDto,
  ) {
    return this.salesWorkspaceService.addDealActivity(
      Number(tenantId),
      Number(dealId),
      dto,
    );
  }

  @ApiOkResponse({ type: SalesWorkspaceSnapshotDto })
  @Patch('deals/:dealId/stage')
  @RequirePermissions('pipeline.manage')
  @HttpCode(HttpStatus.OK)
  moveDealStage(
    @Param('tenantId') tenantId: number,
    @Param('dealId') dealId: number,
    @Body() dto: MoveSalesDealStageDto,
  ) {
    return this.salesWorkspaceService.moveDealStage(
      Number(tenantId),
      Number(dealId),
      dto,
    );
  }

  @ApiOkResponse({ type: SalesWorkspaceSnapshotDto })
  @ApiOperation({ summary: 'Reorder deals within a pipeline stage' })
  @Put('deals/reorder')
  @RequirePermissions('pipeline.manage')
  @HttpCode(HttpStatus.OK)
  reorderDealsInStage(
    @Param('tenantId') tenantId: number,
    @Body() dto: ReorderSalesDealsDto,
  ) {
    return this.salesWorkspaceService.reorderDealsInStage(
      Number(tenantId),
      dto,
    );
  }

  @ApiOkResponse({ type: SalesWorkspaceSnapshotDto })
  @ApiOperation({ summary: 'Send an outbound message in a sales conversation' })
  @Post('conversations/:conversationId/messages')
  @RequirePermissions('conversations.manage', 'leads.manage')
  @HttpCode(HttpStatus.OK)
  sendConversationMessage(
    @Param('tenantId') tenantId: number,
    @Param('conversationId') conversationId: number,
    @Body() dto: SendSalesConversationMessageDto,
  ) {
    return this.salesWorkspaceService.sendConversationMessage(
      Number(tenantId),
      Number(conversationId),
      dto,
    );
  }

  @ApiOkResponse({ type: SalesWorkspaceSnapshotDto })
  @Patch('leads/:leadId/assign')
  @RequirePermissions('leads.manage', 'assignments.manage')
  @HttpCode(HttpStatus.OK)
  assignLead(
    @Param('tenantId') tenantId: number,
    @Param('leadId') leadId: number,
    @Body() dto: AssignSalesLeadDto,
  ) {
    return this.salesWorkspaceService.assignLead(
      Number(tenantId),
      Number(leadId),
      dto,
    );
  }

  @ApiOkResponse({ type: SalesWorkspaceSnapshotDto })
  @Patch('leads/:leadId/read')
  @RequirePermissions('leads.manage', 'conversations.manage')
  @HttpCode(HttpStatus.OK)
  markLeadRead(
    @Param('tenantId') tenantId: number,
    @Param('leadId') leadId: number,
  ) {
    return this.salesWorkspaceService.markLeadRead(
      Number(tenantId),
      Number(leadId),
    );
  }

  @ApiOkResponse({ type: SalesWorkspaceSnapshotDto })
  @Patch('notifications/:notificationId/read')
  @RequirePermissions('leads.manage', 'conversations.manage')
  @HttpCode(HttpStatus.OK)
  markNotificationRead(
    @Param('tenantId') tenantId: number,
    @Param('notificationId') notificationId: number,
  ) {
    return this.salesWorkspaceService.markNotificationRead(
      Number(tenantId),
      Number(notificationId),
    );
  }

  @ApiOkResponse({ type: SalesWorkspaceSnapshotDto })
  @Post('notifications/read-all')
  @RequirePermissions('leads.manage', 'conversations.manage')
  @HttpCode(HttpStatus.OK)
  markAllNotificationsRead(@Param('tenantId') tenantId: number) {
    return this.salesWorkspaceService.markAllNotificationsRead(
      Number(tenantId),
    );
  }
}
