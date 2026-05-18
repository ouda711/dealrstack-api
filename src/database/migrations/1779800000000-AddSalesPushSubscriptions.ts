import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSalesPushSubscriptions1779800000000 implements MigrationInterface {
  name = 'AddSalesPushSubscriptions1779800000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sales_push_subscription" (
        "id" SERIAL NOT NULL,
        "tenantId" integer NOT NULL,
        "userId" integer NOT NULL,
        "endpoint" text NOT NULL,
        "p256dh" character varying(255) NOT NULL,
        "auth" character varying(128) NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_sales_push_subscription_id" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_sales_push_subscription_endpoint" ON "sales_push_subscription" ("endpoint")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_sales_push_subscription_tenant_user" ON "sales_push_subscription" ("tenantId", "userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_push_subscription" ADD CONSTRAINT "FK_sales_push_subscription_tenant" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_push_subscription" ADD CONSTRAINT "FK_sales_push_subscription_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales_push_subscription" DROP CONSTRAINT "FK_sales_push_subscription_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_push_subscription" DROP CONSTRAINT "FK_sales_push_subscription_tenant"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_sales_push_subscription_tenant_user"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."UQ_sales_push_subscription_endpoint"`,
    );
    await queryRunner.query(`DROP TABLE "sales_push_subscription"`);
  }
}
