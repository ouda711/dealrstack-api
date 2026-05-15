import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class UpsertSettingDto {
  @ApiProperty({
    description:
      'JSON payload stored as-is (e.g. settlement services map or ai_config blob).',
    type: 'object',
    additionalProperties: true,
    example: {
      deepseek: { apiKey: '…', model: 'deepseek-chat' },
      openai: { apiKey: '…', model: 'gpt-4o-mini' },
      gemini: { apiKey: '…', imageModel: 'gemini-2.5-flash-image' },
      textPrimaryProvider: 'deepseek',
    },
  })
  @IsObject()
  value: Record<string, unknown>;
}
