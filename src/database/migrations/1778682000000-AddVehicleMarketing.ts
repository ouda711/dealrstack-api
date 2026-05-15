import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVehicleMarketing1778682000000 implements MigrationInterface {
  name = 'AddVehicleMarketing1778682000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vehicle" ADD "listingSlug" character varying(64)`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle" ADD "shareLinkClickCount" integer NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_vehicle_tenant_listing_slug" ON "vehicle" ("tenantId", "listingSlug") WHERE "listingSlug" IS NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TABLE "vehicle_listing_view" ("id" SERIAL NOT NULL, "source" character varying(64) NOT NULL DEFAULT 'direct', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "vehicleId" integer NOT NULL, CONSTRAINT "PK_vehicle_listing_view_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_listing_view_vehicleId" ON "vehicle_listing_view" ("vehicleId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_listing_view_createdAt" ON "vehicle_listing_view" ("createdAt")`,
    );
    await queryRunner.query(
      `CREATE TABLE "vehicle_share_link" ("id" SERIAL NOT NULL, "channel" character varying(64) NOT NULL, "url" character varying(2048) NOT NULL, "clickCount" integer NOT NULL DEFAULT 0, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "vehicleId" integer NOT NULL, CONSTRAINT "PK_vehicle_share_link_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_vehicle_share_link_vehicle_channel" ON "vehicle_share_link" ("vehicleId", "channel")`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_listing_view" ADD CONSTRAINT "FK_vehicle_listing_view_vehicle" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_share_link" ADD CONSTRAINT "FK_vehicle_share_link_vehicle" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vehicle_share_link" DROP CONSTRAINT "FK_vehicle_share_link_vehicle"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_listing_view" DROP CONSTRAINT "FK_vehicle_listing_view_vehicle"`,
    );
    await queryRunner.query(
      `DROP INDEX "UQ_vehicle_share_link_vehicle_channel"`,
    );
    await queryRunner.query(`DROP TABLE "vehicle_share_link"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_listing_view_createdAt"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_listing_view_vehicleId"`);
    await queryRunner.query(`DROP TABLE "vehicle_listing_view"`);
    await queryRunner.query(`DROP INDEX "UQ_vehicle_tenant_listing_slug"`);
    await queryRunner.query(
      `ALTER TABLE "vehicle" DROP COLUMN "shareLinkClickCount"`,
    );
    await queryRunner.query(`ALTER TABLE "vehicle" DROP COLUMN "listingSlug"`);
  }
}
