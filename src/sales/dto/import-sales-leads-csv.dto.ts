import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class ImportSalesLeadsCsvDto {
  @ApiProperty({
    example:
      'customerName,customerPhone,interestSummary\nJames Mwangi,+254712345678,Harrier inquiry',
    description:
      'CSV with header row: customerName, customerPhone, and optional interestSummary.',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(200_000)
  csv: string;
}
