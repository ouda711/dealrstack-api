import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSalesAppointments1779900000000 implements MigrationInterface {
  name = 'CreateSalesAppointments1779900000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."sales_appointment_type_enum" AS ENUM('test_drive', 'visit', 'call', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sales_appointment_status_enum" AS ENUM('scheduled', 'completed', 'cancelled', 'no_show')`,
    );
    await queryRunner.query(
      `CREATE TABLE "sales_appointment" (
        "id" SERIAL NOT NULL,
        "tenantId" integer NOT NULL,
        "demoKey" character varying(64),
        "leadId" integer NOT NULL,
        "dealId" integer,
        "vehicleId" integer,
        "assignedUserId" integer,
        "type" "public"."sales_appointment_type_enum" NOT NULL,
        "status" "public"."sales_appointment_status_enum" NOT NULL DEFAULT 'scheduled',
        "scheduledAt" TIMESTAMP WITH TIME ZONE NOT NULL,
        "durationMinutes" integer NOT NULL DEFAULT 60,
        "location" character varying(255),
        "notes" character varying(1000),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        CONSTRAINT "PK_sales_appointment_id" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_sales_appointment_tenant_demo_key" ON "sales_appointment" ("tenantId", "demoKey") WHERE "demoKey" IS NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_sales_appointment_tenant_scheduled" ON "sales_appointment" ("tenantId", "scheduledAt")`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_appointment" ADD CONSTRAINT "FK_sales_appointment_tenant" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_appointment" ADD CONSTRAINT "FK_sales_appointment_lead" FOREIGN KEY ("leadId") REFERENCES "sales_lead"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_appointment" ADD CONSTRAINT "FK_sales_appointment_deal" FOREIGN KEY ("dealId") REFERENCES "sales_deal"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_appointment" ADD CONSTRAINT "FK_sales_appointment_vehicle" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_appointment" ADD CONSTRAINT "FK_sales_appointment_assigned_user" FOREIGN KEY ("assignedUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales_appointment" DROP CONSTRAINT "FK_sales_appointment_assigned_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_appointment" DROP CONSTRAINT "FK_sales_appointment_vehicle"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_appointment" DROP CONSTRAINT "FK_sales_appointment_deal"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_appointment" DROP CONSTRAINT "FK_sales_appointment_lead"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_appointment" DROP CONSTRAINT "FK_sales_appointment_tenant"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_sales_appointment_tenant_scheduled"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."UQ_sales_appointment_tenant_demo_key"`,
    );
    await queryRunner.query(`DROP TABLE "sales_appointment"`);
    await queryRunner.query(
      `DROP TYPE "public"."sales_appointment_status_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."sales_appointment_type_enum"`);
  }
}
