import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';

export type SendWhatsAppTextInput = {
  phoneNumberId: string;
  accessToken: string;
  to: string;
  body: string;
};

export type SendWhatsAppTextResult = {
  whatsappMessageId: string;
};

@Injectable()
export class WhatsAppCloudClient {
  private readonly logger = new Logger(WhatsAppCloudClient.name);

  constructor(private readonly configService: ConfigService<AllConfigType>) {}

  async sendTextMessage(
    input: SendWhatsAppTextInput,
  ): Promise<SendWhatsAppTextResult> {
    const apiVersion = this.configService.get('whatsapp.apiVersion', {
      infer: true,
    });
    const url = `https://graph.facebook.com/${apiVersion}/${input.phoneNumberId}/messages`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${input.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: input.to,
        type: 'text',
        text: {
          preview_url: false,
          body: input.body,
        },
      }),
    });

    const payload = (await response.json().catch(() => ({}))) as {
      error?: { message?: string; code?: number };
      messages?: { id?: string }[];
    };

    if (!response.ok) {
      this.logger.warn(
        `WhatsApp send failed (${response.status}): ${payload.error?.message ?? 'unknown error'}`,
      );
      throw new Error(
        payload.error?.message ?? `WhatsApp API error (${response.status})`,
      );
    }

    const whatsappMessageId = payload.messages?.[0]?.id;

    if (!whatsappMessageId) {
      throw new Error('WhatsApp API did not return a message id');
    }

    return { whatsappMessageId };
  }
}
