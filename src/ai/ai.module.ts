import { Module } from '@nestjs/common';
import { SettingsModule } from '../settings/settings.module';
import { AiRuntimeConfigService } from './ai-runtime-config.service';
import { DealrstackAiService } from './dealrstack-ai.service';

@Module({
  imports: [SettingsModule],
  providers: [AiRuntimeConfigService, DealrstackAiService],
  exports: [AiRuntimeConfigService, DealrstackAiService],
})
export class AiModule {}
