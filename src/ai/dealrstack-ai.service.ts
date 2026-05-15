import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import type { AiConfig, AiTextProviderId } from './config/ai-config.type';
import { AiRuntimeConfigService } from './ai-runtime-config.service';

function ensureOpenAiBaseUrl(baseUrl: string): string {
  const trimmed = baseUrl.replace(/\/$/, '');
  if (trimmed.endsWith('/v1')) {
    return trimmed;
  }
  return `${trimmed}/v1`;
}

@Injectable()
export class DealrstackAiService {
  private readonly logger = new Logger(DealrstackAiService.name);

  constructor(private readonly aiRuntimeConfig: AiRuntimeConfigService) {}

  /**
   * Streams marketing copy tokens via callback. Provider order starts with the
   * effective primary from merged env + DB settings, then remaining providers.
   */
  async streamMarketingCopy(
    systemPrompt: string,
    userPrompt: string,
    onDelta: (text: string) => void,
  ): Promise<{ provider: AiTextProviderId; fullText: string } | null> {
    const ai = await this.aiRuntimeConfig.getAiConfig();
    const order = this.textProviderOrder(ai);
    for (const provider of order) {
      if (!this.hasTextCredentials(provider, ai)) {
        continue;
      }
      try {
        const fullText = await this.streamWithProvider(
          ai,
          provider,
          systemPrompt,
          userPrompt,
          onDelta,
        );
        if (fullText.trim()) {
          return { provider, fullText: fullText.trim() };
        }
      } catch (err) {
        this.logger.warn(
          {
            provider,
            message: err instanceof Error ? err.message : String(err),
          },
          'AI streaming provider failed; trying next',
        );
      }
    }
    return null;
  }

  private textProviderOrder(ai: AiConfig): AiTextProviderId[] {
    const primary = ai.textPrimaryProvider;
    const all = ['deepseek', 'openai', 'gemini'] as const;
    return [primary, ...all.filter((p) => p !== primary)];
  }

  private hasTextCredentials(
    provider: AiTextProviderId,
    ai: AiConfig,
  ): boolean {
    switch (provider) {
      case 'deepseek':
        return Boolean(ai.deepseekApiKey);
      case 'openai':
        return Boolean(ai.openaiApiKey);
      case 'gemini':
        return Boolean(ai.geminiApiKey);
      default:
        return false;
    }
  }

  private async streamWithProvider(
    ai: AiConfig,
    provider: AiTextProviderId,
    system: string,
    user: string,
    onDelta: (text: string) => void,
  ): Promise<string> {
    if (provider === 'deepseek') {
      const client = new OpenAI({
        apiKey: ai.deepseekApiKey,
        baseURL: ensureOpenAiBaseUrl(ai.deepseekBaseUrl),
      });
      return this.streamOpenAiChat(
        client,
        ai.deepseekModel,
        system,
        user,
        onDelta,
      );
    }
    if (provider === 'openai') {
      const client = new OpenAI({ apiKey: ai.openaiApiKey });
      return this.streamOpenAiChat(
        client,
        ai.openaiModel,
        system,
        user,
        onDelta,
      );
    }
    return this.streamGeminiChat(
      ai.geminiApiKey!,
      ai.geminiModel,
      system,
      user,
      onDelta,
    );
  }

  private async streamOpenAiChat(
    client: OpenAI,
    model: string,
    system: string,
    user: string,
    onDelta: (text: string) => void,
  ): Promise<string> {
    const stream = await client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.7,
      stream: true,
    });

    let full = '';
    for await (const chunk of stream) {
      const piece = chunk.choices[0]?.delta?.content ?? '';
      if (piece) {
        full += piece;
        onDelta(piece);
      }
    }
    return full;
  }

  private async streamGeminiChat(
    apiKey: string,
    model: string,
    system: string,
    user: string,
    onDelta: (text: string) => void,
  ): Promise<string> {
    const genAI = new GoogleGenerativeAI(apiKey);
    const genModel = genAI.getGenerativeModel({ model });
    const prompt = `${system}\n\n---\n\n${user}`;
    const { stream } = await genModel.generateContentStream(prompt);

    let aggregated = '';
    for await (const chunk of stream) {
      let piece = '';
      try {
        piece = chunk.text();
      } catch {
        continue;
      }
      if (!piece) {
        continue;
      }
      let delta = piece;
      if (aggregated && piece.startsWith(aggregated)) {
        delta = piece.slice(aggregated.length);
        aggregated = piece;
      } else {
        aggregated += piece;
      }
      if (delta) {
        onDelta(delta);
      }
    }
    return aggregated;
  }
}
