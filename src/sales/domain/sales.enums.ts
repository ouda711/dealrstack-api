export enum LeadSource {
  Whatsapp = 'whatsapp',
  Website = 'website',
  Facebook = 'facebook',
  Instagram = 'instagram',
  Phone = 'phone',
  WalkIn = 'walk_in',
  Csv = 'csv',
  Jiji = 'jiji',
  Cheki = 'cheki',
  Manual = 'manual',
}

export enum LeadStatus {
  New = 'new',
  Contacted = 'contacted',
  Qualified = 'qualified',
  Nurturing = 'nurturing',
  Won = 'won',
  Lost = 'lost',
}

export enum LeadPriority {
  Low = 'low',
  Normal = 'normal',
  High = 'high',
  Urgent = 'urgent',
}

export enum SalesActivityType {
  Call = 'call',
  Whatsapp = 'whatsapp',
  Email = 'email',
  Visit = 'visit',
  Note = 'note',
  FollowUp = 'follow_up',
}

export enum FollowUpStatus {
  Pending = 'pending',
  Completed = 'completed',
  Overdue = 'overdue',
  Skipped = 'skipped',
}

export enum NotificationKind {
  NewLead = 'new_lead',
  CustomerReply = 'customer_reply',
  MissedFollowUp = 'missed_follow_up',
  ReassignedLead = 'reassigned_lead',
  Deposit = 'deposit',
  Appointment = 'appointment',
}

export enum AssignmentRuleType {
  RoundRobin = 'round_robin',
  Branch = 'branch',
  VehicleType = 'vehicle_type',
  Availability = 'availability',
  Geography = 'geography',
  Manual = 'manual',
}

export enum MessageDirection {
  Inbound = 'inbound',
  Outbound = 'outbound',
}

export enum SalesAppointmentType {
  TestDrive = 'test_drive',
  Visit = 'visit',
  Call = 'call',
  Other = 'other',
}

export enum SalesAppointmentStatus {
  Scheduled = 'scheduled',
  Completed = 'completed',
  Cancelled = 'cancelled',
  NoShow = 'no_show',
}

export enum SalesCalendarProvider {
  Google = 'google',
  Outlook = 'outlook',
}
