import { ApiProperty } from '@nestjs/swagger';

export class SettingResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: 'object', additionalProperties: true })
  value: Record<string, unknown>;

  @ApiProperty()
  updatedAt: Date;
}
