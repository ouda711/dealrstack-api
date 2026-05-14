import request from 'supertest';
import {
  buildVehiclePayload,
  createVehicleE2EContext,
  type VehicleE2EContext,
} from '../utils/vehicle-e2e-context';

describe('Vehicles — branch-scoped access', () => {
  let ctx: VehicleE2EContext;

  beforeAll(async () => {
    ctx = await createVehicleE2EContext();
  });

  it('should allow branch managers to update vehicles in their branch', async () => {
    const createResponse = await request(ctx.app)
      .post(`/api/v1/tenants/${ctx.tenantId}/vehicles`)
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .send(buildVehiclePayload(ctx))
      .expect(201);

    return request(ctx.app)
      .patch(
        `/api/v1/tenants/${ctx.tenantId}/vehicles/${createResponse.body.id}`,
      )
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.branchManagerToken, {
        type: 'bearer',
      })
      .send({
        status: 'reserved',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.status).toBe('reserved');
      });
  });

  it('should block branch managers from updating another branch vehicle', async () => {
    const createResponse = await request(ctx.app)
      .post(`/api/v1/tenants/${ctx.tenantId}/vehicles`)
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .send(
        buildVehiclePayload(ctx, {
          branchId: ctx.mombasaRoadBranchId,
        }),
      )
      .expect(201);

    return request(ctx.app)
      .patch(
        `/api/v1/tenants/${ctx.tenantId}/vehicles/${createResponse.body.id}`,
      )
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.branchManagerToken, {
        type: 'bearer',
      })
      .send({
        status: 'maintenance',
      })
      .expect(403);
  });
});
