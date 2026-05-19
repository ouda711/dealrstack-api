import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';
import validateConfig from '../../utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  GOOGLE_CALENDAR_REDIRECT_URI?: string;
}

export type GoogleCalendarConfig = {
  redirectUri?: string;
};

export default registerAs<GoogleCalendarConfig>('googleCalendar', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    redirectUri: process.env.GOOGLE_CALENDAR_REDIRECT_URI,
  };
});
