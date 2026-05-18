import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SalesWorkspaceTenantDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  name: string;
}

export class SalesWorkspaceBranchDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  tenantId: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  city: string;

  @ApiPropertyOptional()
  whatsappNumber?: string | null;
}

export class SalesWorkspaceStaffDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  tenantId: string;

  @ApiProperty()
  branchId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: ['owner', 'manager', 'salesperson'] })
  role: 'owner' | 'manager' | 'salesperson';

  @ApiPropertyOptional()
  whatsappNumber?: string | null;

  @ApiProperty()
  isAvailable: boolean;
}

export class SalesWorkspaceLeadDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  tenantId: string;

  @ApiProperty()
  branchId: string;

  @ApiProperty()
  source: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  priority: string;

  @ApiProperty()
  customerName: string;

  @ApiProperty()
  customerPhone: string;

  @ApiProperty()
  interestSummary: string;

  @ApiPropertyOptional()
  vehicleId?: string | null;

  @ApiPropertyOptional()
  assignedStaffId?: string | null;

  @ApiPropertyOptional()
  assignmentReason?: string | null;

  @ApiProperty()
  unread: boolean;

  @ApiProperty()
  slaDueAt: string;

  @ApiProperty()
  lastActivityAt: string;

  @ApiPropertyOptional()
  lostReason?: string | null;

  @ApiProperty()
  createdAt: string;

  @ApiPropertyOptional()
  conversationId?: string | null;
}

export class SalesWorkspaceDealDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  tenantId: string;

  @ApiProperty()
  branchId: string;

  @ApiProperty()
  leadId: string;

  @ApiPropertyOptional()
  vehicleId?: string | null;

  @ApiPropertyOptional()
  conversationId?: string | null;

  @ApiProperty()
  stage: string;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional()
  customerName?: string | null;

  @ApiPropertyOptional()
  imageUrl?: string | null;

  @ApiProperty()
  valueKes: number;

  @ApiProperty()
  assignedStaffId: string;

  @ApiPropertyOptional()
  assignmentReason?: string | null;

  @ApiProperty()
  lastActivityAt: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  inactiveDays: number;

  @ApiProperty()
  boardSortOrder: number;

  @ApiPropertyOptional()
  slaDueAt?: string | null;
}

export class SalesWorkspaceConversationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  tenantId: string;

  @ApiProperty()
  branchId: string;

  @ApiProperty()
  leadId: string;

  @ApiProperty()
  customerName: string;

  @ApiProperty()
  customerPhone: string;

  @ApiProperty()
  assignedStaffId: string;

  @ApiProperty()
  unreadCount: number;

  @ApiProperty()
  lastMessagePreview: string;

  @ApiProperty()
  lastMessageAt: string;

  @ApiPropertyOptional()
  internalNotes?: string | null;
}

export class SalesWorkspaceMessageDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  conversationId: string;

  @ApiProperty({ enum: ['inbound', 'outbound'] })
  direction: 'inbound' | 'outbound';

  @ApiProperty()
  body: string;

  @ApiProperty()
  sentAt: string;

  @ApiPropertyOptional()
  isTemplate?: boolean;

  @ApiPropertyOptional()
  mediaType?: string | null;
}

export class SalesWorkspaceActivityDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  tenantId: string;

  @ApiPropertyOptional()
  leadId?: string | null;

  @ApiPropertyOptional()
  dealId?: string | null;

  @ApiPropertyOptional()
  conversationId?: string | null;

  @ApiProperty()
  type: string;

  @ApiProperty()
  summary: string;

  @ApiPropertyOptional()
  dueAt?: string | null;

  @ApiPropertyOptional()
  completedAt?: string | null;

  @ApiProperty()
  status: string;

  @ApiProperty()
  automated: boolean;

  @ApiProperty()
  createdAt: string;
}

export class SalesWorkspaceNotificationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  tenantId: string;

  @ApiProperty()
  kind: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  body: string;

  @ApiPropertyOptional()
  leadId?: string | null;

  @ApiPropertyOptional()
  dealId?: string | null;

  @ApiProperty()
  read: boolean;

  @ApiProperty()
  createdAt: string;
}

export class MarkSalesNotificationReadResultDto {
  @ApiProperty({ type: SalesWorkspaceNotificationDto })
  notification: SalesWorkspaceNotificationDto;
}

export class MarkAllSalesNotificationsReadResultDto {
  @ApiProperty({ example: true })
  markedAll: true;
}

export class SalesWorkspaceAssignmentRuleDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  tenantId: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  label: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  enabled: boolean;

  @ApiProperty()
  priority: number;
}

export class SalesWorkspaceFollowUpRuleDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  tenantId: string;

  @ApiProperty()
  label: string;

  @ApiProperty()
  trigger: string;

  @ApiProperty()
  delayMinutes: number;

  @ApiProperty()
  enabled: boolean;
}

export class SalesWorkspaceWhatsAppDto {
  @ApiProperty()
  connected: boolean;

  @ApiPropertyOptional()
  phoneNumberId?: string | null;

  @ApiPropertyOptional()
  displayPhoneNumber?: string | null;
}

export class SalesWorkspaceDashboardMetricsDto {
  @ApiProperty()
  avgResponseMinutes: number;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: { source: { type: 'string' }, count: { type: 'number' } },
    },
  })
  leadsBySource: { source: string; count: number }[];

  @ApiProperty()
  conversionRatePct: number;

  @ApiProperty()
  openPipelineValueKes: number;

  @ApiProperty()
  wonDealsCount: number;

  @ApiProperty()
  lostDealsCount: number;

  @ApiProperty()
  inventoryAgingDaysAvg: number;

  @ApiProperty()
  overdueFollowUpsCount: number;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        reason: { type: 'string' },
        count: { type: 'number' },
      },
    },
  })
  lostLeadsByReason: { reason: string; count: number }[];

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        staffId: { type: 'string' },
        name: { type: 'string' },
        leadsAssigned: { type: 'number' },
        dealsWon: { type: 'number' },
        avgResponseMinutes: { type: 'number' },
      },
    },
  })
  staffPerformance: {
    staffId: string;
    name: string;
    leadsAssigned: number;
    dealsWon: number;
    avgResponseMinutes: number;
  }[];
}

export class SalesWorkspaceSnapshotDto {
  @ApiProperty({ type: SalesWorkspaceDashboardMetricsDto })
  metrics: SalesWorkspaceDashboardMetricsDto;

  @ApiProperty({ type: SalesWorkspaceWhatsAppDto })
  whatsapp: SalesWorkspaceWhatsAppDto;

  @ApiProperty({ type: [SalesWorkspaceTenantDto] })
  tenants: SalesWorkspaceTenantDto[];

  @ApiProperty({ type: [SalesWorkspaceBranchDto] })
  branches: SalesWorkspaceBranchDto[];

  @ApiProperty({ type: [SalesWorkspaceStaffDto] })
  staff: SalesWorkspaceStaffDto[];

  @ApiProperty({ type: [SalesWorkspaceLeadDto] })
  leads: SalesWorkspaceLeadDto[];

  @ApiProperty({ type: [SalesWorkspaceDealDto] })
  deals: SalesWorkspaceDealDto[];

  @ApiProperty({ type: [SalesWorkspaceConversationDto] })
  conversations: SalesWorkspaceConversationDto[];

  @ApiProperty({ type: [SalesWorkspaceMessageDto] })
  messages: SalesWorkspaceMessageDto[];

  @ApiProperty({ type: [SalesWorkspaceActivityDto] })
  activities: SalesWorkspaceActivityDto[];

  @ApiProperty({ type: [SalesWorkspaceNotificationDto] })
  notifications: SalesWorkspaceNotificationDto[];

  @ApiProperty({ type: [SalesWorkspaceAssignmentRuleDto] })
  assignmentRules: SalesWorkspaceAssignmentRuleDto[];

  @ApiProperty({ type: [SalesWorkspaceFollowUpRuleDto] })
  followUpRules: SalesWorkspaceFollowUpRuleDto[];
}
