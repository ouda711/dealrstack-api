import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBranchManagementFields1778582400000 implements MigrationInterface {
  name = 'AddBranchManagementFields1778582400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
      `ALTER TABLE "branch" ADD "openingHours" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "branch" DROP COLUMN "openingHours"`);
    await queryRunner.query(`ALTER TABLE "branch" DROP COLUMN "managerEmail"`);
    await queryRunner.query(`ALTER TABLE "branch" DROP COLUMN "managerPhone"`);
    await queryRunner.query(`ALTER TABLE "branch" DROP COLUMN "managerName"`);
  }
}
