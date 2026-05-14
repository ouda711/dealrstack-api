import request from 'supertest';
import {
  buildVehiclePayload,
  createVehicleE2EContext,
  type VehicleE2EContext,
} from '../utils/vehicle-e2e-context';

describe('Vehicles — validation constraints', () => {
  let ctx: VehicleE2EContext;

  beforeAll(async () => {
    ctx = await createVehicleE2EContext();
  });

  it('should reject duplicate VINs within the same tenant', async () => {
    const payload = buildVehiclePayload(ctx);

    await request(ctx.app)
      .post(`/api/v1/tenants/${ctx.tenantId}/vehicles`)
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .send(payload)
      .expect(201);

    return request(ctx.app)
      .post(`/api/v1/tenants/${ctx.tenantId}/vehicles`)
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .send({
        ...buildVehiclePayload(ctx),
        vin: payload.vin,
      })
      .expect(422)
      .expect(({ body }) => {
        expect(body.errors.vin).toBe('vinAlreadyExists');
      });
  });
});
