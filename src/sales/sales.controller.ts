import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
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
import { MoveSalesDealStageDto } from './dto/move-sales-deal-stage.dto';
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
