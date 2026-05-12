import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBranches1778581800000 implements MigrationInterface {
  name = 'CreateBranches1778581800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "branch" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "city" character varying NOT NULL, "address" character varying, "phone" character varying, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "tenantId" integer, CONSTRAINT "UQ_branch_tenant_code" UNIQUE ("tenantId", "code"), CONSTRAINT "PK_branch_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_branch_name" ON "branch" ("name")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_branch_code" ON "branch" ("code")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_branch_city" ON "branch" ("city")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_branch_is_active" ON "branch" ("isActive")`,
    );
    await queryRunner.query(
      `ALTER TABLE "branch" ADD CONSTRAINT "FK_branch_tenant" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "branch" DROP CONSTRAINT "FK_branch_tenant"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_branch_is_active"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_branch_city"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_branch_code"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_branch_name"`);
    await queryRunner.query(`DROP TABLE "branch"`);
  }
}
