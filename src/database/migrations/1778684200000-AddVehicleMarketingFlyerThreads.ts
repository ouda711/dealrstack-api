import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVehicleMarketingFlyerThreads1778684200000 implements MigrationInterface {
  name = 'AddVehicleMarketingFlyerThreads1778684200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "vehicle_marketing_thread" ("id" SERIAL NOT NULL, "title" character varying(255), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "vehicleId" integer NOT NULL, "parentThreadId" integer, CONSTRAINT "PK_vehicle_marketing_thread_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_marketing_thread_vehicleId" ON "vehicle_marketing_thread" ("vehicleId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_marketing_thread_parentThreadId" ON "vehicle_marketing_thread" ("parentThreadId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_marketing_thread" ADD CONSTRAINT "FK_vehicle_marketing_thread_vehicle" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_marketing_thread" ADD CONSTRAINT "FK_vehicle_marketing_thread_parent" FOREIGN KEY ("parentThreadId") REFERENCES "vehicle_marketing_thread"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `CREATE TABLE "vehicle_marketing_message" ("id" SERIAL NOT NULL, "role" character varying(16) NOT NULL, "content" text NOT NULL DEFAULT '', "artifact" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "threadId" integer NOT NULL, CONSTRAINT "PK_vehicle_marketing_message_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_marketing_message_threadId" ON "vehicle_marketing_message" ("threadId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_marketing_message_createdAt" ON "vehicle_marketing_message" ("createdAt")`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_marketing_message" ADD CONSTRAINT "FK_vehicle_marketing_message_thread" FOREIGN KEY ("threadId") REFERENCES "vehicle_marketing_thread"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vehicle_marketing_message" DROP CONSTRAINT "FK_vehicle_marketing_message_thread"`,
    );
    await queryRunner.query(
      `DROP INDEX "IDX_vehicle_marketing_message_createdAt"`,
    );
    await queryRunner.query(
      `DROP INDEX "IDX_vehicle_marketing_message_threadId"`,
    );
    await queryRunner.query(`DROP TABLE "vehicle_marketing_message"`);

    await queryRunner.query(
      `ALTER TABLE "vehicle_marketing_thread" DROP CONSTRAINT "FK_vehicle_marketing_thread_parent"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_marketing_thread" DROP CONSTRAINT "FK_vehicle_marketing_thread_vehicle"`,
    );
    await queryRunner.query(
      `DROP INDEX "IDX_vehicle_marketing_thread_parentThreadId"`,
    );
    await queryRunner.query(
      `DROP INDEX "IDX_vehicle_marketing_thread_vehicleId"`,
    );
    await queryRunner.query(`DROP TABLE "vehicle_marketing_thread"`);
  }
}
