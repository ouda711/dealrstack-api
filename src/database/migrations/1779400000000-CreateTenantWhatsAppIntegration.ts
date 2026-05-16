import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTenantWhatsAppIntegration1779400000000 implements MigrationInterface {
  name = 'CreateTenantWhatsAppIntegration1779400000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tenant_whatsapp_integration" (
        "id" SERIAL NOT NULL,
        "tenantId" integer NOT NULL,
        "phoneNumberId" character varying(64) NOT NULL,
        "wabaId" character varying(64),
        "displayPhoneNumber" character varying(32),
        "accessToken" text NOT NULL,
        "isEnabled" boolean NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        CONSTRAINT "UQ_tenant_whatsapp_integration_tenant" UNIQUE ("tenantId"),
        CONSTRAINT "UQ_tenant_whatsapp_integration_phone_number_id" UNIQUE ("phoneNumberId"),
        CONSTRAINT "PK_tenant_whatsapp_integration_id" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_tenant_whatsapp_integration_tenant" ON "tenant_whatsapp_integration" ("tenantId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant_whatsapp_integration" ADD CONSTRAINT "FK_tenant_whatsapp_integration_tenant" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_message" ADD "whatsappMessageId" character varying(128)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_sales_message_whatsapp_message_id" ON "sales_message" ("whatsappMessageId") WHERE "whatsappMessageId" IS NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."UQ_sales_message_whatsapp_message_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_message" DROP COLUMN "whatsappMessageId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant_whatsapp_integration" DROP CONSTRAINT "FK_tenant_whatsapp_integration_tenant"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_tenant_whatsapp_integration_tenant"`,
    );
    await queryRunner.query(`DROP TABLE "tenant_whatsapp_integration"`);
  }
}
