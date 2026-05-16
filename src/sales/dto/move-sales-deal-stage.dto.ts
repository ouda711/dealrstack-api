import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class MoveSalesDealStageDto {
  @ApiProperty({ example: 'negotiation' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  stageKey: string;
}
