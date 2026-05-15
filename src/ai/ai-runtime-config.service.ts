import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
import { mergeAiConfigLayers } from './ai-config.helpers';
import { normalizeAiConfigDbOverlay } from './ai-config-db.overlay';
import type { AiConfig } from './config/ai-config.type';
import { SettingsService } from '../settings/settings.service';
import { SETTING_AI_CONFIG } from '../settings/settings.constants';

/**
 * Env defines defaults / dev overrides; DB row `ai_config` overlays secrets and models.
 */
@Injectable()
export class AiRuntimeConfigService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly settingsService: SettingsService,
  ) {}

  async getAiConfig(): Promise<AiConfig> {
    const base = this.configService.getOrThrow('ai', { infer: true });
    const raw =
      await this.settingsService.getCachedJson<unknown>(SETTING_AI_CONFIG);
    const overlay = normalizeAiConfigDbOverlay(raw);
    return mergeAiConfigLayers(base, overlay);
  }
}
