import type { AiConfig, AiTextProviderId } from './config/ai-config.type';

export function normalizeTextProvider(value?: string): AiTextProviderId {
  const v = (value || 'deepseek').toLowerCase().trim();
  if (v === 'openai' || v === 'gemini' || v === 'deepseek') {
    return v;
  }
  return 'deepseek';
}

export function firstNonEmptyTrimmed(
  ...values: (string | undefined)[]
): string | undefined {
  for (const value of values) {
    const v = value?.trim();
    if (v) {
      return v;
    }
  }
  return undefined;
}

/**
 * If the configured primary has no API key, use the first provider that does
 * (DeepSeek → OpenAI → Gemini).
 */
export function resolveEffectiveTextPrimary(
  requested: AiTextProviderId,
  available: Record<AiTextProviderId, boolean>,
): AiTextProviderId {
  if (available[requested]) {
    return requested;
  }
  const preference: AiTextProviderId[] = ['deepseek', 'openai', 'gemini'];
  for (const id of preference) {
    if (available[id]) {
      return id;
    }
  }
  return requested;
}

export function stripUndefinedEmptyPartial<T extends object>(
  partial: Partial<T>,
): Partial<T> {
  const entries = Object.entries(partial).filter(([, v]) => {
    if (v === undefined || v === null) {
      return false;
    }
    if (typeof v === 'string' && v.trim() === '') {
      return false;
    }
    return true;
  });
  return Object.fromEntries(entries) as Partial<T>;
}

export function mergeAiConfigLayers(
  base: AiConfig,
  overlay: Partial<AiConfig>,
): AiConfig {
  const merged: AiConfig = {
    ...base,
    ...stripUndefinedEmptyPartial(overlay),
  };
  merged.textPrimaryProvider = resolveEffectiveTextPrimary(
    normalizeTextProvider(merged.textPrimaryProvider),
    {
      deepseek: Boolean(merged.deepseekApiKey),
      openai: Boolean(merged.openaiApiKey),
      gemini: Boolean(merged.geminiApiKey),
    },
  );
  return merged;
}
