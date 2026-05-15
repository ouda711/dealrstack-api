import { registerAs } from '@nestjs/config';
import validateConfig from '../../utils/validate-config';
import { IsIn, IsOptional, IsString, IsUrl } from 'class-validator';
import {
  firstNonEmptyTrimmed,
  normalizeTextProvider,
  resolveEffectiveTextPrimary,
} from '../ai-config.helpers';
import { AiConfig, AiImageProviderId } from './ai-config.type';

class EnvironmentVariablesValidator {
  @IsOptional()
  @IsString()
  AI_TEXT_PRIMARY_PROVIDER?: string;

  @IsOptional()
  @IsString()
  DEEPSEEK_API_KEY?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  DEEPSEEK_BASE_URL?: string;

  @IsOptional()
  @IsString()
  DEEPSEEK_MODEL?: string;

  @IsOptional()
  @IsString()
  OPENAI_API_KEY?: string;

  /** Alias for OPENAI_API_KEY (common in local .env). */
  @IsOptional()
  @IsString()
  OPEN_AI?: string;

  @IsOptional()
  @IsString()
  OPEN_AI_API_KEY?: string;

  @IsOptional()
  @IsString()
  OPENAI_MODEL?: string;

  @IsOptional()
  @IsString()
  OPEN_AI_MODEL?: string;

  @IsOptional()
  @IsString()
  GEMINI_API_KEY?: string;

  @IsOptional()
  @IsString()
  GEMINI_MODEL?: string;

  @IsOptional()
  @IsString()
  GEMINI_IMAGE_MODEL?: string;

  @IsOptional()
  @IsIn(['gemini', 'openai'])
  AI_IMAGE_PRIMARY_PROVIDER?: AiImageProviderId;

  @IsOptional()
  @IsString()
  OPENAI_IMAGE_MODEL?: string;
}

export default registerAs<AiConfig>('ai', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  const deepseekApiKey = firstNonEmptyTrimmed(process.env.DEEPSEEK_API_KEY);
  const openaiApiKey = firstNonEmptyTrimmed(
    process.env.OPENAI_API_KEY,
    process.env.OPEN_AI_API_KEY,
    process.env.OPEN_AI,
  );
  const geminiApiKey = firstNonEmptyTrimmed(process.env.GEMINI_API_KEY);

  const requestedPrimary = normalizeTextProvider(
    process.env.AI_TEXT_PRIMARY_PROVIDER,
  );
  const textPrimaryProvider = resolveEffectiveTextPrimary(requestedPrimary, {
    deepseek: Boolean(deepseekApiKey),
    openai: Boolean(openaiApiKey),
    gemini: Boolean(geminiApiKey),
  });

  return {
    textPrimaryProvider,
    deepseekApiKey,
    deepseekBaseUrl: (
      process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com'
    ).replace(/\/$/, ''),
    deepseekModel:
      firstNonEmptyTrimmed(process.env.DEEPSEEK_MODEL) ?? 'deepseek-chat',
    openaiApiKey,
    openaiModel:
      firstNonEmptyTrimmed(
        process.env.OPENAI_MODEL,
        process.env.OPEN_AI_MODEL,
      ) ?? 'gpt-4o-mini',
    geminiApiKey,
    geminiModel:
      firstNonEmptyTrimmed(process.env.GEMINI_MODEL) ?? 'gemini-2.0-flash',
    geminiImageModel:
      firstNonEmptyTrimmed(process.env.GEMINI_IMAGE_MODEL) ??
      'gemini-2.5-flash-image',
    imagePrimaryProvider:
      (process.env.AI_IMAGE_PRIMARY_PROVIDER as AiImageProviderId) === 'openai'
        ? 'openai'
        : 'gemini',
    openaiImageModel: process.env.OPENAI_IMAGE_MODEL || 'dall-e-3',
  };
});
