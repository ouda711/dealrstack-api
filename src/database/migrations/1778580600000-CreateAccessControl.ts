import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccessControl1778580600000 implements MigrationInterface {
  name = 'CreateAccessControl1778580600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "role_id_seq" OWNED BY "role"."id"`,
    );
    await queryRunner.query(
      `SELECT setval('"role_id_seq"', COALESCE((SELECT MAX("id") FROM "role"), 0) + 1, false)`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ALTER COLUMN "id" SET DEFAULT nextval('"role_id_seq"')`,
    );
    await queryRunner.query(`ALTER TABLE "role" ADD "key" character varying`);
    await queryRunner.query(
      `ALTER TABLE "role" ADD "scope" character varying NOT NULL DEFAULT 'platform'`,
    );
    await queryRunner.query(`ALTER TABLE "role" ADD "tenantId" integer`);
    await queryRunner.query(`ALTER TABLE "role" ADD "description" text`);
    await queryRunner.query(
      `ALTER TABLE "role" ADD "isSystem" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD "isActive" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "role" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(
      `UPDATE "role" SET "key" = 'super-admin', "name" = 'Super Admin', "description" = 'Owner-level role for administering DealrStack across the whole application.' WHERE "id" = 1`,
    );
    await queryRunner.query(
      `UPDATE "role" SET "key" = 'platform-user', "description" = 'Default platform user role.' WHERE "id" = 2`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_role_key" ON "role" ("key")`);
    await queryRunner.query(
      `CREATE INDEX "IDX_role_scope" ON "role" ("scope")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_role_is_active" ON "role" ("isActive")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_role_platform_key" ON "role" ("key") WHERE "scope" = 'platform' AND "tenantId" IS NULL AND "deletedAt" IS NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_role_tenant_key" ON "role" ("tenantId", "key") WHERE "scope" = 'tenant' AND "deletedAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "FK_role_tenant" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `CREATE TABLE "permission" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "domain" character varying NOT NULL, "label" character varying NOT NULL, "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_permission_key" UNIQUE ("key"), CONSTRAINT "PK_permission_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_permission_key" ON "permission" ("key")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_permission_domain" ON "permission" ("domain")`,
    );

    await queryRunner.query(
      `CREATE TABLE "role_permission" ("id" SERIAL NOT NULL, "roleId" integer, "permissionId" integer, CONSTRAINT "UQ_role_permission_role_permission" UNIQUE ("roleId", "permissionId"), CONSTRAINT "PK_role_permission_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_role_permission_role" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_role_permission_permission" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `CREATE TABLE "tenant_membership" ("id" SERIAL NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "title" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, "tenantId" integer, "roleId" integer, CONSTRAINT "UQ_tenant_membership_user_tenant" UNIQUE ("userId", "tenantId"), CONSTRAINT "PK_tenant_membership_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_tenant_membership_status" ON "tenant_membership" ("status")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant_membership" ADD CONSTRAINT "FK_tenant_membership_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant_membership" ADD CONSTRAINT "FK_tenant_membership_tenant" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant_membership" ADD CONSTRAINT "FK_tenant_membership_role" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tenant_membership" DROP CONSTRAINT "FK_tenant_membership_role"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant_membership" DROP CONSTRAINT "FK_tenant_membership_tenant"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant_membership" DROP CONSTRAINT "FK_tenant_membership_user"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_tenant_membership_status"`,
    );
    await queryRunner.query(`DROP TABLE "tenant_membership"`);
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP CONSTRAINT "FK_role_permission_permission"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP CONSTRAINT "FK_role_permission_role"`,
    );
    await queryRunner.query(`DROP TABLE "role_permission"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_permission_domain"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_permission_key"`);
    await queryRunner.query(`DROP TABLE "permission"`);
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "FK_role_tenant"`,
    );
    await queryRunner.query(`DROP INDEX "public"."UQ_role_tenant_key"`);
    await queryRunner.query(`DROP INDEX "public"."UQ_role_platform_key"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_role_is_active"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_role_scope"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_role_key"`);
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "isActive"`);
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "isSystem"`);
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "tenantId"`);
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "scope"`);
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "key"`);
    await queryRunner.query(
      `ALTER TABLE "role" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE IF EXISTS "role_id_seq"`);
  }
}
