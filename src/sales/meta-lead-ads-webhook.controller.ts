import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiExcludeController, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MetaLeadAdsWebhookService } from './meta-lead-ads-webhook.service';

type RawBodyRequest = Request & { rawBody?: Buffer };

@ApiTags('Meta lead ads webhooks')
@ApiExcludeController()
@Controller({
  path: 'webhooks/meta/lead-ads',
  version: '1',
})
export class MetaLeadAdsWebhookController {
  constructor(
    private readonly metaLeadAdsWebhookService: MetaLeadAdsWebhookService,
  ) {}

  @ApiOperation({ summary: 'Meta Lead Ads webhook verification' })
  @Get()
  @HttpCode(HttpStatus.OK)
  verify(
    @Query('hub.mode') mode?: string,
    @Query('hub.verify_token') verifyToken?: string,
    @Query('hub.challenge') challenge?: string,
  ) {
    return this.metaLeadAdsWebhookService.verifySubscription({
      mode,
      verifyToken,
      challenge,
    });
  }

  @ApiOperation({ summary: 'Meta Lead Ads leadgen events' })
  @Post()
  @HttpCode(HttpStatus.OK)
  async receive(@Req() request: RawBodyRequest, @Body() payload: unknown) {
    this.metaLeadAdsWebhookService.assertValidSignature(
      request.rawBody,
      request.header('x-hub-signature-256'),
    );
    await this.metaLeadAdsWebhookService.handleWebhook(
      payload as Parameters<MetaLeadAdsWebhookService['handleWebhook']>[0],
    );

    return { success: true };
  }
}
