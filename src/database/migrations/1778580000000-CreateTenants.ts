import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTenants1778580000000 implements MigrationInterface {
  name = 'CreateTenants1778580000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tenant" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "country" character varying NOT NULL, "timezone" character varying NOT NULL, "currency" character varying NOT NULL, "phone" character varying, "email" character varying, "website" character varying, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_tenant_slug" UNIQUE ("slug"), CONSTRAINT "PK_tenant_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_tenant_name" ON "tenant" ("name")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_tenant_slug" ON "tenant" ("slug")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_tenant_country" ON "tenant" ("country")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_tenant_is_active" ON "tenant" ("isActive")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_tenant_is_active"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_tenant_country"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_tenant_slug"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_tenant_name"`);
    await queryRunner.query(`DROP TABLE "tenant"`);
  }
}
