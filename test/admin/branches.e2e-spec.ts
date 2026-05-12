import request from 'supertest';
import {
  APP_URL,
  TENANT_ADMIN_EMAIL,
  TENANT_ADMIN_PASSWORD,
  TESTER_EMAIL,
  TESTER_PASSWORD,
} from '../utils/constants';

describe('Branches Module', () => {
  const app = APP_URL;
  let tenantAdminToken: string;
  let salespersonToken: string;
  let nairobiTenantId: number;
  let mombasaTenantId: number;

  beforeAll(async () => {
    await request(app)
      .post('/api/v1/auth/email/login')
      .send({
        email: TENANT_ADMIN_EMAIL,
        password: TENANT_ADMIN_PASSWORD,
        tenantId: 1,
      })
      .expect(200)
      .then(({ body }) => {
        tenantAdminToken = body.token;
        nairobiTenantId = body.user.access.tenantMemberships.find(
          (membership) => membership.tenant.slug === 'nairobi-auto-hub',
        )?.tenant.id;
        mombasaTenantId = body.user.access.tenantMemberships.find(
          (membership) => membership.tenant.slug === 'mombasa-motors-yard',
        )?.tenant.id;
      });

    await request(app)
      .post('/api/v1/auth/email/login')
      .send({
        email: TESTER_EMAIL,
        password: TESTER_PASSWORD,
        tenantId: 1,
      })
      .expect(200)
      .then(({ body }) => {
        salespersonToken = body.token;
      });
  });

  it('should list seeded branches for the selected tenant', () => {
    return request(app)
      .get(`/api/v1/tenants/${nairobiTenantId}/branches`)
      .set('x-tenant-id', String(nairobiTenantId))
      .auth(tenantAdminToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        const branchCodes = body.map((branch) => branch.code);
        const westlandsBranch = body.find((branch) => branch.code === 'WST');

        expect(branchCodes).toEqual(expect.arrayContaining(['WST', 'MBR']));
        expect(
          body.every((branch) => branch.tenant.id === nairobiTenantId),
        ).toBe(true);
        expect(westlandsBranch.managerName).toBe('Grace Wanjiku');
        expect(westlandsBranch.openingHours).toContain('Mon-Sat');
      });
  });

  it('should keep branch lists tenant-scoped', () => {
    return request(app)
      .get(`/api/v1/tenants/${mombasaTenantId}/branches`)
      .set('x-tenant-id', String(mombasaTenantId))
      .auth(tenantAdminToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        const branchCodes = body.map((branch) => branch.code);

        expect(branchCodes).toEqual(expect.arrayContaining(['NYL', 'TDR']));
        expect(branchCodes).not.toContain('WST');
      });
  });

  it('should create a branch for a tenant manager context', async () => {
    const branchCode = `KLM-${Date.now()}`;

    return request(app)
      .post(`/api/v1/tenants/${nairobiTenantId}/branches`)
      .set('x-tenant-id', String(nairobiTenantId))
      .auth(tenantAdminToken, {
        type: 'bearer',
      })
      .send({
        name: 'Kilimani Test Branch',
        code: branchCode,
        city: 'Nairobi',
        address: 'Argwings Kodhek Road, Kilimani',
        phone: '+254700000301',
        managerName: 'Mercy Njeri',
        managerPhone: '+254700000302',
        managerEmail: 'mercy@nairobi-auto-hub.co.ke',
        openingHours: 'Mon-Sat, 9:00 AM - 6:00 PM',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body.code).toBe(branchCode);
        expect(body.tenant.id).toBe(nairobiTenantId);
        expect(body.managerName).toBe('Mercy Njeri');
        expect(body.openingHours).toContain('9:00 AM');
      });
  });

  it('should reject duplicate branch codes within the same tenant', () => {
    return request(app)
      .post(`/api/v1/tenants/${nairobiTenantId}/branches`)
      .set('x-tenant-id', String(nairobiTenantId))
      .auth(tenantAdminToken, {
        type: 'bearer',
      })
      .send({
        name: 'Duplicate Westlands',
        code: 'WST',
        city: 'Nairobi',
      })
      .expect(422)
      .expect(({ body }) => {
        expect(body.errors.code).toBe('branchCodeAlreadyExists');
      });
  });

  it('should block users without settings.manage from managing branches', () => {
    return request(app)
      .get(`/api/v1/tenants/${nairobiTenantId}/branches`)
      .set('x-tenant-id', String(nairobiTenantId))
      .auth(salespersonToken, {
        type: 'bearer',
      })
      .expect(403);
  });
});
