import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSalesPipeline1779000000000 implements MigrationInterface {
  name = 'CreateSalesPipeline1779000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sales_pipeline" ("id" SERIAL NOT NULL, "tenantId" integer, "branchId" integer, "isSystemDefault" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_sales_pipeline_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_sales_pipeline_tenant_id" ON "sales_pipeline" ("tenantId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_sales_pipeline_branch_id" ON "sales_pipeline" ("branchId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_sales_pipeline_is_system_default" ON "sales_pipeline" ("isSystemDefault")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_sales_pipeline_system_default" ON "sales_pipeline" ("isSystemDefault") WHERE "isSystemDefault" = true`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_sales_pipeline_tenant_default" ON "sales_pipeline" ("tenantId") WHERE "branchId" IS NULL AND "tenantId" IS NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_sales_pipeline_branch" ON "sales_pipeline" ("tenantId", "branchId") WHERE "branchId" IS NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_pipeline" ADD CONSTRAINT "FK_sales_pipeline_tenant" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_pipeline" ADD CONSTRAINT "FK_sales_pipeline_branch" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `CREATE TABLE "sales_pipeline_stage" ("id" SERIAL NOT NULL, "pipelineId" integer NOT NULL, "stageKey" character varying(50) NOT NULL, "label" character varying(100) NOT NULL, "sortOrder" integer NOT NULL DEFAULT '0', "color" character varying(20) NOT NULL DEFAULT 'default', "isWonStage" boolean NOT NULL DEFAULT false, "isLostStage" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_sales_pipeline_stage_pipeline_key" UNIQUE ("pipelineId", "stageKey"), CONSTRAINT "PK_sales_pipeline_stage_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_sales_pipeline_stage_pipeline_id" ON "sales_pipeline_stage" ("pipelineId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_sales_pipeline_stage_stage_key" ON "sales_pipeline_stage" ("stageKey")`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_pipeline_stage" ADD CONSTRAINT "FK_sales_pipeline_stage_pipeline" FOREIGN KEY ("pipelineId") REFERENCES "sales_pipeline"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales_pipeline_stage" DROP CONSTRAINT "FK_sales_pipeline_stage_pipeline"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_sales_pipeline_stage_stage_key"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_sales_pipeline_stage_pipeline_id"`,
    );
    await queryRunner.query(`DROP TABLE "sales_pipeline_stage"`);
    await queryRunner.query(
      `ALTER TABLE "sales_pipeline" DROP CONSTRAINT "FK_sales_pipeline_branch"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_pipeline" DROP CONSTRAINT "FK_sales_pipeline_tenant"`,
    );
    await queryRunner.query(`DROP INDEX "public"."UQ_sales_pipeline_branch"`);
    await queryRunner.query(
      `DROP INDEX "public"."UQ_sales_pipeline_tenant_default"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."UQ_sales_pipeline_system_default"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_sales_pipeline_is_system_default"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_sales_pipeline_branch_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_sales_pipeline_tenant_id"`,
    );
    await queryRunner.query(`DROP TABLE "sales_pipeline"`);
  }
}
