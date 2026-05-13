import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVehicleCatalog1778679700000 implements MigrationInterface {
  name = 'AddVehicleCatalog1778679700000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "vehicle_brand" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "logoUrl" character varying, "foundingYear" integer, "countryOfOrigin" character varying, "isFeatured" boolean NOT NULL DEFAULT false, "isLuxuryBrand" boolean NOT NULL DEFAULT false, "marketRank" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_vehicle_brand_name" UNIQUE ("name"), CONSTRAINT "UQ_vehicle_brand_slug" UNIQUE ("slug"), CONSTRAINT "PK_vehicle_brand_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vehicle_body_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "code" character varying, "iconUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_vehicle_body_type_name" UNIQUE ("name"), CONSTRAINT "UQ_vehicle_body_type_slug" UNIQUE ("slug"), CONSTRAINT "PK_vehicle_body_type_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vehicle_model" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "productionStartYear" integer, "productionEndYear" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "brandId" integer, "bodyTypeId" integer, CONSTRAINT "UQ_vehicle_model_brand_slug" UNIQUE ("brandId", "slug"), CONSTRAINT "PK_vehicle_model_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vehicle_generation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "startYear" integer, "endYear" integer, "platformCode" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "modelId" integer, CONSTRAINT "UQ_vehicle_generation_model_slug" UNIQUE ("modelId", "slug"), CONSTRAINT "PK_vehicle_generation_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vehicle_trim" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "code" character varying, "specifications" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "modelId" integer, CONSTRAINT "UQ_vehicle_trim_model_slug" UNIQUE ("modelId", "slug"), CONSTRAINT "PK_vehicle_trim_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vehicle_engine" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "type" character varying, "displacement" numeric(5,1), "horsepower" integer, "torque" integer, "transmission" character varying, "gears" integer, "drivetrain" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "brandId" integer, "modelId" integer, CONSTRAINT "UQ_vehicle_engine_brand_model_slug" UNIQUE ("brandId", "modelId", "slug"), CONSTRAINT "PK_vehicle_engine_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_brand_name" ON "vehicle_brand" ("name")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_brand_slug" ON "vehicle_brand" ("slug")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_body_type_name" ON "vehicle_body_type" ("name")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_body_type_slug" ON "vehicle_body_type" ("slug")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_model_name" ON "vehicle_model" ("name")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_model_slug" ON "vehicle_model" ("slug")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_generation_name" ON "vehicle_generation" ("name")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_generation_slug" ON "vehicle_generation" ("slug")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_trim_name" ON "vehicle_trim" ("name")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_trim_slug" ON "vehicle_trim" ("slug")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_engine_name" ON "vehicle_engine" ("name")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_vehicle_engine_slug" ON "vehicle_engine" ("slug")`,
    );
    await queryRunner.query(`ALTER TABLE "vehicle" ADD "brandId" integer`);
    await queryRunner.query(`ALTER TABLE "vehicle" ADD "modelId" integer`);
    await queryRunner.query(`ALTER TABLE "vehicle" ADD "generationId" integer`);
    await queryRunner.query(`ALTER TABLE "vehicle" ADD "trimId" integer`);
    await queryRunner.query(`ALTER TABLE "vehicle" ADD "engineId" integer`);
    await queryRunner.query(`ALTER TABLE "vehicle" ADD "bodyTypeId" integer`);
    await queryRunner.query(
      `ALTER TABLE "vehicle_model" ADD CONSTRAINT "FK_vehicle_model_brand" FOREIGN KEY ("brandId") REFERENCES "vehicle_brand"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_model" ADD CONSTRAINT "FK_vehicle_model_body_type" FOREIGN KEY ("bodyTypeId") REFERENCES "vehicle_body_type"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_generation" ADD CONSTRAINT "FK_vehicle_generation_model" FOREIGN KEY ("modelId") REFERENCES "vehicle_model"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_trim" ADD CONSTRAINT "FK_vehicle_trim_model" FOREIGN KEY ("modelId") REFERENCES "vehicle_model"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_engine" ADD CONSTRAINT "FK_vehicle_engine_brand" FOREIGN KEY ("brandId") REFERENCES "vehicle_brand"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_engine" ADD CONSTRAINT "FK_vehicle_engine_model" FOREIGN KEY ("modelId") REFERENCES "vehicle_model"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle" ADD CONSTRAINT "FK_vehicle_brand" FOREIGN KEY ("brandId") REFERENCES "vehicle_brand"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle" ADD CONSTRAINT "FK_vehicle_model" FOREIGN KEY ("modelId") REFERENCES "vehicle_model"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle" ADD CONSTRAINT "FK_vehicle_generation" FOREIGN KEY ("generationId") REFERENCES "vehicle_generation"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle" ADD CONSTRAINT "FK_vehicle_trim" FOREIGN KEY ("trimId") REFERENCES "vehicle_trim"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle" ADD CONSTRAINT "FK_vehicle_engine" FOREIGN KEY ("engineId") REFERENCES "vehicle_engine"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle" ADD CONSTRAINT "FK_vehicle_body_type" FOREIGN KEY ("bodyTypeId") REFERENCES "vehicle_body_type"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vehicle" DROP CONSTRAINT "FK_vehicle_body_type"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle" DROP CONSTRAINT "FK_vehicle_engine"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle" DROP CONSTRAINT "FK_vehicle_trim"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle" DROP CONSTRAINT "FK_vehicle_generation"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle" DROP CONSTRAINT "FK_vehicle_model"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle" DROP CONSTRAINT "FK_vehicle_brand"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_engine" DROP CONSTRAINT "FK_vehicle_engine_model"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_engine" DROP CONSTRAINT "FK_vehicle_engine_brand"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_trim" DROP CONSTRAINT "FK_vehicle_trim_model"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_generation" DROP CONSTRAINT "FK_vehicle_generation_model"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_model" DROP CONSTRAINT "FK_vehicle_model_body_type"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_model" DROP CONSTRAINT "FK_vehicle_model_brand"`,
    );
    await queryRunner.query(`ALTER TABLE "vehicle" DROP COLUMN "bodyTypeId"`);
    await queryRunner.query(`ALTER TABLE "vehicle" DROP COLUMN "engineId"`);
    await queryRunner.query(`ALTER TABLE "vehicle" DROP COLUMN "trimId"`);
    await queryRunner.query(`ALTER TABLE "vehicle" DROP COLUMN "generationId"`);
    await queryRunner.query(`ALTER TABLE "vehicle" DROP COLUMN "modelId"`);
    await queryRunner.query(`ALTER TABLE "vehicle" DROP COLUMN "brandId"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_engine_slug"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_engine_name"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_trim_slug"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_trim_name"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_generation_slug"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_generation_name"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_model_slug"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_model_name"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_body_type_slug"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_body_type_name"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_brand_slug"`);
    await queryRunner.query(`DROP INDEX "IDX_vehicle_brand_name"`);
    await queryRunner.query(`DROP TABLE "vehicle_engine"`);
    await queryRunner.query(`DROP TABLE "vehicle_trim"`);
    await queryRunner.query(`DROP TABLE "vehicle_generation"`);
    await queryRunner.query(`DROP TABLE "vehicle_model"`);
    await queryRunner.query(`DROP TABLE "vehicle_body_type"`);
    await queryRunner.query(`DROP TABLE "vehicle_brand"`);
  }
}
