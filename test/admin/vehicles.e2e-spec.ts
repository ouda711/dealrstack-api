import request from 'supertest';
import { ADMIN_EMAIL, ADMIN_PASSWORD, APP_URL } from '../utils/constants';

describe('Vehicles Module', () => {
  const app = APP_URL;
  let apiToken: string;
  let branchManagerToken: string;
  let tenantId: number;
  let westlandsBranchId: number;
  let mombasaRoadBranchId: number;

  beforeAll(async () => {
    await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .expect(200)
      .then(({ body }) => {
        apiToken = body.token;
      });

    await request(app)
      .get('/api/v1/tenants')
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200)
      .then(({ body }) => {
        tenantId = body.data.find(
          (tenant) => tenant.slug === 'nairobi-auto-hub',
        )?.id;
      });

    await request(app)
      .get(`/api/v1/tenants/${tenantId}/branches`)
      .set('x-tenant-id', String(tenantId))
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200)
      .then(({ body }) => {
        westlandsBranchId = body.find((branch) => branch.code === 'WST')?.id;
        mombasaRoadBranchId = body.find((branch) => branch.code === 'MBR')?.id;
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
  });

  function vehiclePayload(overrides: Record<string, unknown> = {}) {
    const timestamp = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

    return {
      make: 'Toyota',
      model: 'Land Cruiser Prado',
      year: 2021,
      bodyType: 'SUV',
      branchId: westlandsBranchId,
      vin: `JTEBU3FJ5${String(timestamp).slice(-8)}`,
      plateNumber: `KDA ${String(timestamp).slice(-3)}A`,
      mileage: 42000,
      condition: 'locally_used',
      listingType: 'sale',
      status: 'available',
      price: 8500000,
      location: 'Nairobi',
      engineDetails: {
        type: 'petrol',
        displacement: 2.7,
        horsepower: 164,
      },
      gearboxDetails: {
        transmission: 'automatic',
        gears: 6,
      },
      drivetrain: 'awd',
      categorizedFeatures: {
        interior: ['Leather seats'],
        exterior: ['Alloy wheels'],
        safety: ['Airbags'],
        entertainment: ['Bluetooth'],
      },
      saleOptions: {
        price: 8500000,
        isNegotiable: true,
        financingAvailable: true,
      },
      ...overrides,
    };
  }

  async function getCatalog<T>(path: string): Promise<T[]> {
    const response = await request(app)
      .get(`/api/v1/tenants/${tenantId}/vehicles/catalog/${path}`)
      .set('x-tenant-id', String(tenantId))
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200);

    return response.body;
  }

  it('should create and list tenant vehicles with structured details', async () => {
    const createResponse = await request(app)
      .post(`/api/v1/tenants/${tenantId}/vehicles`)
      .set('x-tenant-id', String(tenantId))
      .auth(apiToken, {
        type: 'bearer',
      })
      .send(vehiclePayload())
      .expect(201);

    expect(createResponse.body.make).toBe('Toyota');
    expect(createResponse.body.brand.name).toBe('Toyota');
    expect(createResponse.body.modelCatalog.name).toBe('Land Cruiser Prado');
    expect(createResponse.body.bodyTypeCatalog.name).toBe('SUV');
    expect(createResponse.body.branch.code).toBe('WST');
    expect(createResponse.body.engineDetails.type).toBe('petrol');
    expect(createResponse.body.saleOptions.financingAvailable).toBe(true);

    return request(app)
      .get(`/api/v1/tenants/${tenantId}/vehicles`)
      .set('x-tenant-id', String(tenantId))
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(
          body.some((vehicle) => vehicle.id === createResponse.body.id),
        ).toBe(true);
      });
  });

  it('should expose catalog records created from vehicle fallback details', async () => {
    await request(app)
      .post(`/api/v1/tenants/${tenantId}/vehicles`)
      .set('x-tenant-id', String(tenantId))
      .auth(apiToken, {
        type: 'bearer',
      })
      .send(vehiclePayload())
      .expect(201);

    const brands = await getCatalog<{ name: string }>('brands');
    const models = await getCatalog<{ name: string }>('models');
    const bodyTypes = await getCatalog<{ name: string }>('body-types');

    expect(brands.some((brand) => brand.name === 'Toyota')).toBe(true);
    expect(models.some((model) => model.name === 'Land Cruiser Prado')).toBe(
      true,
    );
    expect(bodyTypes.some((bodyType) => bodyType.name === 'SUV')).toBe(true);
  });

  it('should reject model and brand catalog mismatches', async () => {
    const toyotaVehicle = await request(app)
      .post(`/api/v1/tenants/${tenantId}/vehicles`)
      .set('x-tenant-id', String(tenantId))
      .auth(apiToken, {
        type: 'bearer',
      })
      .send(vehiclePayload())
      .expect(201);
    const nissanVehicle = await request(app)
      .post(`/api/v1/tenants/${tenantId}/vehicles`)
      .set('x-tenant-id', String(tenantId))
      .auth(apiToken, {
        type: 'bearer',
      })
      .send(
        vehiclePayload({
          make: 'Nissan',
          model: 'Patrol',
          vin: `JN1TESY61${String(Date.now()).slice(-8)}`,
          plateNumber: `KDB ${String(Date.now()).slice(-3)}B`,
        }),
      )
      .expect(201);

    return request(app)
      .post(`/api/v1/tenants/${tenantId}/vehicles`)
      .set('x-tenant-id', String(tenantId))
      .auth(apiToken, {
        type: 'bearer',
      })
      .send(
        vehiclePayload({
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

  it('should allow branch managers to update vehicles in their branch', async () => {
    const createResponse = await request(app)
      .post(`/api/v1/tenants/${tenantId}/vehicles`)
      .set('x-tenant-id', String(tenantId))
      .auth(apiToken, {
        type: 'bearer',
      })
      .send(vehiclePayload())
      .expect(201);

    return request(app)
      .patch(`/api/v1/tenants/${tenantId}/vehicles/${createResponse.body.id}`)
      .set('x-tenant-id', String(tenantId))
      .auth(branchManagerToken, {
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
    const createResponse = await request(app)
      .post(`/api/v1/tenants/${tenantId}/vehicles`)
      .set('x-tenant-id', String(tenantId))
      .auth(apiToken, {
        type: 'bearer',
      })
      .send(
        vehiclePayload({
          branchId: mombasaRoadBranchId,
        }),
      )
      .expect(201);

    return request(app)
      .patch(`/api/v1/tenants/${tenantId}/vehicles/${createResponse.body.id}`)
      .set('x-tenant-id', String(tenantId))
      .auth(branchManagerToken, {
        type: 'bearer',
      })
      .send({
        status: 'maintenance',
      })
      .expect(403);
  });

  it('should reject duplicate VINs within the same tenant', async () => {
    const payload = vehiclePayload();

    await request(app)
      .post(`/api/v1/tenants/${tenantId}/vehicles`)
      .set('x-tenant-id', String(tenantId))
      .auth(apiToken, {
        type: 'bearer',
      })
      .send(payload)
      .expect(201);

    return request(app)
      .post(`/api/v1/tenants/${tenantId}/vehicles`)
      .set('x-tenant-id', String(tenantId))
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({
        ...vehiclePayload(),
        vin: payload.vin,
      })
      .expect(422)
      .expect(({ body }) => {
        expect(body.errors.vin).toBe('vinAlreadyExists');
      });
  });

  it('should record vehicle audit events', async () => {
    const createResponse = await request(app)
      .post(`/api/v1/tenants/${tenantId}/vehicles`)
      .set('x-tenant-id', String(tenantId))
      .auth(apiToken, {
        type: 'bearer',
      })
      .send(vehiclePayload())
      .expect(201);

    await request(app)
      .patch(`/api/v1/tenants/${tenantId}/vehicles/${createResponse.body.id}`)
      .set('x-tenant-id', String(tenantId))
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({
        status: 'sold',
      })
      .expect(200);

    return request(app)
      .get(`/api/v1/tenants/${tenantId}/audit-trail`)
      .set('x-tenant-id', String(tenantId))
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(
          body.data.some(
            (event) =>
              event.action === 'UPDATE_VEHICLE_STATUS' &&
              event.metadata?.next?.vehicleId === createResponse.body.id,
          ),
        ).toBe(true);
      });
  });
});
