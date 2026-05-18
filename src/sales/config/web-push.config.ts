import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';
import validateConfig from '../../utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  WEB_PUSH_VAPID_PUBLIC_KEY: string;

  @IsString()
  @IsOptional()
  WEB_PUSH_VAPID_PRIVATE_KEY: string;

  @IsString()
  @IsOptional()
  WEB_PUSH_VAPID_SUBJECT: string;
}

export type WebPushConfig = {
  publicKey?: string;
  privateKey?: string;
  subject?: string;
};

export default registerAs<WebPushConfig>('webPush', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    publicKey: process.env.WEB_PUSH_VAPID_PUBLIC_KEY?.trim() || undefined,
    privateKey: process.env.WEB_PUSH_VAPID_PRIVATE_KEY?.trim() || undefined,
    subject:
      process.env.WEB_PUSH_VAPID_SUBJECT?.trim() ||
      'mailto:support@dealrstack.com',
  };
});
