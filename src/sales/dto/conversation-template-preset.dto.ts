import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class ConversationTemplatePresetDto {
  @ApiProperty({ example: 'Availability + price' })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  label: string;

  @ApiProperty({
    example:
      'Hello! Yes, this vehicle is still available at the listed price. Would you like to visit us for a viewing?',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  body: string;
}
