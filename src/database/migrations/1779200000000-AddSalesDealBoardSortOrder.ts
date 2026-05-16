import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSalesDealBoardSortOrder1779200000000 implements MigrationInterface {
  name = 'AddSalesDealBoardSortOrder1779200000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales_deal" ADD "boardSortOrder" integer NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales_deal" DROP COLUMN "boardSortOrder"`,
    );
  }
}
