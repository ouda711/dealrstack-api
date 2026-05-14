import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVehicleMediaAndDocuments1778680800000 implements MigrationInterface {
  name = 'AddVehicleMediaAndDocuments1778680800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "vehicle_media" ("id" SERIAL NOT NULL, "kind" character varying NOT NULL, "url" character varying(2048) NOT NULL, "caption" character varying, "sortOrder" integer NOT NULL DEFAULT 0, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "vehicleId" integer NOT NULL, CONSTRAINT "PK_vehicle_media_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vehicle_document" ("id" SERIAL NOT NULL, "documentType" character varying NOT NULL, "title" character varying(255) NOT NULL, "url" character varying(2048) NOT NULL, "notes" text, "expiresAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "vehicleId" integer NOT NULL, CONSTRAINT "PK_vehicle_document_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_media_vehicleId" ON "vehicle_media" ("vehicleId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_media_kind" ON "vehicle_media" ("kind")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_document_vehicleId" ON "vehicle_document" ("vehicleId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_document_documentType" ON "vehicle_document" ("documentType")`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_media" ADD CONSTRAINT "FK_vehicle_media_vehicle" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_document" ADD CONSTRAINT "FK_vehicle_document_vehicle" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vehicle_document" DROP CONSTRAINT "FK_vehicle_document_vehicle"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_media" DROP CONSTRAINT "FK_vehicle_media_vehicle"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_vehicle_document_documentType"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_document_vehicleId"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_media_kind"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_media_vehicleId"`);
    await queryRunner.query(`DROP TABLE "vehicle_document"`);
    await queryRunner.query(`DROP TABLE "vehicle_media"`);
  }
}
