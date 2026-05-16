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
import { WhatsAppWebhookService } from './whatsapp-webhook.service';

type RawBodyRequest = Request & { rawBody?: Buffer };

@ApiTags('WhatsApp webhooks')
@ApiExcludeController()
@Controller({
  path: 'webhooks/whatsapp',
  version: '1',
})
export class WhatsAppWebhookController {
  constructor(private readonly webhookService: WhatsAppWebhookService) {}

  @ApiOperation({ summary: 'Meta webhook verification challenge' })
  @Get()
  @HttpCode(HttpStatus.OK)
  verify(
    @Query('hub.mode') mode?: string,
    @Query('hub.verify_token') verifyToken?: string,
    @Query('hub.challenge') challenge?: string,
  ) {
    return this.webhookService.verifySubscription({
      mode,
      verifyToken,
      challenge,
    });
  }

  @ApiOperation({ summary: 'Meta WhatsApp Cloud API event webhook' })
  @Post()
  @HttpCode(HttpStatus.OK)
  async receive(@Req() request: RawBodyRequest, @Body() payload: unknown) {
    await this.webhookService.handleEventWithSignature(
      request.rawBody,
      request.header('x-hub-signature-256'),
      payload,
    );

    return { success: true };
  }
}
