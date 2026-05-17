import {
  Body,
  Controller,
  Delete,
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
import { CreateSalesLeadDto } from './dto/create-sales-lead.dto';
import { ImportSalesLeadsCsvDto } from './dto/import-sales-leads-csv.dto';
import { CreateSalesAssignmentRuleDto } from './dto/create-sales-assignment-rule.dto';
import { CreateSalesFollowUpRuleDto } from './dto/create-sales-follow-up-rule.dto';
import { UpdateSalesActivityDto } from './dto/update-sales-activity.dto';
import { UpdateSalesAssignmentRuleDto } from './dto/update-sales-assignment-rule.dto';
import { UpdateSalesFollowUpRuleDto } from './dto/update-sales-follow-up-rule.dto';
import { CreateSalesDealActivityDto } from './dto/create-sales-deal-activity.dto';
import { CreateSalesPipelineDealDto } from './dto/create-sales-pipeline-deal.dto';
import { MoveSalesDealStageDto } from './dto/move-sales-deal-stage.dto';
import { ReorderSalesDealsDto } from './dto/reorder-sales-deals.dto';
import { SendSalesConversationMessageDto } from './dto/send-sales-conversation-message.dto';
import { UpdateSalesPipelineDealDto } from './dto/update-sales-pipeline-deal.dto';
import { SalesWorkspaceSnapshotDto } from './domain/sales-workspace';
import { SalesLeadCaptureConfigDto } from './dto/sales-lead-capture-config.dto';
import { SalesLeadCaptureService } from './sales-lead-capture.service';
import { SalesWorkspaceService } from './sales-workspace.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@ApiTags('Sales workspace')
@Controller({
  path: 'tenants/:tenantId/sales-workspace',
  version: '1',
})
export class SalesController {
  constructor(
    private readonly salesWorkspaceService: SalesWorkspaceService,
    private readonly leadCaptureService: SalesLeadCaptureService,
  ) {}

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
  @ApiOkResponse({ type: SalesWorkspaceSnapshotDto })
  @ApiOperation({
    summary: 'Evaluate enabled follow-up rules for the tenant',
    description:
      'Creates or updates automated follow-up activities and overdue notifications based on current leads, deals, and conversations.',
  })
  @Post('follow-up-rules/evaluate')
  @RequirePermissions('leads.manage', 'pipeline.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number, required: true })
  evaluateFollowUpRules(@Param('tenantId') tenantId: number) {
    return this.salesWorkspaceService.getWorkspace(Number(tenantId));
  }

  @ApiOperation({ summary: 'Create an automated follow-up rule' })
  @Post('follow-up-rules')
  @RequirePermissions('leads.manage')
  @HttpCode(HttpStatus.OK)
  createFollowUpRule(
    @Param('tenantId') tenantId: number,
    @Body() dto: CreateSalesFollowUpRuleDto,
  ) {
    return this.salesWorkspaceService.createFollowUpRule(Number(tenantId), dto);
  }

  @ApiOkResponse({ type: SalesWorkspaceSnapshotDto })
  @ApiOperation({ summary: 'Update an automated follow-up rule' })
  @Patch('follow-up-rules/:ruleId')
  @RequirePermissions('leads.manage')
  @HttpCode(HttpStatus.OK)
  updateFollowUpRule(
    @Param('tenantId') tenantId: number,
    @Param('ruleId') ruleId: number,
    @Body() dto: UpdateSalesFollowUpRuleDto,
  ) {
    return this.salesWorkspaceService.updateFollowUpRule(
      Number(tenantId),
      Number(ruleId),
      dto,
    );
  }

  @ApiOkResponse({ type: SalesWorkspaceSnapshotDto })
  @ApiOperation({ summary: 'Delete an automated follow-up rule' })
  @Delete('follow-up-rules/:ruleId')
  @RequirePermissions('leads.manage')
  @HttpCode(HttpStatus.OK)
  deleteFollowUpRule(
    @Param('tenantId') tenantId: number,
    @Param('ruleId') ruleId: number,
  ) {
    return this.salesWorkspaceService.deleteFollowUpRule(
      Number(tenantId),
      Number(ruleId),
    );
  }

  @ApiOkResponse({ type: SalesWorkspaceSnapshotDto })
  @ApiOperation({ summary: 'Update follow-up activity status' })
  @Patch('activities/:activityId')
  @RequirePermissions('leads.manage')
  @HttpCode(HttpStatus.OK)
  updateActivityStatus(
    @Param('tenantId') tenantId: number,
    @Param('activityId') activityId: number,
    @Body() dto: UpdateSalesActivityDto,
  ) {
    return this.salesWorkspaceService.updateActivityStatus(
      Number(tenantId),
      Number(activityId),
      dto,
    );
  }

  @ApiOkResponse({ type: SalesWorkspaceSnapshotDto })
  @ApiOperation({
    summary: 'Evaluate enabled assignment rules for unassigned leads',
    description:
      'Applies active assignment rules to leads without an owner and syncs related deals and conversations.',
  })
  @Post('assignment-rules/evaluate')
  @RequirePermissions('assignments.manage', 'leads.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number, required: true })
  evaluateAssignmentRules(@Param('tenantId') tenantId: number) {
    return this.salesWorkspaceService.getWorkspace(Number(tenantId));
  }

  @ApiOkResponse({ type: SalesWorkspaceSnapshotDto })
  @ApiOperation({
    summary: 'Evaluate ignored leads for manager escalation',
    description:
      'Marks qualifying unassigned, SLA-breached, or stale unread leads as urgent and notifies managers.',
  })
  @Post('escalation/evaluate')
  @RequirePermissions('assignments.manage', 'leads.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number, required: true })
  evaluateLeadEscalations(@Param('tenantId') tenantId: number) {
    return this.salesWorkspaceService.getWorkspace(Number(tenantId));
  }

  @ApiOkResponse({ type: SalesWorkspaceSnapshotDto })
  @ApiOperation({ summary: 'Create a lead assignment rule' })
  @Post('assignment-rules')
  @RequirePermissions('assignments.manage')
  @HttpCode(HttpStatus.OK)
  createAssignmentRule(
    @Param('tenantId') tenantId: number,
    @Body() dto: CreateSalesAssignmentRuleDto,
  ) {
    return this.salesWorkspaceService.createAssignmentRule(
      Number(tenantId),
      dto,
    );
  }

  @ApiOkResponse({ type: SalesWorkspaceSnapshotDto })
  @ApiOperation({ summary: 'Update a lead assignment rule' })
  @Patch('assignment-rules/:ruleId')
  @RequirePermissions('assignments.manage')
  @HttpCode(HttpStatus.OK)
  updateAssignmentRule(
    @Param('tenantId') tenantId: number,
    @Param('ruleId') ruleId: number,
    @Body() dto: UpdateSalesAssignmentRuleDto,
  ) {
    return this.salesWorkspaceService.updateAssignmentRule(
      Number(tenantId),
      Number(ruleId),
      dto,
    );
  }

  @ApiOkResponse({ type: SalesWorkspaceSnapshotDto })
  @ApiOperation({ summary: 'Delete a lead assignment rule' })
  @Delete('assignment-rules/:ruleId')
  @RequirePermissions('assignments.manage')
  @HttpCode(HttpStatus.OK)
  deleteAssignmentRule(
    @Param('tenantId') tenantId: number,
    @Param('ruleId') ruleId: number,
  ) {
    return this.salesWorkspaceService.deleteAssignmentRule(
      Number(tenantId),
      Number(ruleId),
    );
  }

  @ApiOkResponse({ type: SalesLeadCaptureConfigDto })
  @ApiOperation({ summary: 'Lead capture integration settings for the tenant' })
  @Get('lead-capture')
  @RequirePermissions('leads.manage')
  @HttpCode(HttpStatus.OK)
  getLeadCaptureConfig(@Param('tenantId') tenantId: number) {
    return this.leadCaptureService.getConfig(Number(tenantId));
  }

  @ApiOkResponse({ type: SalesLeadCaptureConfigDto })
  @ApiOperation({ summary: 'Regenerate the public website lead capture token' })
  @Post('lead-capture/regenerate-website-token')
  @RequirePermissions('leads.manage')
  @HttpCode(HttpStatus.OK)
  regenerateWebsiteLeadToken(@Param('tenantId') tenantId: number) {
    return this.leadCaptureService.regenerateWebsiteToken(Number(tenantId));
  }

  @ApiOkResponse({ type: SalesWorkspaceSnapshotDto })
  @ApiOperation({
    summary: 'Create a lead from website, social, phone, or manual capture',
  })
  @Post('leads')
  @RequirePermissions('leads.manage')
  @HttpCode(HttpStatus.OK)
  createLead(
    @Param('tenantId') tenantId: number,
    @Body() dto: CreateSalesLeadDto,
  ) {
    return this.salesWorkspaceService.createLead(Number(tenantId), dto);
  }

  @ApiOkResponse({ type: SalesWorkspaceSnapshotDto })
  @ApiOperation({
    summary:
      'Import leads from CSV (customerName, customerPhone, interestSummary)',
  })
  @Post('leads/import')
  @RequirePermissions('leads.manage')
  @HttpCode(HttpStatus.OK)
  importLeadsFromCsv(
    @Param('tenantId') tenantId: number,
    @Body() dto: ImportSalesLeadsCsvDto,
  ) {
    return this.salesWorkspaceService.importLeadsFromCsv(Number(tenantId), dto);
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
