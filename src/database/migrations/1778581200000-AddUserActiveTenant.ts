import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserActiveTenant1778581200000 implements MigrationInterface {
  name = 'AddUserActiveTenant1778581200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "activeTenantId" integer`);
    await queryRunner.query(
      `CREATE INDEX "IDX_user_active_tenant" ON "user" ("activeTenantId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_user_active_tenant" FOREIGN KEY ("activeTenantId") REFERENCES "tenant"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_user_active_tenant"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_user_active_tenant"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "activeTenantId"`);
  }
}
