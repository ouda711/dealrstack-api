import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLeadCaptureHardening1779700000000 implements MigrationInterface {
  name = 'AddLeadCaptureHardening1779700000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tenant" ADD "metaPageAccessToken" character varying(512)`,
    );
    await queryRunner.query(
      `CREATE TABLE "sales_lead_capture_event" (
        "id" SERIAL NOT NULL,
        "tenantId" integer NOT NULL,
        "source" character varying(32) NOT NULL,
        "externalId" character varying(128) NOT NULL,
        "leadId" integer,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_sales_lead_capture_event_id" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_sales_lead_capture_event" ON "sales_lead_capture_event" ("tenantId", "source", "externalId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_sales_lead_capture_event_tenant" ON "sales_lead_capture_event" ("tenantId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_lead_capture_event" ADD CONSTRAINT "FK_sales_lead_capture_event_tenant" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_lead_capture_event" ADD CONSTRAINT "FK_sales_lead_capture_event_lead" FOREIGN KEY ("leadId") REFERENCES "sales_lead"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales_lead_capture_event" DROP CONSTRAINT "FK_sales_lead_capture_event_lead"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_lead_capture_event" DROP CONSTRAINT "FK_sales_lead_capture_event_tenant"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_sales_lead_capture_event_tenant"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."UQ_sales_lead_capture_event"`,
    );
    await queryRunner.query(`DROP TABLE "sales_lead_capture_event"`);
    await queryRunner.query(
      `ALTER TABLE "tenant" DROP COLUMN "metaPageAccessToken"`,
    );
  }
}
