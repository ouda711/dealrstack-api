import request from 'supertest';
import { ADMIN_EMAIL, ADMIN_PASSWORD, APP_URL } from './constants';

export type VehicleE2EContext = {
  app: string;
  apiToken: string;
  branchManagerToken: string;
  tenantId: number;
  westlandsBranchId: number;
  mombasaRoadBranchId: number;
};

export async function createVehicleE2EContext(): Promise<VehicleE2EContext> {
  const app = APP_URL;
  let apiToken!: string;
  let branchManagerToken!: string;
  let tenantId!: number;
  let westlandsBranchId!: number;
  let mombasaRoadBranchId!: number;

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
        (tenant: { slug: string }) => tenant.slug === 'nairobi-auto-hub',
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
      westlandsBranchId = body.find(
        (branch: { code: string }) => branch.code === 'WST',
      )?.id;
      mombasaRoadBranchId = body.find(
        (branch: { code: string }) => branch.code === 'MBR',
      )?.id;
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

  return {
    app,
    apiToken,
    branchManagerToken,
    tenantId,
    westlandsBranchId,
    mombasaRoadBranchId,
  };
}

export function buildVehiclePayload(
  ctx: Pick<VehicleE2EContext, 'westlandsBranchId'>,
  overrides: Record<string, unknown> = {},
) {
  const timestamp = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

  return {
    make: 'Toyota',
    model: 'Land Cruiser Prado',
    year: 2021,
    bodyType: 'SUV',
    branchId: ctx.westlandsBranchId,
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

export async function fetchVehicleCatalog<T>(
  ctx: Pick<VehicleE2EContext, 'app' | 'apiToken' | 'tenantId'>,
  path: string,
): Promise<T[]> {
  const response = await request(ctx.app)
    .get(`/api/v1/tenants/${ctx.tenantId}/vehicles/catalog/${path}`)
    .set('x-tenant-id', String(ctx.tenantId))
    .auth(ctx.apiToken, {
      type: 'bearer',
    })
    .expect(200);

  return response.body;
}
