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
        const fullText = await this.streamWithProviderSingleTurn(
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

  /**
   * Multi-turn chat used by flyer studio / threaded marketing assistants.
   */
  async streamMarketingConversation(
    systemPrompt: string,
    conversation: { role: 'user' | 'assistant'; content: string }[],
    onDelta: (text: string) => void,
  ): Promise<{ provider: AiTextProviderId; fullText: string } | null> {
    const ai = await this.aiRuntimeConfig.getAiConfig();
    const order = this.textProviderOrder(ai);
    for (const provider of order) {
      if (!this.hasTextCredentials(provider, ai)) {
        continue;
      }
      try {
        const fullText = await this.streamConversationWithProvider(
          ai,
          provider,
          systemPrompt,
          conversation,
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
          'AI conversation streaming provider failed; trying next',
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

  private async streamWithProviderSingleTurn(
    ai: AiConfig,
    provider: AiTextProviderId,
    system: string,
    user: string,
    onDelta: (text: string) => void,
  ): Promise<string> {
    return this.streamConversationWithProvider(
      ai,
      provider,
      system,
      [{ role: 'user', content: user }],
      onDelta,
    );
  }

  private async streamConversationWithProvider(
    ai: AiConfig,
    provider: AiTextProviderId,
    system: string,
    conversation: { role: 'user' | 'assistant'; content: string }[],
    onDelta: (text: string) => void,
  ): Promise<string> {
    if (provider === 'deepseek') {
      const client = new OpenAI({
        apiKey: ai.deepseekApiKey,
        baseURL: ensureOpenAiBaseUrl(ai.deepseekBaseUrl),
      });
      return this.streamOpenAiConversation(
        client,
        ai.deepseekModel,
        system,
        conversation,
        onDelta,
      );
    }
    if (provider === 'openai') {
      const client = new OpenAI({ apiKey: ai.openaiApiKey });
      return this.streamOpenAiConversation(
        client,
        ai.openaiModel,
        system,
        conversation,
        onDelta,
      );
    }
    return this.streamGeminiConversation(
      ai.geminiApiKey!,
      ai.geminiModel,
      system,
      conversation,
      onDelta,
    );
  }

  private async streamOpenAiConversation(
    client: OpenAI,
    model: string,
    system: string,
    conversation: { role: 'user' | 'assistant'; content: string }[],
    onDelta: (text: string) => void,
  ): Promise<string> {
    const stream = await client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: system },
        ...conversation.map((m) => ({
          role: m.role,
          content: m.content,
        })),
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

  private async streamGeminiConversation(
    apiKey: string,
    model: string,
    systemInstruction: string,
    conversation: { role: 'user' | 'assistant'; content: string }[],
    onDelta: (text: string) => void,
  ): Promise<string> {
    const genAI = new GoogleGenerativeAI(apiKey);
    const genModel = genAI.getGenerativeModel({
      model,
      systemInstruction,
    });

    if (conversation.length === 0) {
      return '';
    }

    const history = conversation.slice(0, -1).map((m) => ({
      role: m.role === 'user' ? ('user' as const) : ('model' as const),
      parts: [{ text: m.content }],
    }));

    const last = conversation[conversation.length - 1];
    if (last.role !== 'user') {
      throw new Error('Gemini conversation must end with a user turn');
    }

    const chat = genModel.startChat({ history });
    const result = await chat.sendMessageStream(last.content);

    let aggregated = '';
    for await (const chunk of result.stream) {
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
