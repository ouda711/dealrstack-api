import request from 'supertest';
import {
  buildVehiclePayload,
  createVehicleE2EContext,
  type VehicleE2EContext,
} from '../utils/vehicle-e2e-context';

describe('Vehicles — audit trail', () => {
  let ctx: VehicleE2EContext;

  beforeAll(async () => {
    ctx = await createVehicleE2EContext();
  });

  it('should record vehicle audit events', async () => {
    const createResponse = await request(ctx.app)
      .post(`/api/v1/tenants/${ctx.tenantId}/vehicles`)
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .send(buildVehiclePayload(ctx))
      .expect(201);

    await request(ctx.app)
      .patch(
        `/api/v1/tenants/${ctx.tenantId}/vehicles/${createResponse.body.id}`,
      )
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .send({
        status: 'sold',
      })
      .expect(200);

    return request(ctx.app)
      .get(`/api/v1/tenants/${ctx.tenantId}/audit-trail`)
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(
          body.data.some(
            (event: {
              action: string;
              metadata?: { next?: { vehicleId?: number } };
            }) =>
              event.action === 'UPDATE_VEHICLE_STATUS' &&
              event.metadata?.next?.vehicleId === createResponse.body.id,
          ),
        ).toBe(true);
      });
  });
});
