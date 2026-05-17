import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTenantLeadCaptureFields1779500000000 implements MigrationInterface {
  name = 'AddTenantLeadCaptureFields1779500000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tenant" ADD "websiteLeadCaptureToken" character varying(64)`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant" ADD "metaPageId" character varying(32)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_tenant_website_lead_capture_token" ON "tenant" ("websiteLeadCaptureToken") WHERE "websiteLeadCaptureToken" IS NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_tenant_meta_page_id" ON "tenant" ("metaPageId") WHERE "metaPageId" IS NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_tenant_meta_page_id"`);
    await queryRunner.query(
      `DROP INDEX "public"."UQ_tenant_website_lead_capture_token"`,
    );
    await queryRunner.query(`ALTER TABLE "tenant" DROP COLUMN "metaPageId"`);
    await queryRunner.query(
      `ALTER TABLE "tenant" DROP COLUMN "websiteLeadCaptureToken"`,
    );
  }
}
