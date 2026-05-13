export type AuditTrailActor = {
  id?: number | string;
  email?: string | null;
};

export class CreateAuditTrailEventDto {
  tenantId: number;
  branchId?: number | null;
  actor?: AuditTrailActor | null;
  action: string;
  description: string;
  metadata?: Record<string, unknown> | null;
}
