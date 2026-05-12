import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT access token for authenticated API requests.',
  })
  token: string;

  @ApiProperty({
    description: 'JWT refresh token used to rotate access tokens.',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Access token expiration timestamp in milliseconds.',
  })
  tokenExpires: number;

  @ApiProperty({
    type: () => User,
    description:
      'Authenticated user including server-computed access context. Users can belong to multiple tenants with different roles and permissions.',
  })
  user: User;
}
