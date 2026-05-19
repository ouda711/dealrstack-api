import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSalesCalendarConnections1780000000000 implements MigrationInterface {
  name = 'CreateSalesCalendarConnections1780000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."sales_calendar_provider_enum" AS ENUM('google', 'outlook')`,
    );
    await queryRunner.query(
      `CREATE TABLE "sales_calendar_connection" (
        "id" SERIAL NOT NULL,
        "tenantId" integer NOT NULL,
        "userId" integer NOT NULL,
        "provider" "public"."sales_calendar_provider_enum" NOT NULL,
        "calendarId" character varying(512),
        "accessToken" text NOT NULL,
        "refreshToken" text,
        "tokenExpiresAt" TIMESTAMP WITH TIME ZONE,
        "syncEnabled" boolean NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_sales_calendar_connection_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_sales_calendar_connection_tenant_user_provider" UNIQUE ("tenantId", "userId", "provider")
      )`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_calendar_connection" ADD CONSTRAINT "FK_sales_calendar_connection_tenant" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_calendar_connection" ADD CONSTRAINT "FK_sales_calendar_connection_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_appointment" ADD "externalCalendarEventId" character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_appointment" ADD "externalCalendarProvider" "public"."sales_calendar_provider_enum"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales_appointment" DROP COLUMN "externalCalendarProvider"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_appointment" DROP COLUMN "externalCalendarEventId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_calendar_connection" DROP CONSTRAINT "FK_sales_calendar_connection_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_calendar_connection" DROP CONSTRAINT "FK_sales_calendar_connection_tenant"`,
    );
    await queryRunner.query(`DROP TABLE "sales_calendar_connection"`);
    await queryRunner.query(
      `DROP TYPE "public"."sales_calendar_provider_enum"`,
    );
  }
}
