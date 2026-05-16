import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { WhatsAppCloudClient } from './whatsapp-cloud.client';
import { WhatsAppIntegrationService } from './whatsapp-integration.service';
import { toWhatsAppRecipient } from './utils/whatsapp-phone.util';

@Injectable()
export class WhatsAppOutboundService {
  constructor(
    private readonly whatsAppCloudClient: WhatsAppCloudClient,
    private readonly integrationService: WhatsAppIntegrationService,
  ) {}

  async sendTextMessage(input: {
    tenantId: number;
    customerPhone: string;
    body: string;
  }): Promise<{ whatsappMessageId: string; delivered: boolean }> {
    const integration = await this.integrationService.getEnabledByTenantId(
      input.tenantId,
    );

    if (!integration) {
      return { whatsappMessageId: '', delivered: false };
    }

    try {
      const result = await this.whatsAppCloudClient.sendTextMessage({
        phoneNumberId: integration.phoneNumberId,
        accessToken: integration.accessToken,
        to: toWhatsAppRecipient(input.customerPhone),
        body: input.body,
      });

      return { whatsappMessageId: result.whatsappMessageId, delivered: true };
    } catch (error) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'whatsappSendFailed',
        message:
          error instanceof Error ? error.message : 'WhatsApp send failed',
      });
    }
  }
}
