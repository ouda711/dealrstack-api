import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSalesDealImageUrl1779300000000 implements MigrationInterface {
  name = 'AddSalesDealImageUrl1779300000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales_deal" ADD "imageUrl" character varying(2048)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sales_deal" DROP COLUMN "imageUrl"`);
  }
}
