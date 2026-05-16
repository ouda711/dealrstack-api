import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsInt } from 'class-validator';

export class ReorderSalesPipelineStagesDto {
  @ApiProperty({
    type: [Number],
    example: [3, 1, 2, 4],
    description:
      'Ordered list of stage IDs as they should appear left-to-right on the board.',
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  stageIds: number[];
}
