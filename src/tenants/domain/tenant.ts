import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Tenant {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({
    example: 'Nairobi Auto Hub',
    type: String,
  })
  name: string;

  @ApiProperty({
    example: 'nairobi-auto-hub',
    type: String,
  })
  slug: string;

  @ApiProperty({
    example: 'KE',
    type: String,
  })
  country: string;

  @ApiProperty({
    example: 'Africa/Nairobi',
    type: String,
  })
  timezone: string;

  @ApiProperty({
    example: 'KES',
    type: String,
  })
  currency: string;

  @ApiPropertyOptional({
    example: '+254700000000',
    type: String,
  })
  phone?: string | null;

  @ApiPropertyOptional({
    example: 'sales@nairobi-auto-hub.co.ke',
    type: String,
  })
  email?: string | null;

  @ApiPropertyOptional({
    example: 'https://nairobi-auto-hub.co.ke',
    type: String,
  })
  website?: string | null;

  @ApiProperty({
    example: true,
    type: Boolean,
  })
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
