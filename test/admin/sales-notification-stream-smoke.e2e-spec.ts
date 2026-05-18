import request from 'supertest';
import {
  APP_URL,
  TENANT_ADMIN_EMAIL,
  TENANT_ADMIN_PASSWORD,
} from '../utils/constants';

describe('Sales notification stream smoke', () => {
  const app = APP_URL;
  let tenantAdminToken: string;
  let tenantId: number;

  const workspaceHeaders = (): Record<string, string> => ({
    'x-tenant-id': String(tenantId),
    Authorization: `Bearer ${tenantAdminToken}`,
    Accept: 'text/event-stream',
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

  it('should emit connected then notification events on SSE', async () => {
    const streamUrl = `${app}/api/v1/tenants/${tenantId}/sales-workspace/notifications/stream`;
    const abort = new AbortController();
    const response = await fetch(streamUrl, {
      headers: workspaceHeaders(),
      signal: abort.signal,
    });

    expect(response.ok).toBe(true);

    const reader = response.body?.getReader();

    if (!reader) {
      throw new Error('SSE response has no body');
    }

    const decoder = new TextDecoder();
    let buffer = '';
    let sawConnected = false;

    const readUntil = async (predicate: (text: string) => boolean) => {
      const deadline = Date.now() + 15_000;

      while (Date.now() < deadline) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });

        if (predicate(buffer)) {
          return;
        }
      }

      throw new Error('timed out waiting for SSE event');
    };

    await readUntil((text) => {
      if (text.includes('"type":"connected"')) {
        sawConnected = true;
        return true;
      }

      return false;
    });

    expect(sawConnected).toBe(true);

    const smokePhone = `+2547${Date.now().toString().slice(-8)}`;

    await request(app)
      .post(`/api/v1/tenants/${tenantId}/sales-workspace/leads`)
      .set({
        'x-tenant-id': String(tenantId),
        Authorization: `Bearer ${tenantAdminToken}`,
      })
      .send({
        source: 'website',
        customerName: 'SSE Smoke Lead',
        customerPhone: smokePhone,
        interestSummary: 'SSE notification stream smoke',
      })
      .expect(200);

    await readUntil((text) => text.includes('"type":"notification"'));

    expect(buffer).toContain('"type":"notification"');
    abort.abort();
  }, 20_000);
});
