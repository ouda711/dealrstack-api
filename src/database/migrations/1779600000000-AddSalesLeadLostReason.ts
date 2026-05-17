import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSalesLeadLostReason1779600000000 implements MigrationInterface {
  name = 'AddSalesLeadLostReason1779600000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales_lead" ADD "lostReason" character varying(255)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales_lead" DROP COLUMN "lostReason"`,
    );
  }
}
