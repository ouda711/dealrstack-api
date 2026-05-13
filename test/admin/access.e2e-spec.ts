import { JwtService } from '@nestjs/jwt';
import request from 'supertest';
import { ADMIN_EMAIL, ADMIN_PASSWORD, APP_URL } from '../utils/constants';

describe('Access Module', () => {
  const app = APP_URL;
  const jwtService = new JwtService();
  let apiToken: string;
  let branchManagerToken: string;
  let tenantId: number;
  let superAdminRoleId: number;
  let salespersonRoleId: number;

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
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
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
      .post('/api/v1/auth/email/login')
      .send({
        email: 'grace@nairobi-auto-hub.co.ke',
        password: 'secret',
      })
      .expect(200)
      .then(({ body }) => {
        branchManagerToken = body.token;
      });
  });

  it('should list broad permission catalog entries', () => {
    return request(app)
      .get('/api/v1/access/permissions')
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        const permissionKeys = body.map((permission) => permission.key);
        expect(permissionKeys).toContain('platform.manage');
        expect(permissionKeys).toContain('tenants.manage');
        expect(permissionKeys).toContain('audit.view');
        expect(permissionKeys).toContain('team.view-branch');
        expect(permissionKeys).toContain('branches.manage-all');
        expect(permissionKeys).toContain('leads.manage');
        expect(permissionKeys).toContain('rentals.manage');
        expect(permissionKeys).toContain('auctions.manage');
      });
  });

  it('should list platform roles only for the platform owner context', () => {
    return request(app)
      .get('/api/v1/access/roles')
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        const roleKeys = body.map((role) => role.key);
        const superAdmin = body.find((role) => role.key === 'super-admin');

        superAdminRoleId = superAdmin.id;

        expect(superAdmin?.name).toBe('Super Admin');
        expect(superAdmin?.scope).toBe('platform');
        expect(roleKeys).toContain('super-admin');
        expect(body.every((role) => role.scope === 'platform')).toBe(true);
      });
  });

  it('should list tenant roles for a workspace without platform roles', () => {
    return request(app)
      .get(`/api/v1/access/roles?tenantId=${tenantId}`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        const roleKeys = body.map((role) => role.key);
        const owner = body.find((role) => role.key === 'owner');
        const tenantAdmin = body.find((role) => role.key === 'tenant-admin');
        const salesperson = body.find((role) => role.key === 'salesperson');

        salespersonRoleId = salesperson.id;

        expect(owner?.name).toBe('Owner');
        expect(owner?.scope).toBe('tenant');
        expect(tenantAdmin?.name).toBe('Tenant Admin');
        expect(tenantAdmin?.scope).toBe('tenant');
        expect(roleKeys).not.toContain('super-admin');
        expect(roleKeys).toContain('owner');
        expect(roleKeys).toContain('tenant-admin');
        expect(roleKeys).toContain('salesperson');
        expect(roleKeys).toContain('rental-agent');
        expect(roleKeys).toContain('driver');
      });
  });

  it('should hide tenant admin roles from branch-scoped team viewers', () => {
    return request(app)
      .get(`/api/v1/access/roles?tenantId=${tenantId}`)
      .auth(branchManagerToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        const roleKeys = body.map((role) => role.key);

        expect(roleKeys).not.toContain('super-admin');
        expect(roleKeys).not.toContain('owner');
        expect(roleKeys).not.toContain('tenant-admin');
        expect(roleKeys).toContain('manager');
        expect(roleKeys).toContain('salesperson');
      });
  });

  it('should keep the super admin role limited to the platform owner permission', () => {
    return request(app)
      .get(`/api/v1/access/roles/${superAdminRoleId}/permissions`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.map((permission) => permission.key)).toEqual([
          'platform.manage',
        ]);
      });
  });

  it('should list seeded tenant memberships', () => {
    return request(app)
      .get(`/api/v1/access/tenants/${tenantId}/memberships`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        const memberEmails = body.map((membership) => membership.user.email);
        const graceMembership = body.find(
          (membership) =>
            membership.user.email === 'grace@nairobi-auto-hub.co.ke',
        );

        expect(memberEmails).toContain('admin@dealrstack.com');
        expect(memberEmails).toContain('sales@dealrstack.com');
        expect(body.some((membership) => membership.user.role)).toBe(false);
        expect(JSON.stringify(body)).not.toContain('super-admin');
        expect(
          graceMembership.assignedBranches.map((branch) => branch.code),
        ).toEqual(expect.arrayContaining(['WST']));
      });
  });

  it('should scope tenant memberships to assigned branches for branch managers', () => {
    return request(app)
      .get(`/api/v1/access/tenants/${tenantId}/memberships`)
      .auth(branchManagerToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        const memberEmails = body.map((membership) => membership.user.email);

        expect(memberEmails).toContain('grace@nairobi-auto-hub.co.ke');
        expect(memberEmails).not.toContain('tenant-admin@dealrstack.com');
        expect(memberEmails).not.toContain('admin@dealrstack.com');
        expect(
          body.every((membership) =>
            membership.assignedBranches.some((branch) => branch.code === 'WST'),
          ),
        ).toBe(true);
      });
  });

  it('should block branch-scoped team viewers from updating memberships', async () => {
    const membershipsResponse = await request(app)
      .get(`/api/v1/access/tenants/${tenantId}/memberships`)
      .auth(branchManagerToken, {
        type: 'bearer',
      })
      .expect(200);
    const branchManagerMembership = membershipsResponse.body.find(
      (membership) => membership.user.email === 'grace@nairobi-auto-hub.co.ke',
    );

    return request(app)
      .patch(
        `/api/v1/access/tenants/${tenantId}/memberships/${branchManagerMembership.id}`,
      )
      .auth(branchManagerToken, {
        type: 'bearer',
      })
      .send({
        title: 'Self Promoted Manager',
      })
      .expect(403)
      .expect(({ body }) => {
        expect(body.message).toBe('Forbidden resource');
      });
  });

  it('should update a tenant membership role, title, and status', async () => {
    const membershipsResponse = await request(app)
      .get(`/api/v1/access/tenants/${tenantId}/memberships`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200);
    const salespersonMembership = membershipsResponse.body.find(
      (membership) => membership.user.email === 'sales@dealrstack.com',
    );

    return request(app)
      .patch(
        `/api/v1/access/tenants/${tenantId}/memberships/${salespersonMembership.id}`,
      )
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({
        roleId: salespersonRoleId,
        title: 'Sales Consultant',
        status: 'active',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.id).toBe(salespersonMembership.id);
        expect(body.title).toBe('Sales Consultant');
        expect(body.status).toBe('active');
        expect(body.role.key).toBe('salesperson');
      });
  });

  it('should invite a new tenant member with invited status', () => {
    const inviteEmail = `invited.${Date.now()}@dealrstack.com`;

    return request(app)
      .post(`/api/v1/access/tenants/${tenantId}/memberships`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({
        email: inviteEmail,
        firstName: 'Invited',
        lastName: 'Member',
        roleId: salespersonRoleId,
        title: 'Sales Trainee',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body.status).toBe('invited');
        expect(body.title).toBe('Sales Trainee');
        expect(body.role.key).toBe('salesperson');
        expect(body.user.email).toBe(inviteEmail);
        expect(body.user.role).not.toBeDefined();
      });
  });

  it('should reject duplicate tenant membership invites', async () => {
    const inviteEmail = `duplicate-invite.${Date.now()}@dealrstack.com`;
    const invitePayload = {
      email: inviteEmail,
      firstName: 'Duplicate',
      lastName: 'Invite',
      roleId: salespersonRoleId,
      title: 'Sales Trainee',
    };

    await request(app)
      .post(`/api/v1/access/tenants/${tenantId}/memberships`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .send(invitePayload)
      .expect(201);

    return request(app)
      .post(`/api/v1/access/tenants/${tenantId}/memberships`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .send(invitePayload)
      .expect(422)
      .expect(({ body }) => {
        expect(body.errors.email).toBe('tenantMembershipAlreadyExists');
      });
  });

  it('should accept a tenant invite and activate membership access', async () => {
    const inviteEmail = `accept-invite.${Date.now()}@dealrstack.com`;
    const inviteResponse = await request(app)
      .post(`/api/v1/access/tenants/${tenantId}/memberships`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({
        email: inviteEmail,
        firstName: 'Accepted',
        lastName: 'Invite',
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

    await request(app)
      .post('/api/v1/auth/email/login')
      .send({
        email: inviteEmail,
        password: 'secret123',
        tenantId,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.user.access.currentTenant.id).toBe(tenantId);
        expect(body.user.access.currentMembership.status).toBe('active');
        expect(body.user.access.currentTenantRole.key).toBe('salesperson');
      });
  });

  it('should reject accepting the same tenant invite twice', async () => {
    const inviteEmail = `accept-invite-once.${Date.now()}@dealrstack.com`;
    const inviteResponse = await request(app)
      .post(`/api/v1/access/tenants/${tenantId}/memberships`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({
        email: inviteEmail,
        firstName: 'Single',
        lastName: 'Use',
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
      .post('/api/v1/auth/invite/accept')
      .send({
        hash: inviteHash,
        password: 'secret123',
      })
      .expect(422)
      .expect(({ body }) => {
        expect(body.errors.hash).toBe('tenantInviteAlreadyAccepted');
      });
  });

  it('should reject platform roles for tenant memberships', async () => {
    const membershipsResponse = await request(app)
      .get(`/api/v1/access/tenants/${tenantId}/memberships`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200);
    const salespersonMembership = membershipsResponse.body.find(
      (membership) => membership.user.email === 'sales@dealrstack.com',
    );

    return request(app)
      .patch(
        `/api/v1/access/tenants/${tenantId}/memberships/${salespersonMembership.id}`,
      )
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({
        roleId: superAdminRoleId,
      })
      .expect(422)
      .expect(({ body }) => {
        expect(body.errors.roleId).toBe('tenantRoleNotFound');
      });
  });
});
