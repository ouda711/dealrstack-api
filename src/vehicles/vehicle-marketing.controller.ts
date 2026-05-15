import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
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
import type { Response } from 'express';

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

  @ApiProduces('text/event-stream')
  @ApiOperation({
    summary: 'Stream marketing copy (Server-Sent Events)',
    description:
      'Streams AI-generated tokens from the API (DeepSeek by default, then OpenAI/Gemini fallbacks). Falls back to template copy when AI is unavailable. Events are JSON objects in SSE `data` lines: `{type:"delta",text}`, `{type:"done",...}`, `{type:"error",message}`. Preferred URL: POST .../marketing/stream (legacy alias: .../marketing/generate/stream).',
  })
  @Post(['stream', 'generate/stream'])
  @RequirePermissions('vehicles.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number, required: true })
  @ApiParam({ name: 'vehicleId', type: Number, required: true })
  async generateCopyStream(
    @Param('tenantId') tenantId: number,
    @Param('vehicleId') vehicleId: number,
    @Body() dto: VehicleMarketingGenerateDto,
    @Res({ passthrough: false }) res: Response,
  ): Promise<void> {
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');

    const writeEvent = (payload: Record<string, unknown>) => {
      res.write(`data: ${JSON.stringify(payload)}\n\n`);
    };

    try {
      await this.vehicleMarketingService.streamGenerateCopy(
        Number(tenantId),
        Number(vehicleId),
        dto,
        writeEvent,
      );
    } catch (e) {
      writeEvent({
        type: 'error',
        message:
          e instanceof Error
            ? e.message
            : 'Marketing stream failed unexpectedly',
      });
    }
    res.end();
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
