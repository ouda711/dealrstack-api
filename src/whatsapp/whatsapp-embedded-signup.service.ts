import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
import { CompleteWhatsAppEmbeddedSignupDto } from './dto/complete-whatsapp-embedded-signup.dto';
import { WhatsAppEmbeddedSignupConfigDto } from './domain/whatsapp-embedded-signup-config.dto';
import { TenantWhatsAppIntegrationDto } from './domain/tenant-whatsapp-integration.dto';
import { WhatsAppIntegrationService } from './whatsapp-integration.service';

type GraphPhoneNumber = {
  id: string;
  display_phone_number?: string;
  verified_name?: string;
};

@Injectable()
export class WhatsAppEmbeddedSignupService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly integrationService: WhatsAppIntegrationService,
  ) {}

  getSignupConfig(): WhatsAppEmbeddedSignupConfigDto {
    const appId = this.configService.get('facebook.appId', { infer: true });
    const configId = this.configService.get('whatsapp.embeddedSignupConfigId', {
      infer: true,
    });
    const apiVersion = this.configService.get('whatsapp.apiVersion', {
      infer: true,
    });

    if (!appId) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'facebookAppNotConfigured',
      });
    }

    return {
      appId,
      configId: configId ?? null,
      redirectUri: this.getRedirectUri(),
      sdkVersion: apiVersion ?? 'v21.0',
    };
  }

  async completeSignup(
    tenantId: number,
    dto: CompleteWhatsAppEmbeddedSignupDto,
  ): Promise<TenantWhatsAppIntegrationDto> {
    const appId = this.configService.get('facebook.appId', { infer: true });
    const appSecret = this.configService.get('facebook.appSecret', {
      infer: true,
    });
    const apiVersion = this.configService.get('whatsapp.apiVersion', {
      infer: true,
    });

    if (!appId || !appSecret) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'facebookAppNotConfigured',
      });
    }

    const tokenUrl = new URL(
      `https://graph.facebook.com/${apiVersion}/oauth/access_token`,
    );
    tokenUrl.searchParams.set('client_id', appId);
    tokenUrl.searchParams.set('client_secret', appSecret);
    tokenUrl.searchParams.set('code', dto.code);
    tokenUrl.searchParams.set('redirect_uri', dto.redirectUri);

    const tokenResponse = await fetch(tokenUrl);
    const tokenPayload = (await tokenResponse.json().catch(() => ({}))) as {
      access_token?: string;
      error?: { message?: string };
    };

    if (!tokenResponse.ok || !tokenPayload.access_token) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'whatsappEmbeddedSignupTokenExchangeFailed',
        message: tokenPayload.error?.message,
      });
    }

    const accessToken = tokenPayload.access_token;
    const phoneNumber = await this.resolvePhoneNumber({
      apiVersion: apiVersion ?? 'v21.0',
      accessToken,
      phoneNumberId: dto.phoneNumberId,
      wabaId: dto.wabaId,
    });

    return this.integrationService.upsertForTenant(tenantId, {
      phoneNumberId: phoneNumber.id,
      accessToken,
      wabaId: phoneNumber.wabaId,
      displayPhoneNumber: phoneNumber.displayPhoneNumber ?? undefined,
      isEnabled: true,
    });
  }

  private getRedirectUri(): string {
    const configured = this.configService.get('whatsapp.oauthRedirectUri', {
      infer: true,
    });

    if (configured) {
      return configured.replace(/\/$/, '');
    }

    const frontendDomain = this.configService
      .get('app.frontendDomain', { infer: true })
      ?.replace(/\/$/, '');

    return `${frontendDomain}/workspace/conversations/whatsapp-callback`;
  }

  private async resolvePhoneNumber(input: {
    apiVersion: string;
    accessToken: string;
    phoneNumberId?: string;
    wabaId?: string;
  }): Promise<{
    id: string;
    wabaId: string;
    displayPhoneNumber: string | null;
  }> {
    if (input.phoneNumberId && input.wabaId) {
      const details = await this.fetchPhoneNumberDetails(
        input.apiVersion,
        input.accessToken,
        input.phoneNumberId,
      );

      return {
        id: input.phoneNumberId,
        wabaId: input.wabaId,
        displayPhoneNumber: details?.display_phone_number ?? null,
      };
    }

    const wabaIds = input.wabaId
      ? [input.wabaId]
      : await this.fetchWabaIds(input.apiVersion, input.accessToken);

    for (const wabaId of wabaIds) {
      const numbers = await this.fetchPhoneNumbersForWaba(
        input.apiVersion,
        input.accessToken,
        wabaId,
      );

      if (numbers.length > 0) {
        const first = numbers[0];
        return {
          id: first.id,
          wabaId,
          displayPhoneNumber: first.display_phone_number ?? null,
        };
      }
    }

    throw new UnprocessableEntityException({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      error: 'whatsappPhoneNumberNotFound',
    });
  }

  private async fetchWabaIds(
    apiVersion: string,
    accessToken: string,
  ): Promise<string[]> {
    const url = new URL(
      `https://graph.facebook.com/${apiVersion}/me/whatsapp_business_accounts`,
    );
    url.searchParams.set('access_token', accessToken);

    const response = await fetch(url);
    const payload = (await response.json().catch(() => ({}))) as {
      data?: { id: string }[];
    };

    return (payload.data ?? []).map((item) => item.id);
  }

  private async fetchPhoneNumbersForWaba(
    apiVersion: string,
    accessToken: string,
    wabaId: string,
  ): Promise<GraphPhoneNumber[]> {
    const url = new URL(
      `https://graph.facebook.com/${apiVersion}/${wabaId}/phone_numbers`,
    );
    url.searchParams.set('access_token', accessToken);

    const response = await fetch(url);
    const payload = (await response.json().catch(() => ({}))) as {
      data?: GraphPhoneNumber[];
    };

    return payload.data ?? [];
  }

  private async fetchPhoneNumberDetails(
    apiVersion: string,
    accessToken: string,
    phoneNumberId: string,
  ): Promise<GraphPhoneNumber | null> {
    const url = new URL(
      `https://graph.facebook.com/${apiVersion}/${phoneNumberId}`,
    );
    url.searchParams.set('fields', 'id,display_phone_number,verified_name');
    url.searchParams.set('access_token', accessToken);

    const response = await fetch(url);

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as GraphPhoneNumber;
  }
}
