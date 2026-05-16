export type WhatsAppConfig = {
  apiVersion: string;
  appSecret?: string;
  webhookVerifyToken?: string;
  embeddedSignupConfigId?: string;
  oauthRedirectUri?: string;
  demoTenantSlug?: string;
  demoPhoneNumberId?: string;
  demoAccessToken?: string;
};
