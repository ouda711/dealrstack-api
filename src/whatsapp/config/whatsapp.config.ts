import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';
import validateConfig from '../../utils/validate-config';
import { WhatsAppConfig } from './whatsapp-config.type';

class EnvironmentVariablesValidator {
  @IsOptional()
  @IsString()
  WHATSAPP_API_VERSION?: string;

  @IsOptional()
  @IsString()
  WHATSAPP_APP_SECRET?: string;

  @IsOptional()
  @IsString()
  WHATSAPP_WEBHOOK_VERIFY_TOKEN?: string;

  @IsOptional()
  @IsString()
  WHATSAPP_DEMO_TENANT_SLUG?: string;

  @IsOptional()
  @IsString()
  WHATSAPP_DEMO_PHONE_NUMBER_ID?: string;

  @IsOptional()
  @IsString()
  WHATSAPP_DEMO_ACCESS_TOKEN?: string;
}

export default registerAs<WhatsAppConfig>('whatsapp', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    apiVersion: process.env.WHATSAPP_API_VERSION?.trim() || 'v21.0',
    appSecret: process.env.WHATSAPP_APP_SECRET?.trim() || undefined,
    webhookVerifyToken:
      process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN?.trim() || undefined,
    demoTenantSlug: process.env.WHATSAPP_DEMO_TENANT_SLUG?.trim() || undefined,
    demoPhoneNumberId:
      process.env.WHATSAPP_DEMO_PHONE_NUMBER_ID?.trim() || undefined,
    demoAccessToken:
      process.env.WHATSAPP_DEMO_ACCESS_TOKEN?.trim() || undefined,
  };
});
