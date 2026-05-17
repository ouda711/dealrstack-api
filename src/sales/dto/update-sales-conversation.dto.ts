import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateSalesConversationDto {
  @ApiPropertyOptional({ example: 'Customer prefers Saturday test drive' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  internalNotes?: string | null;
}
