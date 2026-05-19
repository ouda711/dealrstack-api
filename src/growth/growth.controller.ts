import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
import { GrowthService } from './growth.service';
import { QualifySalesLeadDto } from './dto/qualify-sales-lead.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@ApiTags('Growth engine')
@Controller({
  path: 'tenants/:tenantId/growth',
  version: '1',
})
export class GrowthController {
  constructor(private readonly growthService: GrowthService) {}

  @ApiOperation({ summary: 'List Phase 2 growth capabilities and status' })
  @ApiOkResponse({ description: 'Growth feature catalog' })
  @Get('features')
  @RequirePermissions('leads.manage', 'reports.view')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number, required: true })
  listFeatures() {
    return this.growthService.listFeatures();
  }

  @ApiOperation({ summary: 'AI qualify a lead (beta)' })
  @Post('leads/:leadId/qualify')
  @RequirePermissions('leads.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number, required: true })
  @ApiParam({ name: 'leadId', type: Number, required: true })
  qualifyLead(
    @Param('tenantId') tenantId: number,
    @Param('leadId') leadId: number,
    @Body() dto: QualifySalesLeadDto,
  ) {
    return this.growthService.qualifyLead(
      Number(tenantId),
      Number(leadId),
      dto.context,
    );
  }
}
