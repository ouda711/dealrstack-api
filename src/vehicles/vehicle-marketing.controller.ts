import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
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
import { VehicleMarketingGenerateDto } from './dto/vehicle-marketing-generate.dto';
import {
  VehicleMarketingAnalyticsDto,
  VehicleMarketingGenerateResponseDto,
  VehicleShareProfileDto,
} from './dto/vehicle-marketing-response.dto';
import { VehicleMarketingService } from './vehicle-marketing.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@ApiTags('Vehicle Marketing')
@Controller({
  path: 'tenants/:tenantId/vehicles/:vehicleId/marketing',
  version: '1',
})
export class VehicleMarketingController {
  constructor(
    private readonly vehicleMarketingService: VehicleMarketingService,
  ) {}

  @ApiOkResponse({ type: VehicleShareProfileDto })
  @ApiOperation({
    summary: 'Get shareable listing links for a vehicle',
    description:
      'Ensures a public listing slug exists and returns channel-specific tracked URLs.',
  })
  @Get('share')
  @RequirePermissions('vehicles.view', 'vehicles.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number, required: true })
  @ApiParam({ name: 'vehicleId', type: Number, required: true })
  getShareProfile(
    @Param('tenantId') tenantId: number,
    @Param('vehicleId') vehicleId: number,
  ): Promise<VehicleShareProfileDto> {
    return this.vehicleMarketingService.getShareProfile(tenantId, vehicleId);
  }

  @ApiOkResponse({ type: VehicleMarketingAnalyticsDto })
  @ApiOperation({
    summary: 'Get listing analytics for a vehicle',
  })
  @ApiQuery({ name: 'periodDays', required: false, type: Number })
  @Get('analytics')
  @RequirePermissions('vehicles.view', 'vehicles.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number, required: true })
  @ApiParam({ name: 'vehicleId', type: Number, required: true })
  getAnalytics(
    @Param('tenantId') tenantId: number,
    @Param('vehicleId') vehicleId: number,
    @Query('periodDays') periodDays?: number,
  ): Promise<VehicleMarketingAnalyticsDto> {
    return this.vehicleMarketingService.getAnalytics(
      tenantId,
      vehicleId,
      periodDays ? Number(periodDays) : 30,
    );
  }

  @ApiOkResponse({ type: VehicleMarketingGenerateResponseDto })
  @ApiOperation({
    summary: 'Generate marketing copy for a vehicle',
    description:
      'Template-based copy for social posts, flyers, and hashtags. Wire OpenAI/Gemini later via the same contract.',
  })
  @Post('generate')
  @RequirePermissions('vehicles.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number, required: true })
  @ApiParam({ name: 'vehicleId', type: Number, required: true })
  generateCopy(
    @Param('tenantId') tenantId: number,
    @Param('vehicleId') vehicleId: number,
    @Body() dto: VehicleMarketingGenerateDto,
  ): Promise<VehicleMarketingGenerateResponseDto> {
    return this.vehicleMarketingService.generateCopy(tenantId, vehicleId, dto);
  }
}
