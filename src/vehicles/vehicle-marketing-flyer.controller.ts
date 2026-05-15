import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';
import { RequirePermissions } from '../access/permissions.decorator';
import { PermissionsGuard } from '../access/permissions.guard';
import {
  CreateFlyerMarketingThreadDto,
  FlyerMarketingChatStreamDto,
  UpdateFlyerMarketingMessageDto,
  UpdateFlyerMarketingThreadDto,
  VehicleMarketingFlyerMessageResponseDto,
  VehicleMarketingFlyerThreadDetailDto,
  VehicleMarketingFlyerThreadSummaryDto,
} from './dto/vehicle-marketing-flyer.dto';
import { VehicleMarketingFlyerService } from './vehicle-marketing-flyer.service';
import { FLYER_STREAM_THROTTLE } from './flyer-stream-throttle.config';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@ApiTags('Vehicle Marketing Flyers')
@Controller({
  path: 'tenants/:tenantId/vehicles/:vehicleId/marketing/flyer-threads',
  version: '1',
})
export class VehicleMarketingFlyerThreadsController {
  constructor(
    private readonly vehicleMarketingFlyerService: VehicleMarketingFlyerService,
  ) {}

  @ApiOkResponse({ type: [VehicleMarketingFlyerThreadSummaryDto] })
  @ApiOperation({ summary: 'List flyer chat threads for a vehicle' })
  @Get()
  @RequirePermissions('vehicles.view', 'vehicles.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number })
  @ApiParam({ name: 'vehicleId', type: Number })
  listThreads(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ): Promise<VehicleMarketingFlyerThreadSummaryDto[]> {
    return this.vehicleMarketingFlyerService.listThreads(tenantId, vehicleId);
  }

  @ApiOkResponse({ type: VehicleMarketingFlyerThreadSummaryDto })
  @ApiOperation({
    summary: 'Create a flyer thread',
    description:
      'Optional parentThreadId links this chat as a continuation so ancestor transcripts inform context.',
  })
  @Post()
  @RequirePermissions('vehicles.manage')
  @HttpCode(HttpStatus.CREATED)
  @ApiParam({ name: 'tenantId', type: Number })
  @ApiParam({ name: 'vehicleId', type: Number })
  createThread(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Body() dto: CreateFlyerMarketingThreadDto,
  ): Promise<VehicleMarketingFlyerThreadSummaryDto> {
    return this.vehicleMarketingFlyerService.createThread(
      tenantId,
      vehicleId,
      dto,
    );
  }

  @ApiOkResponse({ type: VehicleMarketingFlyerThreadDetailDto })
  @ApiOperation({ summary: 'Get thread with ordered messages' })
  @Get(':threadId')
  @RequirePermissions('vehicles.view', 'vehicles.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number })
  @ApiParam({ name: 'vehicleId', type: Number })
  @ApiParam({ name: 'threadId', type: Number })
  getThread(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Param('threadId', ParseIntPipe) threadId: number,
  ): Promise<VehicleMarketingFlyerThreadDetailDto> {
    return this.vehicleMarketingFlyerService.getThreadDetail(
      tenantId,
      vehicleId,
      threadId,
    );
  }

  @ApiOkResponse({ type: VehicleMarketingFlyerThreadSummaryDto })
  @ApiOperation({ summary: 'Rename thread' })
  @Patch(':threadId')
  @RequirePermissions('vehicles.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number })
  @ApiParam({ name: 'vehicleId', type: Number })
  @ApiParam({ name: 'threadId', type: Number })
  patchThread(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Param('threadId', ParseIntPipe) threadId: number,
    @Body() dto: UpdateFlyerMarketingThreadDto,
  ): Promise<VehicleMarketingFlyerThreadSummaryDto> {
    return this.vehicleMarketingFlyerService.updateThread(
      tenantId,
      vehicleId,
      threadId,
      dto,
    );
  }

  @ApiProduces('text/event-stream')
  @ApiOperation({
    summary: 'Append user message and stream AI assistant reply (SSE)',
    description:
      'Streams a multi-turn marketing reply from DealrStack AI (DeepSeek, OpenAI, or Gemini per server config, with credential fallbacks). Persists the final assistant message and parsed flyer artifact. If no provider is configured, the server streams a configuration notice instead of model output. SSE events: `{type:"delta",text}`, `{type:"done",assistantMessageId,provider,artifact}`, `{type:"error",message}` — `provider` is the text model used or `template` when falling back.',
  })
  @Post(':threadId/stream')
  @UseGuards(ThrottlerGuard)
  @Throttle({
    [FLYER_STREAM_THROTTLE.name]: {
      ttl: FLYER_STREAM_THROTTLE.ttl,
      limit: FLYER_STREAM_THROTTLE.limit,
    },
  })
  @RequirePermissions('vehicles.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number })
  @ApiParam({ name: 'vehicleId', type: Number })
  @ApiParam({ name: 'threadId', type: Number })
  async streamReply(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Param('threadId', ParseIntPipe) threadId: number,
    @Body() dto: FlyerMarketingChatStreamDto,
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
      await this.vehicleMarketingFlyerService.streamAssistantReply(
        tenantId,
        vehicleId,
        threadId,
        dto,
        writeEvent,
      );
    } catch (e) {
      writeEvent({
        type: 'error',
        message:
          e instanceof Error
            ? e.message
            : 'Flyer assistant stream failed unexpectedly',
      });
    }
    res.end();
  }

  @ApiOkResponse({ type: VehicleMarketingFlyerMessageResponseDto })
  @ApiOperation({
    summary: 'Edit saved message content / flyer artifact',
  })
  @Patch(':threadId/messages/:messageId')
  @RequirePermissions('vehicles.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number })
  @ApiParam({ name: 'vehicleId', type: Number })
  @ApiParam({ name: 'threadId', type: Number })
  @ApiParam({ name: 'messageId', type: Number })
  patchMessage(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Param('threadId', ParseIntPipe) threadId: number,
    @Param('messageId', ParseIntPipe) messageId: number,
    @Body() dto: UpdateFlyerMarketingMessageDto,
  ): Promise<VehicleMarketingFlyerMessageResponseDto> {
    return this.vehicleMarketingFlyerService.updateMessage(
      tenantId,
      vehicleId,
      threadId,
      messageId,
      dto,
    );
  }
}
