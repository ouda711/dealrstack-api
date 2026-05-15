import type { AiConfig } from './config/ai-config.type';
import type { AiImageProviderId } from './config/ai-config.type';
import { normalizeTextProvider } from './ai-config.helpers';

function pickString(...vals: unknown[]): string | undefined {
  for (const v of vals) {
    if (typeof v === 'string') {
      const t = v.trim();
      if (t) {
        return t;
      }
    }
  }
  return undefined;
}

function readNestedString(obj: unknown, key: string): string | undefined {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return undefined;
  }
  return pickString((obj as Record<string, unknown>)[key]);
}

/** Flat + nested shapes for `settings.name = ai_config`. */
export function normalizeAiConfigDbOverlay(raw: unknown): Partial<AiConfig> {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return {};
  }

  const r = raw as Record<string, unknown>;
  const out: Partial<AiConfig> = {};

  const tp = pickString(r.textPrimaryProvider);
  if (tp) {
    out.textPrimaryProvider = normalizeTextProvider(tp);
  }

  const ip = pickString(r.imagePrimaryProvider);
  if (ip === 'gemini' || ip === 'openai') {
    out.imagePrimaryProvider = ip as AiImageProviderId;
  }

  out.deepseekApiKey = pickString(
    r.deepseekApiKey,
    readNestedString(r.deepseek, 'apiKey'),
  );
  out.deepseekBaseUrl = pickString(
    r.deepseekBaseUrl,
    readNestedString(r.deepseek, 'baseUrl'),
  );
  out.deepseekModel = pickString(
    r.deepseekModel,
    readNestedString(r.deepseek, 'model'),
  );

  out.openaiApiKey = pickString(
    r.openaiApiKey,
    readNestedString(r.openai, 'apiKey'),
  );
  out.openaiModel = pickString(
    r.openaiModel,
    readNestedString(r.openai, 'model'),
  );
  out.openaiImageModel = pickString(
    r.openaiImageModel,
    readNestedString(r.openai, 'imageModel'),
  );

  out.geminiApiKey = pickString(
    r.geminiApiKey,
    readNestedString(r.gemini, 'apiKey'),
  );
  out.geminiModel = pickString(
    r.geminiModel,
    readNestedString(r.gemini, 'model'),
  );
  out.geminiImageModel = pickString(
    r.geminiImageModel,
    readNestedString(r.gemini, 'imageModel'),
  );

  return out;
}
