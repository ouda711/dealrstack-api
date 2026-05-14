import request from 'supertest';
import {
  buildVehiclePayload,
  createVehicleE2EContext,
  type VehicleE2EContext,
} from '../utils/vehicle-e2e-context';

/** Minimal valid JPEG (1×1). */
const tinyJpeg = Buffer.from(
  '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAr/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAGAAP/EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8B//EAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAGPwJ//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPyF//9oADAMBAAIAAwAAABCD/wD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/EP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8Q/wD/Z',
  'base64',
);

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

  it('should upload a gallery attachment locally and expose a usable file URL', async () => {
    const createResponse = await request(ctx.app)
      .post(`/api/v1/tenants/${ctx.tenantId}/vehicles`)
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .send(buildVehiclePayload(ctx))
      .expect(201);

    const vehicleId = createResponse.body.id;

    const uploadResponse = await request(ctx.app)
      .post(`/api/v1/tenants/${ctx.tenantId}/vehicles/${vehicleId}/attachments`)
      .query({ kind: 'gallery' })
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .attach('file', tinyJpeg, 'front.jpg')
      .expect(201);

    expect(uploadResponse.body.fileUrl).toMatch(/\/api\/v1\/files\//);
    expect(uploadResponse.body.objectKey).toMatch(/\.jpg$/);

    const mediaResponse = await request(ctx.app)
      .post(`/api/v1/tenants/${ctx.tenantId}/vehicles/${vehicleId}/media`)
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .send({
        kind: 'image',
        url: uploadResponse.body.fileUrl,
        caption: 'Uploaded',
        sortOrder: 0,
      })
      .expect(201);

    expect(mediaResponse.body.url).toBe(uploadResponse.body.fileUrl);
  });

  it('should reject presigned attachment flow when FILE_DRIVER is not s3-presigned', async () => {
    if (process.env.FILE_DRIVER === 's3-presigned') {
      return;
    }

    const createResponse = await request(ctx.app)
      .post(`/api/v1/tenants/${ctx.tenantId}/vehicles`)
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .send(buildVehiclePayload(ctx))
      .expect(201);

    const vehicleId = createResponse.body.id;

    await request(ctx.app)
      .post(
        `/api/v1/tenants/${ctx.tenantId}/vehicles/${vehicleId}/attachments/presign`,
      )
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.apiToken, {
        type: 'bearer',
      })
      .send({
        fileName: 'doc.pdf',
        fileSize: 1200,
        kind: 'document',
      })
      .expect(422);
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

  it('should block branch managers from uploading attachments on another branch vehicle', async () => {
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
        `/api/v1/tenants/${ctx.tenantId}/vehicles/${createResponse.body.id}/attachments`,
      )
      .query({ kind: 'gallery' })
      .set('x-tenant-id', String(ctx.tenantId))
      .auth(ctx.branchManagerToken, {
        type: 'bearer',
      })
      .attach('file', tinyJpeg, 'blocked.jpg')
      .expect(403);
  });
});
