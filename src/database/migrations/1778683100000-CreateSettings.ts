import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSettings1778683100000 implements MigrationInterface {
  name = 'CreateSettings1778683100000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "settings" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "value" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_settings_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_settings_name" ON "settings" ("name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_settings_name"`);
    await queryRunner.query(`DROP TABLE "settings"`);
  }
}
