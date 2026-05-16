import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsString,
  MaxLength,
} from 'class-validator';

export class ReorderSalesDealsDto {
  @ApiProperty({ example: 'negotiation' })
  @IsString()
  @MaxLength(50)
  stageKey: string;

  @ApiProperty({ type: [Number], example: [3, 1, 2] })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  dealIds: number[];
}
