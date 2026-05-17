import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';
import validateConfig from '../../utils/validate-config';
import { MetaLeadAdsConfig } from './meta-lead-ads-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  META_LEAD_ADS_VERIFY_TOKEN: string;

  @IsString()
  @IsOptional()
  META_PAGE_ACCESS_TOKEN: string;
}

export default registerAs<MetaLeadAdsConfig>('metaLeadAds', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    verifyToken:
      process.env.META_LEAD_ADS_VERIFY_TOKEN?.trim() ||
      process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN?.trim() ||
      undefined,
    pageAccessToken:
      process.env.META_PAGE_ACCESS_TOKEN?.trim() ||
      process.env.WHATSAPP_DEMO_ACCESS_TOKEN?.trim() ||
      undefined,
  };
});
