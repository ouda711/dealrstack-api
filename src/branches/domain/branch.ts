import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Tenant } from '../../tenants/domain/tenant';
import { User } from '../../users/domain/user';

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
    type: () => User,
    description:
      'User assigned as the manager for this branch. The user must be an active member of the same tenant.',
  })
  manager?: Pick<User, 'id' | 'email' | 'firstName' | 'lastName'> | null;

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
