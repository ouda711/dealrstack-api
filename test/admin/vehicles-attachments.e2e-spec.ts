import request from 'supertest';
import {
  buildVehiclePayload,
  createVehicleE2EContext,
  type VehicleE2EContext,
} from '../utils/vehicle-e2e-context';

describe('Vehicles — media & documents', () => {
  let ctx: VehicleE2EContext;

  beforeAll(async () => {
    ctx = await createVehicleE2EContext();
  });

  it('should manage vehicle media and documents on detail response', async () => {
    const createResponse = await request(ctx.app)
      .post(`/api/v1/tenants/${ctx.tenantId}/vehicles`)
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .send(buildVehiclePayload(ctx))
      .expect(201);

    const vehicleId = createResponse.body.id;

    const mediaResponse = await request(ctx.app)
      .post(`/api/v1/tenants/${ctx.tenantId}/vehicles/${vehicleId}/media`)
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .send({
        kind: 'image',
        url: 'https://cdn.example.com/vehicle-front.jpg',
        caption: 'Front angle',
        sortOrder: 0,
      })
      .expect(201);

    const detailAfterMedia = await request(ctx.app)
      .get(`/api/v1/tenants/${ctx.tenantId}/vehicles/${vehicleId}`)
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .expect(200);

    expect(detailAfterMedia.body.mediaAssets.length).toBe(1);
    expect(detailAfterMedia.body.mediaAssets[0].id).toBe(mediaResponse.body.id);
    expect(detailAfterMedia.body.mediaAssets[0].caption).toBe('Front angle');

    const documentResponse = await request(ctx.app)
      .post(`/api/v1/tenants/${ctx.tenantId}/vehicles/${vehicleId}/documents`)
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .send({
        documentType: 'registration',
        title: 'Logbook',
        url: 'https://cdn.example.com/logbook.pdf',
      })
      .expect(201);

    const documentId = documentResponse.body.id;

    await request(ctx.app)
      .patch(
        `/api/v1/tenants/${ctx.tenantId}/vehicles/${vehicleId}/documents/${documentId}`,
      )
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .send({
        title: 'Logbook (updated)',
      })
      .expect(200);

    const detailAfterDoc = await request(ctx.app)
      .get(`/api/v1/tenants/${ctx.tenantId}/vehicles/${vehicleId}`)
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .expect(200);

    expect(detailAfterDoc.body.documents.length).toBe(1);
    expect(detailAfterDoc.body.documents[0].title).toBe('Logbook (updated)');

    await request(ctx.app)
      .delete(
        `/api/v1/tenants/${ctx.tenantId}/vehicles/${vehicleId}/media/${mediaResponse.body.id}`,
      )
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .expect(204);

    await request(ctx.app)
      .delete(
        `/api/v1/tenants/${ctx.tenantId}/vehicles/${vehicleId}/documents/${documentId}`,
      )
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .expect(204);

    const detailCleared = await request(ctx.app)
      .get(`/api/v1/tenants/${ctx.tenantId}/vehicles/${vehicleId}`)
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .expect(200);

    expect(detailCleared.body.mediaAssets).toEqual([]);
    expect(detailCleared.body.documents).toEqual([]);
  });

  it('should block branch managers from adding media on another branch vehicle', async () => {
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
      .post(
        `/api/v1/tenants/${ctx.tenantId}/vehicles/${createResponse.body.id}/media`,
      )
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.branchManagerToken, {
        type: 'bearer',
      })
      .send({
        kind: 'image',
        url: 'https://cdn.example.com/other-branch.jpg',
      })
      .expect(403);
  });
});
