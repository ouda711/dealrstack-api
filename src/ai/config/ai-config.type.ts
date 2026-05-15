export type AiTextProviderId = 'deepseek' | 'openai' | 'gemini';

export type AiImageProviderId = 'gemini' | 'openai';

export type AiConfig = {
  /**
   * Primary LLM for marketing copy. If `AI_TEXT_PRIMARY_PROVIDER` points at a
   * provider with no API key (e.g. DeepSeek unset), this is the first provider
   * that has a key: DeepSeek → OpenAI → Gemini.
   */
  textPrimaryProvider: AiTextProviderId;
  deepseekApiKey?: string;
  deepseekBaseUrl: string;
  deepseekModel: string;
  openaiApiKey?: string;
  openaiModel: string;
  geminiApiKey?: string;
  geminiModel: string;
  geminiImageModel: string;
  /** Listing creatives: Gemini image first by default; OpenAI DALL·E when Gemini fails or is disabled. */
  imagePrimaryProvider: AiImageProviderId;
  openaiImageModel: string;
};
