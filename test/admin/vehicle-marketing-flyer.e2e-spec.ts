import request from 'supertest';
import {
  buildVehiclePayload,
  createVehicleE2EContext,
  type VehicleE2EContext,
} from '../utils/vehicle-e2e-context';

describe('Vehicle marketing — flyer threads', () => {
  let ctx: VehicleE2EContext;

  beforeAll(async () => {
    ctx = await createVehicleE2EContext();
  });

  function flyerThreadsPath(vehicleId: number, suffix = '') {
    return `/api/v1/tenants/${ctx.tenantId}/vehicles/${vehicleId}/marketing/flyer-threads${suffix}`;
  }

  async function createVehicle(): Promise<number> {
    const res = await request(ctx.app)
      .post(`/api/v1/tenants/${ctx.tenantId}/vehicles`)
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, { type: 'bearer' })
      .send(buildVehiclePayload(ctx))
      .expect(201);
    return res.body.id as number;
  }

  it('should list (possibly empty), create thread, stream SSE with done event, and validate PATCH artifact', async () => {
    const vehicleId = await createVehicle();

    await request(ctx.app)
      .get(flyerThreadsPath(vehicleId))
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, { type: 'bearer' })
      .expect(200)
      .expect(Array.isArray);

    const threadRes = await request(ctx.app)
      .post(flyerThreadsPath(vehicleId))
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, { type: 'bearer' })
      .send({})
      .expect(201);

    const threadId = threadRes.body.id as number;

    await request(ctx.app)
      .get(flyerThreadsPath(vehicleId, `/${threadId}`))
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, { type: 'bearer' })
      .expect(200)
      .expect(({ body }) => {
        expect(body.messages).toEqual([]);
      });

    const streamRes = await request(ctx.app)
      .post(flyerThreadsPath(vehicleId, `/${threadId}/stream`))
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, { type: 'bearer' })
      .send({ message: 'Draft a flyer headline for social.' })
      .expect(200);

    expect(streamRes.headers['content-type']).toMatch(/text\/event-stream/i);
    expect(streamRes.text).toContain('"type":"done"');

    const detail = await request(ctx.app)
      .get(flyerThreadsPath(vehicleId, `/${threadId}`))
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, { type: 'bearer' })
      .expect(200);

    const assistant = [...detail.body.messages]
      .reverse()
      .find((m: { role: string }) => m.role === 'assistant');
    expect(assistant?.id).toBeDefined();

    await request(ctx.app)
      .patch(
        flyerThreadsPath(vehicleId, `/${threadId}/messages/${assistant.id}`),
      )
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, { type: 'bearer' })
      .send({ artifact: { headline: '', priceLine: '' } })
      .expect(400);

    await request(ctx.app)
      .patch(
        flyerThreadsPath(vehicleId, `/${threadId}/messages/${assistant.id}`),
      )
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, { type: 'bearer' })
      .send({
        artifact: {
          headline: 'Updated headline',
          priceLine: 'KES 8.5M',
          heroImageUrl: 'https://example.com/hero.jpg',
        },
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.artifact?.headline).toBe('Updated headline');
        expect(body.artifact?.priceLine).toBe('KES 8.5M');
        expect(body.artifact?.heroImageUrl).toBe(
          'https://example.com/hero.jpg',
        );
      });
  });
});
