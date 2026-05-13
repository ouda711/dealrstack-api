import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVehicles1778679600000 implements MigrationInterface {
  name = 'CreateVehicles1778679600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "vehicle" ("id" SERIAL NOT NULL, "make" character varying NOT NULL, "model" character varying NOT NULL, "year" integer, "bodyType" character varying, "vin" character varying, "plateNumber" character varying, "mileage" integer NOT NULL DEFAULT '0', "condition" character varying, "listingType" character varying NOT NULL DEFAULT 'sale', "status" character varying NOT NULL DEFAULT 'available', "price" numeric(14,2), "location" character varying, "exteriorColor" character varying, "interiorColor" character varying, "title" character varying, "description" text, "engineDetails" jsonb, "gearboxDetails" jsonb, "drivetrain" character varying, "categorizedFeatures" jsonb, "flaws" jsonb, "listedOnBehalfOf" jsonb, "saleOptions" jsonb, "auctionOptions" jsonb, "rentalOptions" jsonb, "media" jsonb, "highlights" jsonb, "equipment" jsonb, "modifications" jsonb, "videoLinks" jsonb, "backwardCompatibility" jsonb, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "tenantId" integer, "branchId" integer, "assignedToId" integer, CONSTRAINT "UQ_vehicle_tenant_vin" UNIQUE ("tenantId", "vin"), CONSTRAINT "UQ_vehicle_tenant_plate" UNIQUE ("tenantId", "plateNumber"), CONSTRAINT "PK_vehicle_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_make" ON "vehicle" ("make")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_model" ON "vehicle" ("model")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_year" ON "vehicle" ("year")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_vin" ON "vehicle" ("vin")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_plate_number" ON "vehicle" ("plateNumber")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_listing_type" ON "vehicle" ("listingType")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_status" ON "vehicle" ("status")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_is_active" ON "vehicle" ("isActive")`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle" ADD CONSTRAINT "FK_vehicle_tenant" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle" ADD CONSTRAINT "FK_vehicle_branch" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle" ADD CONSTRAINT "FK_vehicle_assigned_to" FOREIGN KEY ("assignedToId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vehicle" DROP CONSTRAINT "FK_vehicle_assigned_to"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle" DROP CONSTRAINT "FK_vehicle_branch"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle" DROP CONSTRAINT "FK_vehicle_tenant"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_vehicle_is_active"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_status"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_listing_type"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_plate_number"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_vin"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_year"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_model"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_make"`);
    await queryRunner.query(`DROP TABLE "vehicle"`);
  }
}
