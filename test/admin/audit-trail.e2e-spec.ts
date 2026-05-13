import request from 'supertest';
import {
  APP_URL,
  TENANT_ADMIN_EMAIL,
  TENANT_ADMIN_PASSWORD,
} from '../utils/constants';

describe('Audit Trail Module', () => {
  const app = APP_URL;
  let tenantAdminToken: string;
  let branchManagerToken: string;
  let tenantId: number;
  let branchId: number;

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
        tenantId = body.user.access.currentTenant.id;
      });

    await request(app)
      .post('/api/v1/auth/email/login')
      .send({
        email: 'grace@nairobi-auto-hub.co.ke',
        password: 'secret',
        tenantId,
      })
      .expect(200)
      .then(({ body }) => {
        branchManagerToken = body.token;
      });

    await request(app)
      .post(`/api/v1/tenants/${tenantId}/branches`)
      .set('x-tenant-id', String(tenantId))
      .auth(tenantAdminToken, {
        type: 'bearer',
      })
      .send({
        name: 'Audit Test Branch',
        code: `AUD-${Date.now()}`,
        city: 'Nairobi',
      })
      .expect(201)
      .then(({ body }) => {
        branchId = body.id;
      });
  });

  it('should record branch creation events for tenant admins', () => {
    return request(app)
      .get(`/api/v1/tenants/${tenantId}/audit-trail`)
      .set('x-tenant-id', String(tenantId))
      .auth(tenantAdminToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        const event = body.data.find(
          (auditEvent) =>
            auditEvent.action === 'CREATE_BRANCH' &&
            auditEvent.branch?.id === branchId,
        );

        expect(event).toBeDefined();
        expect(event.description).toContain('was created');
        expect(event.actor.email).toBe(TENANT_ADMIN_EMAIL);
        expect(event.occurredAt).toBeDefined();
      });
  });

  it('should record branch update descriptions', async () => {
    await request(app)
      .patch(`/api/v1/tenants/${tenantId}/branches/${branchId}`)
      .set('x-tenant-id', String(tenantId))
      .auth(tenantAdminToken, {
        type: 'bearer',
      })
      .send({
        openingHours: 'Mon-Fri, 9:00 AM - 5:00 PM',
      })
      .expect(200);

    return request(app)
      .get(`/api/v1/tenants/${tenantId}/audit-trail`)
      .set('x-tenant-id', String(tenantId))
      .auth(tenantAdminToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        const event = body.data.find(
          (auditEvent) =>
            auditEvent.action === 'UPDATE_BRANCH' &&
            auditEvent.branch?.id === branchId,
        );

        expect(event.description).toContain('operating hours changed');
      });
  });

  it('should scope branch managers to assigned branch audit events', () => {
    return request(app)
      .get(`/api/v1/tenants/${tenantId}/audit-trail`)
      .set('x-tenant-id', String(tenantId))
      .auth(branchManagerToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(
          body.data.every((auditEvent) => auditEvent.branch?.code === 'WST'),
        ).toBe(true);
      });
  });
});
