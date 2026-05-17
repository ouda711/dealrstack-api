import request from 'supertest';
import {
  APP_URL,
  TENANT_ADMIN_EMAIL,
  TENANT_ADMIN_PASSWORD,
} from '../utils/constants';

describe('Sales workspace smoke', () => {
  const app = APP_URL;
  let tenantAdminToken: string;
  let tenantId: number;
  const smokePhone = `+2547${Date.now().toString().slice(-8)}`;

  const workspaceHeaders = () => ({
    'x-tenant-id': String(tenantId),
    Authorization: `Bearer ${tenantAdminToken}`,
  });

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
        tenantId = body.user.access.tenantMemberships.find(
          (membership: { tenant: { slug: string } }) =>
            membership.tenant.slug === 'nairobi-auto-hub',
        )?.tenant.id;
      });
  });

  it('should load the sales workspace snapshot', async () => {
    await request(app)
      .get(`/api/v1/tenants/${tenantId}/sales-workspace`)
      .set(workspaceHeaders())
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.leads)).toBe(true);
        expect(Array.isArray(body.deals)).toBe(true);
        expect(Array.isArray(body.conversations)).toBe(true);
        expect(Array.isArray(body.notifications)).toBe(true);
        expect(body.metrics).toBeDefined();
      });
  });

  it('should create a captured lead and return an updated workspace', async () => {
    await request(app)
      .post(`/api/v1/tenants/${tenantId}/sales-workspace/leads`)
      .set(workspaceHeaders())
      .send({
        source: 'website',
        customerName: 'Smoke Test Lead',
        customerPhone: smokePhone,
        interestSummary: 'E2E smoke test',
      })
      .expect(200)
      .then(({ body }) => {
        const lead = body.leads.find(
          (item: { customerPhone: string }) =>
            item.customerPhone === smokePhone,
        );
        expect(lead).toBeDefined();
        expect(lead.source).toBe('website');
      });
  });

  it('should evaluate assignment, follow-up, and escalation rules', async () => {
    await request(app)
      .post(
        `/api/v1/tenants/${tenantId}/sales-workspace/assignment-rules/evaluate`,
      )
      .set(workspaceHeaders())
      .expect(200);

    await request(app)
      .post(
        `/api/v1/tenants/${tenantId}/sales-workspace/follow-up-rules/evaluate`,
      )
      .set(workspaceHeaders())
      .expect(200);

    await request(app)
      .post(`/api/v1/tenants/${tenantId}/sales-workspace/escalation/evaluate`)
      .set(workspaceHeaders())
      .expect(200);
  });

  it('should accept a public website lead with capture token', async () => {
    const config = await request(app)
      .post(
        `/api/v1/tenants/${tenantId}/sales-workspace/lead-capture/regenerate-website-token`,
      )
      .set(workspaceHeaders())
      .expect(200);

    const token = config.body.websiteTokenMasked as string;
    const publicPhone = `+2547${(Date.now() + 1).toString().slice(-8)}`;

    await request(app)
      .post('/api/v1/public/tenants/nairobi-auto-hub/leads')
      .set('X-Lead-Capture-Token', token)
      .send({
        customerName: 'Public Web Lead',
        customerPhone: publicPhone,
        interestSummary: 'Website webhook smoke',
      })
      .expect(201);
  });

  it('should mark notifications read', async () => {
    const workspace = await request(app)
      .get(`/api/v1/tenants/${tenantId}/sales-workspace`)
      .set(workspaceHeaders())
      .expect(200);

    const unread = workspace.body.notifications.find(
      (notification: { read: boolean }) => !notification.read,
    );

    if (!unread) {
      return;
    }

    await request(app)
      .patch(
        `/api/v1/tenants/${tenantId}/sales-workspace/notifications/${unread.id}/read`,
      )
      .set(workspaceHeaders())
      .expect(200)
      .then(({ body }) => {
        const updated = body.notifications.find(
          (notification: { id: number }) => notification.id === unread.id,
        );
        expect(updated?.read).toBe(true);
      });
  });
});
