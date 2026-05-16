import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSalesWorkspaceData1779100000000 implements MigrationInterface {
  name = 'CreateSalesWorkspaceData1779100000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."sales_lead_source_enum" AS ENUM('whatsapp', 'website', 'facebook', 'instagram', 'phone', 'walk_in', 'csv', 'jiji', 'cheki', 'manual')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sales_lead_status_enum" AS ENUM('new', 'contacted', 'qualified', 'nurturing', 'won', 'lost')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sales_lead_priority_enum" AS ENUM('low', 'normal', 'high', 'urgent')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sales_activity_type_enum" AS ENUM('call', 'whatsapp', 'email', 'visit', 'note', 'follow_up')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sales_follow_up_status_enum" AS ENUM('pending', 'completed', 'overdue', 'skipped')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sales_notification_kind_enum" AS ENUM('new_lead', 'customer_reply', 'missed_follow_up', 'reassigned_lead', 'deposit', 'appointment')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sales_assignment_rule_type_enum" AS ENUM('round_robin', 'branch', 'vehicle_type', 'availability', 'geography', 'manual')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sales_message_direction_enum" AS ENUM('inbound', 'outbound')`,
    );

    await queryRunner.query(
      `CREATE TABLE "sales_lead" ("id" SERIAL NOT NULL, "tenantId" integer NOT NULL, "branchId" integer NOT NULL, "demoKey" character varying(64), "source" "public"."sales_lead_source_enum" NOT NULL, "status" "public"."sales_lead_status_enum" NOT NULL DEFAULT 'new', "priority" "public"."sales_lead_priority_enum" NOT NULL DEFAULT 'normal', "customerName" character varying(150) NOT NULL, "customerPhone" character varying(32) NOT NULL, "interestSummary" character varying(500) NOT NULL, "vehicleId" integer, "assignedUserId" integer, "assignmentReason" character varying(255), "unread" boolean NOT NULL DEFAULT false, "slaDueAt" TIMESTAMP WITH TIME ZONE NOT NULL, "lastActivityAt" TIMESTAMP WITH TIME ZONE NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_sales_lead_tenant_demo_key" UNIQUE ("tenantId", "demoKey"), CONSTRAINT "PK_sales_lead_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sales_conversation" ("id" SERIAL NOT NULL, "tenantId" integer NOT NULL, "branchId" integer NOT NULL, "leadId" integer NOT NULL, "demoKey" character varying(64), "customerName" character varying(150) NOT NULL, "customerPhone" character varying(32) NOT NULL, "assignedUserId" integer NOT NULL, "unreadCount" integer NOT NULL DEFAULT '0', "lastMessagePreview" character varying(500) NOT NULL, "lastMessageAt" TIMESTAMP WITH TIME ZONE NOT NULL, "internalNotes" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_sales_conversation_tenant_demo_key" UNIQUE ("tenantId", "demoKey"), CONSTRAINT "PK_sales_conversation_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sales_deal" ("id" SERIAL NOT NULL, "tenantId" integer NOT NULL, "branchId" integer NOT NULL, "leadId" integer NOT NULL, "conversationId" integer, "demoKey" character varying(64), "stageKey" character varying(50) NOT NULL, "title" character varying(200) NOT NULL, "valueKes" bigint NOT NULL DEFAULT '0', "assignedUserId" integer NOT NULL, "assignmentReason" character varying(255), "lastActivityAt" TIMESTAMP WITH TIME ZONE NOT NULL, "inactiveDays" integer NOT NULL DEFAULT '0', "slaDueAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_sales_deal_tenant_demo_key" UNIQUE ("tenantId", "demoKey"), CONSTRAINT "PK_sales_deal_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sales_message" ("id" SERIAL NOT NULL, "conversationId" integer NOT NULL, "demoKey" character varying(64), "direction" "public"."sales_message_direction_enum" NOT NULL, "body" text NOT NULL, "sentAt" TIMESTAMP WITH TIME ZONE NOT NULL, "isTemplate" boolean NOT NULL DEFAULT false, "mediaType" character varying(20), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_sales_message_demo_key" UNIQUE ("conversationId", "demoKey"), CONSTRAINT "PK_sales_message_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sales_activity" ("id" SERIAL NOT NULL, "tenantId" integer NOT NULL, "demoKey" character varying(64), "leadId" integer, "dealId" integer, "type" "public"."sales_activity_type_enum" NOT NULL, "summary" character varying(500) NOT NULL, "dueAt" TIMESTAMP WITH TIME ZONE, "completedAt" TIMESTAMP WITH TIME ZONE, "status" "public"."sales_follow_up_status_enum" NOT NULL DEFAULT 'pending', "automated" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_sales_activity_tenant_demo_key" UNIQUE ("tenantId", "demoKey"), CONSTRAINT "PK_sales_activity_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sales_notification" ("id" SERIAL NOT NULL, "tenantId" integer NOT NULL, "demoKey" character varying(64), "kind" "public"."sales_notification_kind_enum" NOT NULL, "title" character varying(200) NOT NULL, "body" character varying(500) NOT NULL, "leadId" integer, "dealId" integer, "read" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_sales_notification_tenant_demo_key" UNIQUE ("tenantId", "demoKey"), CONSTRAINT "PK_sales_notification_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sales_assignment_rule" ("id" SERIAL NOT NULL, "tenantId" integer NOT NULL, "demoKey" character varying(64), "type" "public"."sales_assignment_rule_type_enum" NOT NULL, "label" character varying(120) NOT NULL, "description" character varying(500) NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "priority" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_sales_assignment_rule_tenant_demo_key" UNIQUE ("tenantId", "demoKey"), CONSTRAINT "PK_sales_assignment_rule_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sales_follow_up_rule" ("id" SERIAL NOT NULL, "tenantId" integer NOT NULL, "demoKey" character varying(64), "label" character varying(120) NOT NULL, "trigger" character varying(120) NOT NULL, "delayMinutes" integer NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_sales_follow_up_rule_tenant_demo_key" UNIQUE ("tenantId", "demoKey"), CONSTRAINT "PK_sales_follow_up_rule_id" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `ALTER TABLE "sales_lead" ADD CONSTRAINT "FK_sales_lead_tenant" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_lead" ADD CONSTRAINT "FK_sales_lead_branch" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_lead" ADD CONSTRAINT "FK_sales_lead_assigned_user" FOREIGN KEY ("assignedUserId") REFERENCES "user"("id") ON DELETE SET NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_conversation" ADD CONSTRAINT "FK_sales_conversation_tenant" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_conversation" ADD CONSTRAINT "FK_sales_conversation_branch" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_conversation" ADD CONSTRAINT "FK_sales_conversation_lead" FOREIGN KEY ("leadId") REFERENCES "sales_lead"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_conversation" ADD CONSTRAINT "FK_sales_conversation_assigned_user" FOREIGN KEY ("assignedUserId") REFERENCES "user"("id") ON DELETE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_deal" ADD CONSTRAINT "FK_sales_deal_tenant" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_deal" ADD CONSTRAINT "FK_sales_deal_branch" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_deal" ADD CONSTRAINT "FK_sales_deal_lead" FOREIGN KEY ("leadId") REFERENCES "sales_lead"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_deal" ADD CONSTRAINT "FK_sales_deal_conversation" FOREIGN KEY ("conversationId") REFERENCES "sales_conversation"("id") ON DELETE SET NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_deal" ADD CONSTRAINT "FK_sales_deal_assigned_user" FOREIGN KEY ("assignedUserId") REFERENCES "user"("id") ON DELETE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_message" ADD CONSTRAINT "FK_sales_message_conversation" FOREIGN KEY ("conversationId") REFERENCES "sales_conversation"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_activity" ADD CONSTRAINT "FK_sales_activity_tenant" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_activity" ADD CONSTRAINT "FK_sales_activity_lead" FOREIGN KEY ("leadId") REFERENCES "sales_lead"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_activity" ADD CONSTRAINT "FK_sales_activity_deal" FOREIGN KEY ("dealId") REFERENCES "sales_deal"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_notification" ADD CONSTRAINT "FK_sales_notification_tenant" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_notification" ADD CONSTRAINT "FK_sales_notification_lead" FOREIGN KEY ("leadId") REFERENCES "sales_lead"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_notification" ADD CONSTRAINT "FK_sales_notification_deal" FOREIGN KEY ("dealId") REFERENCES "sales_deal"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_assignment_rule" ADD CONSTRAINT "FK_sales_assignment_rule_tenant" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_follow_up_rule" ADD CONSTRAINT "FK_sales_follow_up_rule_tenant" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales_follow_up_rule" DROP CONSTRAINT "FK_sales_follow_up_rule_tenant"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_assignment_rule" DROP CONSTRAINT "FK_sales_assignment_rule_tenant"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_notification" DROP CONSTRAINT "FK_sales_notification_deal"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_notification" DROP CONSTRAINT "FK_sales_notification_lead"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_notification" DROP CONSTRAINT "FK_sales_notification_tenant"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_activity" DROP CONSTRAINT "FK_sales_activity_deal"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_activity" DROP CONSTRAINT "FK_sales_activity_lead"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_activity" DROP CONSTRAINT "FK_sales_activity_tenant"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_message" DROP CONSTRAINT "FK_sales_message_conversation"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_deal" DROP CONSTRAINT "FK_sales_deal_assigned_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_deal" DROP CONSTRAINT "FK_sales_deal_conversation"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_deal" DROP CONSTRAINT "FK_sales_deal_lead"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_deal" DROP CONSTRAINT "FK_sales_deal_branch"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_deal" DROP CONSTRAINT "FK_sales_deal_tenant"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_conversation" DROP CONSTRAINT "FK_sales_conversation_assigned_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_conversation" DROP CONSTRAINT "FK_sales_conversation_lead"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_conversation" DROP CONSTRAINT "FK_sales_conversation_branch"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_conversation" DROP CONSTRAINT "FK_sales_conversation_tenant"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_lead" DROP CONSTRAINT "FK_sales_lead_assigned_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_lead" DROP CONSTRAINT "FK_sales_lead_branch"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_lead" DROP CONSTRAINT "FK_sales_lead_tenant"`,
    );
    await queryRunner.query(`DROP TABLE "sales_follow_up_rule"`);
    await queryRunner.query(`DROP TABLE "sales_assignment_rule"`);
    await queryRunner.query(`DROP TABLE "sales_notification"`);
    await queryRunner.query(`DROP TABLE "sales_activity"`);
    await queryRunner.query(`DROP TABLE "sales_message"`);
    await queryRunner.query(`DROP TABLE "sales_deal"`);
    await queryRunner.query(`DROP TABLE "sales_conversation"`);
    await queryRunner.query(`DROP TABLE "sales_lead"`);
    await queryRunner.query(
      `DROP TYPE "public"."sales_message_direction_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."sales_assignment_rule_type_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."sales_notification_kind_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."sales_follow_up_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."sales_activity_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."sales_lead_priority_enum"`);
    await queryRunner.query(`DROP TYPE "public"."sales_lead_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."sales_lead_source_enum"`);
  }
}
