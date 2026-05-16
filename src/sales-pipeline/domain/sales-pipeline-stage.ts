import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SalesPipelineStage {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ example: 'new_lead', type: String })
  stageKey: string;

  @ApiProperty({ example: 'New Lead', type: String })
  label: string;

  @ApiProperty({ example: 0, type: Number })
  sortOrder: number;

  @ApiProperty({ example: 'default', type: String })
  color: string;

  @ApiProperty({ example: false, type: Boolean })
  isWonStage: boolean;

  @ApiProperty({ example: false, type: Boolean })
  isLostStage: boolean;

  @ApiPropertyOptional({ type: Date })
  deletedAt?: Date | null;
}
