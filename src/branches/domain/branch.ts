import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Tenant } from '../../tenants/domain/tenant';

export class Branch {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({
    type: () => Tenant,
  })
  tenant: {
    id: Tenant['id'];
    name?: Tenant['name'] | null;
    slug?: Tenant['slug'] | null;
  };

  @ApiProperty({
    example: 'Westlands Showroom',
    type: String,
  })
  name: string;

  @ApiProperty({
    example: 'WST',
    type: String,
  })
  code: string;

  @ApiProperty({
    example: 'Nairobi',
    type: String,
  })
  city: string;

  @ApiPropertyOptional({
    example: 'Waiyaki Way, Westlands',
    type: String,
  })
  address?: string | null;

  @ApiPropertyOptional({
    example: '+254700000101',
    type: String,
  })
  phone?: string | null;

  @ApiPropertyOptional({
    example: 'Grace Wanjiku',
    type: String,
  })
  managerName?: string | null;

  @ApiPropertyOptional({
    example: '+254700000111',
    type: String,
  })
  managerPhone?: string | null;

  @ApiPropertyOptional({
    example: 'grace@nairobi-auto-hub.co.ke',
    type: String,
  })
  managerEmail?: string | null;

  @ApiPropertyOptional({
    example: 'Mon-Sat, 8:30 AM - 6:00 PM',
    type: String,
  })
  openingHours?: string | null;

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
