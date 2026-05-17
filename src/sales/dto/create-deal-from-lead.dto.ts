import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateDealFromLeadDto {
  @ApiPropertyOptional({ example: 'new_lead' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  stageKey?: string;

  @ApiPropertyOptional({ example: 'Harrier inquiry — James Mwangi' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string;
}
