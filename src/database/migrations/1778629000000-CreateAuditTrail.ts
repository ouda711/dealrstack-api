import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuditTrail1778629000000 implements MigrationInterface {
  name = 'CreateAuditTrail1778629000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "audit_trail" ("id" SERIAL NOT NULL, "action" character varying NOT NULL, "description" text NOT NULL, "metadata" jsonb, "occurredAt" TIMESTAMP NOT NULL DEFAULT now(), "tenantId" integer, "branchId" integer, "actorId" integer, CONSTRAINT "PK_audit_trail_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_audit_trail_action" ON "audit_trail" ("action")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_audit_trail_occurred_at" ON "audit_trail" ("occurredAt")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_audit_trail_tenant_id" ON "audit_trail" ("tenantId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_audit_trail_branch_id" ON "audit_trail" ("branchId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "audit_trail" ADD CONSTRAINT "FK_audit_trail_tenant" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "audit_trail" ADD CONSTRAINT "FK_audit_trail_branch" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "audit_trail" ADD CONSTRAINT "FK_audit_trail_actor" FOREIGN KEY ("actorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "audit_trail" DROP CONSTRAINT "FK_audit_trail_actor"`,
    );
    await queryRunner.query(
      `ALTER TABLE "audit_trail" DROP CONSTRAINT "FK_audit_trail_branch"`,
    );
    await queryRunner.query(
      `ALTER TABLE "audit_trail" DROP CONSTRAINT "FK_audit_trail_tenant"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_audit_trail_branch_id"`);
    await queryRunner.query(`DROP INDEX "IDX_audit_trail_tenant_id"`);
    await queryRunner.query(`DROP INDEX "IDX_audit_trail_occurred_at"`);
    await queryRunner.query(`DROP INDEX "IDX_audit_trail_action"`);
    await queryRunner.query(`DROP TABLE "audit_trail"`);
  }
}
