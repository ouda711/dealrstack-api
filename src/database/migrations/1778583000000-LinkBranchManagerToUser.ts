import { MigrationInterface, QueryRunner } from 'typeorm';

export class LinkBranchManagerToUser1778583000000 implements MigrationInterface {
  name = 'LinkBranchManagerToUser1778583000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "branch" ADD "managerId" integer`);
    await queryRunner.query(
      `CREATE INDEX "IDX_branch_manager_id" ON "branch" ("managerId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "branch" ADD CONSTRAINT "FK_branch_manager_user" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "branch" DROP COLUMN "managerEmail"`);
    await queryRunner.query(`ALTER TABLE "branch" DROP COLUMN "managerPhone"`);
    await queryRunner.query(`ALTER TABLE "branch" DROP COLUMN "managerName"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "branch" ADD "managerName" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "branch" ADD "managerPhone" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "branch" ADD "managerEmail" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "branch" DROP CONSTRAINT "FK_branch_manager_user"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_branch_manager_id"`);
    await queryRunner.query(`ALTER TABLE "branch" DROP COLUMN "managerId"`);
  }
}
