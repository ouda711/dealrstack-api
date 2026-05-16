import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, timingSafeEqual } from 'crypto';
import { AllConfigType } from '../config/config.type';
import { WhatsAppInboundService } from './whatsapp-inbound.service';

@Injectable()
export class WhatsAppWebhookService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly inboundService: WhatsAppInboundService,
  ) {}

  verifySubscription(query: {
    mode?: string;
    verifyToken?: string;
    challenge?: string;
  }): string {
    const expectedToken = this.configService.get(
      'whatsapp.webhookVerifyToken',
      {
        infer: true,
      },
    );

    if (!expectedToken) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'whatsappWebhookVerifyTokenNotConfigured',
      });
    }

    if (
      query.mode === 'subscribe' &&
      query.verifyToken === expectedToken &&
      query.challenge
    ) {
      return query.challenge;
    }

    throw new ForbiddenException({
      status: HttpStatus.FORBIDDEN,
      error: 'whatsappWebhookVerificationFailed',
    });
  }

  assertValidSignature(rawBody: Buffer | undefined, signatureHeader?: string) {
    const appSecret = this.configService.get('whatsapp.appSecret', {
      infer: true,
    });

    if (!appSecret) {
      return;
    }

    if (!signatureHeader?.startsWith('sha256=') || !rawBody) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        error: 'whatsappWebhookSignatureMissing',
      });
    }

    const expected = createHmac('sha256', appSecret)
      .update(rawBody)
      .digest('hex');
    const received = signatureHeader.slice('sha256='.length);
    const expectedBuffer = Buffer.from(expected, 'utf8');
    const receivedBuffer = Buffer.from(received, 'utf8');

    if (
      expectedBuffer.length !== receivedBuffer.length ||
      !timingSafeEqual(expectedBuffer, receivedBuffer)
    ) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        error: 'whatsappWebhookSignatureInvalid',
      });
    }
  }

  async handleEventWithSignature(
    rawBody: Buffer | undefined,
    signatureHeader: string | undefined,
    payload: unknown,
  ) {
    this.assertValidSignature(rawBody, signatureHeader);
    await this.inboundService.processWebhookPayload(payload);
  }
}
