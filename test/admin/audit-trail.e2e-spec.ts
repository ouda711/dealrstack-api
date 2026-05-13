import { JwtService } from '@nestjs/jwt';
import request from 'supertest';
import {
  APP_URL,
  TENANT_ADMIN_EMAIL,
  TENANT_ADMIN_PASSWORD,
} from '../utils/constants';

describe('Audit Trail Module', () => {
  const app = APP_URL;
  const jwtService = new JwtService();
  let tenantAdminToken: string;
  let branchManagerToken: string;
  let tenantId: number;
  let branchId: number;
  let salespersonRoleId: number;
  let branchManagerVisibleBranchIds: number[];

  function createInviteHash({
    tenantId,
    membershipId,
    userId,
  }: {
    tenantId: number;
    membershipId: number;
    userId: number;
  }) {
    return jwtService.sign(
      {
        inviteTenantId: tenantId,
        inviteMembershipId: membershipId,
        inviteUserId: userId,
      },
      {
        secret: process.env.AUTH_CONFIRM_EMAIL_SECRET,
      },
    );
  }

  beforeAll(async () => {
    await request(app)
      .post('/api/v1/auth/email/login')
      .send({
        email: TENANT_ADMIN_EMAIL,
        password: TENANT_ADMIN_PASSWORD,
        tenantId: 1,
      })
      .expect(200)
      .then(({ body }) => {
        tenantAdminToken = body.token;
        tenantId = body.user.access.currentTenant.id;
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
        branchManagerVisibleBranchIds = body.user.access.currentBranches.map(
          (branch) => Number(branch.id),
        );
      });

    await request(app)
      .post(`/api/v1/tenants/${tenantId}/branches`)
      .set('x-tenant-id', String(tenantId))
      .auth(tenantAdminToken, {
        type: 'bearer',
      })
      .send({
        name: 'Audit Test Branch',
        code: `AUD-${Date.now()}`,
        city: 'Nairobi',
      })
      .expect(201)
      .then(({ body }) => {
        branchId = body.id;
      });

    await request(app)
      .get(`/api/v1/access/roles?tenantId=${tenantId}`)
      .auth(tenantAdminToken, {
        type: 'bearer',
      })
      .expect(200)
      .then(({ body }) => {
        salespersonRoleId = body.find((role) => role.key === 'salesperson').id;
      });
  });

  it('should record branch creation events for tenant admins', () => {
    return request(app)
      .get(`/api/v1/tenants/${tenantId}/audit-trail`)
      .set('x-tenant-id', String(tenantId))
      .auth(tenantAdminToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        const event = body.data.find(
          (auditEvent) =>
            auditEvent.action === 'CREATE_BRANCH' &&
            auditEvent.branch?.id === branchId,
        );

        expect(event).toBeDefined();
        expect(event.description).toContain('was created');
        expect(event.actor.email).toBe(TENANT_ADMIN_EMAIL);
        expect(event.occurredAt).toBeDefined();
      });
  });

  it('should record branch update descriptions', async () => {
    await request(app)
      .patch(`/api/v1/tenants/${tenantId}/branches/${branchId}`)
      .set('x-tenant-id', String(tenantId))
      .auth(tenantAdminToken, {
        type: 'bearer',
      })
      .send({
        openingHours: 'Mon-Fri, 9:00 AM - 5:00 PM',
      })
      .expect(200);

    return request(app)
      .get(`/api/v1/tenants/${tenantId}/audit-trail`)
      .set('x-tenant-id', String(tenantId))
      .auth(tenantAdminToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        const event = body.data.find(
          (auditEvent) =>
            auditEvent.action === 'UPDATE_BRANCH' &&
            auditEvent.branch?.id === branchId,
        );

        expect(event.description).toContain('operating hours changed');
      });
  });

  it('should record team invitation events', async () => {
    const inviteEmail = `audit-invite.${Date.now()}@dealrstack.com`;

    await request(app)
      .post(`/api/v1/access/tenants/${tenantId}/memberships`)
      .auth(tenantAdminToken, {
        type: 'bearer',
      })
      .send({
        email: inviteEmail,
        firstName: 'Audit',
        lastName: 'Invite',
        roleId: salespersonRoleId,
        title: 'Sales Trainee',
      })
      .expect(201);

    return request(app)
      .get(`/api/v1/tenants/${tenantId}/audit-trail`)
      .set('x-tenant-id', String(tenantId))
      .auth(tenantAdminToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        const event = body.data.find(
          (auditEvent) =>
            auditEvent.action === 'INVITE_TEAM_MEMBER' &&
            auditEvent.metadata?.targetUserEmail === inviteEmail,
        );

        expect(event).toBeDefined();
        expect(event.description).toContain(inviteEmail);
        expect(event.actor.email).toBe(TENANT_ADMIN_EMAIL);
      });
  });

  it('should record team invitation acceptance events', async () => {
    const inviteEmail = `audit-accept-invite.${Date.now()}@dealrstack.com`;
    const inviteResponse = await request(app)
      .post(`/api/v1/access/tenants/${tenantId}/memberships`)
      .auth(tenantAdminToken, {
        type: 'bearer',
      })
      .send({
        email: inviteEmail,
        firstName: 'Audit',
        lastName: 'Accepted',
        roleId: salespersonRoleId,
        title: 'Sales Trainee',
      })
      .expect(201);
    const inviteHash = createInviteHash({
      tenantId,
      membershipId: inviteResponse.body.id,
      userId: inviteResponse.body.user.id,
    });

    await request(app)
      .post('/api/v1/auth/invite/accept')
      .send({
        hash: inviteHash,
        password: 'secret123',
      })
      .expect(204);

    return request(app)
      .get(`/api/v1/tenants/${tenantId}/audit-trail`)
      .set('x-tenant-id', String(tenantId))
      .auth(tenantAdminToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        const event = body.data.find(
          (auditEvent) =>
            auditEvent.action === 'ACCEPT_TEAM_INVITE' &&
            auditEvent.metadata?.targetUserEmail === inviteEmail,
        );

        expect(event).toBeDefined();
        expect(event.description).toContain(
          'accepted the workspace invitation',
        );
      });
  });

  it('should scope branch managers to assigned branch audit events', () => {
    return request(app)
      .get(`/api/v1/tenants/${tenantId}/audit-trail`)
      .set('x-tenant-id', String(tenantId))
      .auth(branchManagerToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(
          body.data.every((auditEvent) =>
            branchManagerVisibleBranchIds.includes(
              Number(auditEvent.branch?.id),
            ),
          ),
        ).toBe(true);
      });
  });
});
