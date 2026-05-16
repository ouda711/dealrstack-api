import request from 'supertest';
import {
  APP_URL,
  TENANT_ADMIN_EMAIL,
  TENANT_ADMIN_PASSWORD,
} from '../utils/constants';

describe('Sales pipeline', () => {
  const app = APP_URL;
  let tenantAdminToken: string;
  let nairobiTenantId: number;
  let westlandsBranchId: number;

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
          (membership: { tenant: { slug: string } }) =>
            membership.tenant.slug === 'nairobi-auto-hub',
        )?.tenant.id;
      });

    await request(app)
      .get(`/api/v1/tenants/${nairobiTenantId}/branches`)
      .set('x-tenant-id', String(nairobiTenantId))
      .auth(tenantAdminToken, { type: 'bearer' })
      .expect(200)
      .then(({ body }) => {
        westlandsBranchId = body.find(
          (branch: { code: string }) => branch.code === 'WST',
        )?.id;
      });
  });

  it('should return the default template for a tenant on first access', async () => {
    await request(app)
      .get(`/api/v1/tenants/${nairobiTenantId}/sales-pipeline`)
      .set('x-tenant-id', String(nairobiTenantId))
      .auth(tenantAdminToken, { type: 'bearer' })
      .expect(200)
      .then(({ body }) => {
        expect(body.scope).toBe('tenant');
        expect(body.inherited).toBe(false);
        expect(body.stages).toHaveLength(8);
        expect(
          body.stages.map((stage: { stageKey: string }) => stage.stageKey),
        ).toEqual(
          expect.arrayContaining([
            'new_lead',
            'contacted',
            'interested',
            'test_drive',
            'negotiation',
            'deposit_paid',
            'sold',
            'lost',
          ]),
        );
      });
  });

  it('should rename a stage and reorder sections for a tenant', async () => {
    const initial = await request(app)
      .get(`/api/v1/tenants/${nairobiTenantId}/sales-pipeline`)
      .set('x-tenant-id', String(nairobiTenantId))
      .auth(tenantAdminToken, { type: 'bearer' })
      .expect(200);

    const contactedStage = initial.body.stages.find(
      (stage: { stageKey: string }) => stage.stageKey === 'contacted',
    );

    await request(app)
      .patch(
        `/api/v1/tenants/${nairobiTenantId}/sales-pipeline/stages/${contactedStage.id}`,
      )
      .set('x-tenant-id', String(nairobiTenantId))
      .auth(tenantAdminToken, { type: 'bearer' })
      .send({ label: 'First Contact' })
      .expect(200)
      .then(({ body }) => {
        const renamed = body.stages.find(
          (stage: { stageKey: string }) => stage.stageKey === 'contacted',
        );
        expect(renamed.label).toBe('First Contact');
      });

    const reorderedIds = [...initial.body.stages]
      .reverse()
      .map((stage: { id: number }) => stage.id);

    await request(app)
      .put(`/api/v1/tenants/${nairobiTenantId}/sales-pipeline/stages/reorder`)
      .set('x-tenant-id', String(nairobiTenantId))
      .auth(tenantAdminToken, { type: 'bearer' })
      .send({ stageIds: reorderedIds })
      .expect(200)
      .then(({ body }) => {
        expect(body.stages.map((stage: { id: number }) => stage.id)).toEqual(
          reorderedIds,
        );
      });
  });

  it('should fork a branch pipeline when customized', async () => {
    const tenantPipeline = await request(app)
      .get(`/api/v1/tenants/${nairobiTenantId}/sales-pipeline`)
      .set('x-tenant-id', String(nairobiTenantId))
      .auth(tenantAdminToken, { type: 'bearer' })
      .expect(200);

    const inherited = await request(app)
      .get(
        `/api/v1/tenants/${nairobiTenantId}/sales-pipeline?branchId=${westlandsBranchId}`,
      )
      .set('x-tenant-id', String(nairobiTenantId))
      .auth(tenantAdminToken, { type: 'bearer' })
      .expect(200);

    expect(inherited.body.inherited).toBe(true);

    const testDriveStage = tenantPipeline.body.stages.find(
      (stage: { stageKey: string }) => stage.stageKey === 'test_drive',
    );

    await request(app)
      .delete(
        `/api/v1/tenants/${nairobiTenantId}/sales-pipeline/stages/${testDriveStage.id}?branchId=${westlandsBranchId}`,
      )
      .set('x-tenant-id', String(nairobiTenantId))
      .auth(tenantAdminToken, { type: 'bearer' })
      .expect(200)
      .then(({ body }) => {
        expect(body.scope).toBe('branch');
        expect(body.inherited).toBe(false);
        expect(body.stages).toHaveLength(7);
        expect(
          body.stages.some(
            (stage: { stageKey: string }) => stage.stageKey === 'test_drive',
          ),
        ).toBe(false);
      });

    const tenantAfter = await request(app)
      .get(`/api/v1/tenants/${nairobiTenantId}/sales-pipeline`)
      .set('x-tenant-id', String(nairobiTenantId))
      .auth(tenantAdminToken, { type: 'bearer' })
      .expect(200);

    expect(tenantAfter.body.stages).toHaveLength(8);
  });
});
