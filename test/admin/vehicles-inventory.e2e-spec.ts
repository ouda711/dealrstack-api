import request from 'supertest';
import {
  buildVehiclePayload,
  createVehicleE2EContext,
  type VehicleE2EContext,
} from '../utils/vehicle-e2e-context';

describe('Vehicles — inventory (create & list)', () => {
  let ctx: VehicleE2EContext;

  beforeAll(async () => {
    ctx = await createVehicleE2EContext();
  });

  it('should create and list tenant vehicles with structured details', async () => {
    const createResponse = await request(ctx.app)
      .post(`/api/v1/tenants/${ctx.tenantId}/vehicles`)
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .send(buildVehiclePayload(ctx))
      .expect(201);

    expect(createResponse.body.make).toBe('Toyota');
    expect(createResponse.body.brand.name).toBe('Toyota');
    expect(createResponse.body.modelCatalog.name).toBe('Land Cruiser Prado');
    expect(createResponse.body.bodyTypeCatalog.name).toBe('SUV');
    expect(createResponse.body.branch.code).toBe('WST');
    expect(createResponse.body.engineDetails.type).toBe('petrol');
    expect(createResponse.body.saleOptions.financingAvailable).toBe(true);

    return request(ctx.app)
      .get(`/api/v1/tenants/${ctx.tenantId}/vehicles`)
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(
          body.some(
            (vehicle: { id: number }) => vehicle.id === createResponse.body.id,
          ),
        ).toBe(true);
      });
  });
});
