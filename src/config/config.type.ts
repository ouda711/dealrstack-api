import { AppConfig } from './app-config.type';
import { AppleConfig } from '../auth-apple/config/apple-config.type';
import { AuthConfig } from '../auth/config/auth-config.type';
import { DatabaseConfig } from '../database/config/database-config.type';
import { FacebookConfig } from '../auth-facebook/config/facebook-config.type';
import { FileConfig } from '../files/config/file-config.type';
import { GoogleConfig } from '../auth-google/config/google-config.type';
import { MailConfig } from '../mail/config/mail-config.type';
import { AiConfig } from '../ai/config/ai-config.type';
import { WhatsAppConfig } from '../whatsapp/config/whatsapp-config.type';
import { MetaLeadAdsConfig } from '../sales/config/meta-lead-ads-config.type';
import { WebPushConfig } from '../sales/config/web-push.config';
import { GoogleCalendarConfig } from '../sales/config/google-calendar.config';

export type AllConfigType = {
  app: AppConfig;
  apple: AppleConfig;
  auth: AuthConfig;
  ai: AiConfig;
  database: DatabaseConfig;
  facebook: FacebookConfig;
  file: FileConfig;
  google: GoogleConfig;
  mail: MailConfig;
  whatsapp: WhatsAppConfig;
  metaLeadAds: MetaLeadAdsConfig;
  webPush: WebPushConfig;
  googleCalendar: GoogleCalendarConfig;
};
