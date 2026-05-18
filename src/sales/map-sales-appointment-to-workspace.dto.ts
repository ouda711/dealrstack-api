import { SalesWorkspaceAppointmentDto } from './domain/sales-workspace';
import { SalesAppointmentEntity } from './infrastructure/persistence/relational/entities/sales-appointment.entity';

export function mapSalesAppointmentToWorkspaceDto(
  appointment: SalesAppointmentEntity,
): SalesWorkspaceAppointmentDto {
  return {
    id: String(appointment.id),
    tenantId: String(appointment.tenantId),
    leadId: String(appointment.leadId),
    dealId: appointment.dealId ? String(appointment.dealId) : null,
    vehicleId: appointment.vehicleId ? String(appointment.vehicleId) : null,
    assignedStaffId: appointment.assignedUserId
      ? String(appointment.assignedUserId)
      : null,
    type: appointment.type,
    status: appointment.status,
    scheduledAt: appointment.scheduledAt.toISOString(),
    durationMinutes: appointment.durationMinutes,
    location: appointment.location ?? null,
    notes: appointment.notes ?? null,
    createdAt: appointment.createdAt.toISOString(),
  };
}
