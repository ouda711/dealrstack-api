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
  let branchManagerToken: string;
  let nairobiTenantId: number;
  let mombasaTenantId: number;
  let nairobiManagerId: number;
  let mombasaManagerId: number;
  let westlandsBranchId: number;
  let mombasaRoadBranchId: number;

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

    await request(app)
      .get(`/api/v1/tenants/${nairobiTenantId}/branches`)
      .set('x-tenant-id', String(nairobiTenantId))
      .auth(tenantAdminToken, {
        type: 'bearer',
      })
      .expect(200)
      .then(({ body }) => {
        const westlandsBranch = body.find((branch) => branch.code === 'WST');
        const mombasaRoadBranch = body.find((branch) => branch.code === 'MBR');

        nairobiManagerId = westlandsBranch?.manager?.id;
        westlandsBranchId = westlandsBranch?.id;
        mombasaRoadBranchId = mombasaRoadBranch?.id;
      });

    await request(app)
      .get(`/api/v1/tenants/${mombasaTenantId}/branches`)
      .set('x-tenant-id', String(mombasaTenantId))
      .auth(tenantAdminToken, {
        type: 'bearer',
      })
      .expect(200)
      .then(({ body }) => {
        mombasaManagerId = body.find((branch) => branch.code === 'NYL')?.manager
          ?.id;
      });

    await request(app)
      .post('/api/v1/auth/email/login')
      .send({
        email: 'grace@nairobi-auto-hub.co.ke',
        password: 'secret',
        tenantId: nairobiTenantId,
      })
      .expect(200)
      .then(({ body }) => {
        branchManagerToken = body.token;
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
        expect(westlandsBranch.manager.email).toBe(
          'grace@nairobi-auto-hub.co.ke',
        );
        expect(westlandsBranch.manager.firstName).toBe('Grace');
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
        managerId: nairobiManagerId,
        openingHours: 'Mon-Sat, 9:00 AM - 6:00 PM',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body.code).toBe(branchCode);
        expect(body.tenant.id).toBe(nairobiTenantId);
        expect(body.manager.id).toBe(nairobiManagerId);
        expect(body.openingHours).toContain('9:00 AM');
      });
  });

  it('should reject a manager outside the branch tenant', () => {
    return request(app)
      .post(`/api/v1/tenants/${nairobiTenantId}/branches`)
      .set('x-tenant-id', String(nairobiTenantId))
      .auth(tenantAdminToken, {
        type: 'bearer',
      })
      .send({
        name: 'Invalid Manager Branch',
        code: `BAD-${Date.now()}`,
        city: 'Nairobi',
        managerId: mombasaManagerId,
      })
      .expect(422)
      .expect(({ body }) => {
        expect(body.errors.managerId).toBe(
          'branchManagerMustBeActiveTenantMember',
        );
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

  it('should allow users with branch view access to list branches', () => {
    return request(app)
      .get(`/api/v1/tenants/${nairobiTenantId}/branches`)
      .set('x-tenant-id', String(nairobiTenantId))
      .auth(salespersonToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        const branchCodes = body.map((branch) => branch.code);

        expect(branchCodes).toEqual(expect.arrayContaining(['WST', 'MBR']));
      });
  });

  it('should block users with branch view access from managing branches', () => {
    return request(app)
      .post(`/api/v1/tenants/${nairobiTenantId}/branches`)
      .set('x-tenant-id', String(nairobiTenantId))
      .auth(salespersonToken, {
        type: 'bearer',
      })
      .send({
        name: 'Salesperson Managed Branch',
        code: `SLP-${Date.now()}`,
        city: 'Nairobi',
      })
      .expect(403);
  });

  it('should keep branch access scoped to the user tenant membership', () => {
    return request(app)
      .get(`/api/v1/tenants/${mombasaTenantId}/branches`)
      .set('x-tenant-id', String(mombasaTenantId))
      .auth(salespersonToken, {
        type: 'bearer',
      })
      .expect(403);
  });

  it('should allow branch managers to view all branches in their tenant overview', () => {
    return request(app)
      .get(`/api/v1/tenants/${nairobiTenantId}/branches`)
      .set('x-tenant-id', String(nairobiTenantId))
      .auth(branchManagerToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        const branchCodes = body.map((branch) => branch.code);

        expect(branchCodes).toEqual(expect.arrayContaining(['WST', 'MBR']));
      });
  });

  it('should allow branch managers to update their assigned branch', () => {
    return request(app)
      .patch(`/api/v1/tenants/${nairobiTenantId}/branches/${westlandsBranchId}`)
      .set('x-tenant-id', String(nairobiTenantId))
      .auth(branchManagerToken, {
        type: 'bearer',
      })
      .send({
        openingHours: 'Mon-Sat, 8:00 AM - 6:00 PM',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.id).toBe(westlandsBranchId);
        expect(body.openingHours).toBe('Mon-Sat, 8:00 AM - 6:00 PM');
      });
  });

  it('should block branch managers from updating another branch', () => {
    return request(app)
      .patch(
        `/api/v1/tenants/${nairobiTenantId}/branches/${mombasaRoadBranchId}`,
      )
      .set('x-tenant-id', String(nairobiTenantId))
      .auth(branchManagerToken, {
        type: 'bearer',
      })
      .send({
        openingHours: 'Mon-Sat, 8:00 AM - 6:00 PM',
      })
      .expect(403);
  });

  it('should block branch managers from creating branches', () => {
    return request(app)
      .post(`/api/v1/tenants/${nairobiTenantId}/branches`)
      .set('x-tenant-id', String(nairobiTenantId))
      .auth(branchManagerToken, {
        type: 'bearer',
      })
      .send({
        name: 'Branch Manager Created Branch',
        code: `BMG-${Date.now()}`,
        city: 'Nairobi',
      })
      .expect(403);
  });

  it('should block branch managers from deleting their assigned branch', () => {
    return request(app)
      .delete(
        `/api/v1/tenants/${nairobiTenantId}/branches/${westlandsBranchId}`,
      )
      .set('x-tenant-id', String(nairobiTenantId))
      .auth(branchManagerToken, {
        type: 'bearer',
      })
      .expect(403);
  });
});
