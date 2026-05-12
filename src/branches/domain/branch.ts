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
