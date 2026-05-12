import request from 'supertest';
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  APP_URL,
  TENANT_ADMIN_EMAIL,
  TENANT_ADMIN_PASSWORD,
} from '../utils/constants';

describe('Auth', () => {
  const app = APP_URL;

  describe('Admin', () => {
    it('should successfully login via /api/v1/auth/email/login (POST)', () => {
      return request(app)
        .post('/api/v1/auth/email/login')
        .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
        .expect(200)
        .expect(({ body }) => {
          expect(body.token).toBeDefined();
          expect(body.user.email).toBeDefined();
          expect(body.user.role).toBeDefined();
          expect(
            body.user.access.permissions.map((permission) => permission.key),
          ).toContain('platform.manage');
          expect(body.user.access.tenantMemberships.length).toBeGreaterThan(0);
          expect(body.user.access.currentTenant.slug).toBe('nairobi-auto-hub');
        });
    });

    it('should return access context for the requested current tenant', async () => {
      const loginResponse = await request(app)
        .post('/api/v1/auth/email/login')
        .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
        .expect(200);
      const tenantId = loginResponse.body.user.access.currentTenant.id;

      return request(app)
        .get('/api/v1/auth/me')
        .set('x-tenant-id', String(tenantId))
        .auth(loginResponse.body.token, {
          type: 'bearer',
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.access.currentTenant.id).toBe(tenantId);
          expect(body.access.currentTenantRole.key).toBe('owner');
          expect(
            body.access.permissions.map((permission) => permission.key),
          ).toContain('team.manage');
        });
    });
  });

  describe('Tenant admin', () => {
    it('should not guess current tenant when the user belongs to multiple tenants', () => {
      return request(app)
        .post('/api/v1/auth/email/login')
        .send({
          email: TENANT_ADMIN_EMAIL,
          password: TENANT_ADMIN_PASSWORD,
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.user.email).toBe(TENANT_ADMIN_EMAIL);
          expect(body.user.access.currentTenant).toBeNull();
          expect(body.user.access.currentTenantRole).toBeNull();
          expect(body.user.access.tenantMemberships).toHaveLength(2);
          expect(
            body.user.access.tenantMemberships.map(
              (membership) => membership.role.key,
            ),
          ).toEqual(expect.arrayContaining(['tenant-admin', 'manager']));
        });
    });

    it('should return tenant-admin permissions for the selected tenant', async () => {
      const tenantAccessResponse = await request(app)
        .post('/api/v1/auth/email/login')
        .send({
          email: TENANT_ADMIN_EMAIL,
          password: TENANT_ADMIN_PASSWORD,
        })
        .expect(200);
      const nairobiMembership =
        tenantAccessResponse.body.user.access.tenantMemberships.find(
          (membership) => membership.tenant.slug === 'nairobi-auto-hub',
        );

      return request(app)
        .post('/api/v1/auth/email/login')
        .send({
          email: TENANT_ADMIN_EMAIL,
          password: TENANT_ADMIN_PASSWORD,
          tenantId: nairobiMembership.tenant.id,
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.user.access.currentTenant.slug).toBe('nairobi-auto-hub');
          expect(body.user.access.currentTenantRole.key).toBe('tenant-admin');
          expect(
            body.user.access.permissions.map((permission) => permission.key),
          ).toEqual(expect.arrayContaining(['team.manage', 'settings.manage']));
          expect(
            body.user.access.permissions.map((permission) => permission.key),
          ).not.toContain('platform.manage');
        });
    });
  });
});
