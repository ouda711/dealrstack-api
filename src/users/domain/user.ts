import { Exclude, Expose } from 'class-transformer';
import { FileType } from '../../files/domain/file';
import { Role } from '../../roles/domain/role';
import { Status } from '../../statuses/domain/status';
import { Tenant } from '../../tenants/domain/tenant';
import { ApiProperty } from '@nestjs/swagger';
import databaseConfig from '../../database/config/database.config';
import { DatabaseConfig } from '../../database/config/database-config.type';
import type { UserAccessContext } from '../../access/access.service';
import { UserAccessContextDto } from '../../access/dto/access-context.dto';

// <database-block>
const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;
// </database-block>

export class User {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: String,
    example: 'john.doe@example.com',
  })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Exclude({ toPlainOnly: true })
  password?: string;

  @ApiProperty({
    type: String,
    example: 'email',
  })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @ApiProperty({
    type: String,
    example: '1234567890',
  })
  @Expose({ groups: ['me', 'admin'] })
  socialId?: string | null;

  @ApiProperty({
    type: String,
    example: 'John',
  })
  firstName: string | null;

  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  lastName: string | null;

  @ApiProperty({
    type: () => FileType,
  })
  photo?: FileType | null;

  @ApiProperty({
    type: () => Role,
  })
  role?: Role | null;

  @ApiProperty({
    type: () => Status,
  })
  status?: Status;

  @ApiProperty({
    required: false,
    type: () => Tenant,
    description:
      'Last active tenant workspace used to restore tenant context on login.',
  })
  activeTenant?: {
    id: Tenant['id'];
    name?: Tenant['name'] | null;
    slug?: Tenant['slug'] | null;
  } | null;

  @ApiProperty({
    required: false,
    type: () => UserAccessContextDto,
    description:
      'Server-computed access context for platform and tenant permissions.',
  })
  access?: UserAccessContext;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
