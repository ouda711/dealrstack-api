import request from 'supertest';
import { ADMIN_EMAIL, ADMIN_PASSWORD, APP_URL } from '../utils/constants';

describe('Access Module', () => {
  const app = APP_URL;
  let apiToken: string;
  let tenantId: number;
  let superAdminRoleId: number;

  beforeAll(async () => {
    await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .then(({ body }) => {
        apiToken = body.token;
      });

    await request(app)
      .get('/api/v1/tenants')
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200)
      .then(({ body }) => {
        tenantId = body.data.find(
          (tenant) => tenant.slug === 'nairobi-auto-hub',
        )?.id;
      });
  });

  it('should list broad permission catalog entries', () => {
    return request(app)
      .get('/api/v1/access/permissions')
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        const permissionKeys = body.map((permission) => permission.key);
        expect(permissionKeys).toContain('platform.manage');
        expect(permissionKeys).toContain('tenants.manage');
        expect(permissionKeys).toContain('branches.manage-all');
        expect(permissionKeys).toContain('leads.manage');
        expect(permissionKeys).toContain('rentals.manage');
        expect(permissionKeys).toContain('auctions.manage');
      });
  });

  it('should list platform and tenant roles for a workspace', () => {
    return request(app)
      .get(`/api/v1/access/roles?tenantId=${tenantId}`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        const roleKeys = body.map((role) => role.key);
        const superAdmin = body.find((role) => role.key === 'super-admin');
        const owner = body.find((role) => role.key === 'owner');
        const tenantAdmin = body.find((role) => role.key === 'tenant-admin');

        superAdminRoleId = superAdmin.id;

        expect(superAdmin?.name).toBe('Super Admin');
        expect(superAdmin?.scope).toBe('platform');
        expect(owner?.name).toBe('Owner');
        expect(owner?.scope).toBe('tenant');
        expect(tenantAdmin?.name).toBe('Tenant Admin');
        expect(tenantAdmin?.scope).toBe('tenant');
        expect(roleKeys).toContain('super-admin');
        expect(roleKeys).toContain('owner');
        expect(roleKeys).toContain('tenant-admin');
        expect(roleKeys).toContain('salesperson');
        expect(roleKeys).toContain('rental-agent');
        expect(roleKeys).toContain('driver');
      });
  });

  it('should keep the super admin role limited to the platform owner permission', () => {
    return request(app)
      .get(`/api/v1/access/roles/${superAdminRoleId}/permissions`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.map((permission) => permission.key)).toEqual([
          'platform.manage',
        ]);
      });
  });

  it('should list seeded tenant memberships', () => {
    return request(app)
      .get(`/api/v1/access/tenants/${tenantId}/memberships`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        const memberEmails = body.map((membership) => membership.user.email);
        expect(memberEmails).toContain('admin@dealrstack.com');
        expect(memberEmails).toContain('sales@dealrstack.com');
      });
  });
});
