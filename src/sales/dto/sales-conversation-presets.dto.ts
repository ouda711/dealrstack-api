import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ConversationTemplatePresetDto } from './conversation-template-preset.dto';

export class SalesConversationPresetsDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @MaxLength(500, { each: true })
  quickReplies: string[];

  @ApiProperty({ type: [ConversationTemplatePresetDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ConversationTemplatePresetDto)
  templates: ConversationTemplatePresetDto[];
}
