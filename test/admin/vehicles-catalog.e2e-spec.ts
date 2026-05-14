import request from 'supertest';
import {
  buildVehiclePayload,
  createVehicleE2EContext,
  fetchVehicleCatalog,
  type VehicleE2EContext,
} from '../utils/vehicle-e2e-context';

describe('Vehicles — catalog resolution', () => {
  let ctx: VehicleE2EContext;

  beforeAll(async () => {
    ctx = await createVehicleE2EContext();
  });

  it('should expose catalog records created from vehicle fallback details', async () => {
    await request(ctx.app)
      .post(`/api/v1/tenants/${ctx.tenantId}/vehicles`)
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .send(buildVehiclePayload(ctx))
      .expect(201);

    const brands = await fetchVehicleCatalog<{ name: string }>(ctx, 'brands');
    const models = await fetchVehicleCatalog<{ name: string }>(ctx, 'models');
    const bodyTypes = await fetchVehicleCatalog<{ name: string }>(
      ctx,
      'body-types',
    );

    expect(brands.some((brand) => brand.name === 'Toyota')).toBe(true);
    expect(models.some((model) => model.name === 'Land Cruiser Prado')).toBe(
      true,
    );
    expect(bodyTypes.some((bodyType) => bodyType.name === 'SUV')).toBe(true);
  });

  it('should reject model and brand catalog mismatches', async () => {
    const toyotaVehicle = await request(ctx.app)
      .post(`/api/v1/tenants/${ctx.tenantId}/vehicles`)
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .send(buildVehiclePayload(ctx))
      .expect(201);
    const nissanVehicle = await request(ctx.app)
      .post(`/api/v1/tenants/${ctx.tenantId}/vehicles`)
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .send(
        buildVehiclePayload(ctx, {
          make: 'Nissan',
          model: 'Patrol',
          vin: `JN1TESY61${String(Date.now()).slice(-8)}`,
          plateNumber: `KDB ${String(Date.now()).slice(-3)}B`,
        }),
      )
      .expect(201);

    return request(ctx.app)
      .post(`/api/v1/tenants/${ctx.tenantId}/vehicles`)
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .send(
        buildVehiclePayload(ctx, {
          brandId: toyotaVehicle.body.brand.id,
          modelId: nissanVehicle.body.modelCatalog.id,
          make: undefined,
          model: undefined,
        }),
      )
      .expect(422)
      .expect(({ body }) => {
        expect(body.errors.modelId).toBe('vehicleModelDoesNotBelongToBrand');
      });
  });
});
