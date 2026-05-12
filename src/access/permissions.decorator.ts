import { SetMetadata } from '@nestjs/common';

export const ACCESS_PERMISSIONS_KEY = 'access_permissions';

export const RequirePermissions = (...permissions: string[]) =>
  SetMetadata(ACCESS_PERMISSIONS_KEY, permissions);
