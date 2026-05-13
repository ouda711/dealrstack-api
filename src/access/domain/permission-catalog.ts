export type PermissionDefinition = {
  key: string;
  domain: string;
  label: string;
  description: string;
};

export const permissionCatalog: PermissionDefinition[] = [
  {
    key: 'platform.manage',
    domain: 'platform',
    label: 'Manage platform',
    description:
      'Can administer DealrStack as a whole, including platform operations, global configuration, and owner-level controls.',
  },
  {
    key: 'tenants.manage',
    domain: 'platform',
    label: 'Manage tenants',
    description:
      'Can manage dealership workspaces across the whole application, including activation, support, subscription, and account state.',
  },
  {
    key: 'workspace.manage',
    domain: 'workspace',
    label: 'Manage workspace',
    description:
      'Can manage core dealership workspace details, operating profile, and high-level workspace controls.',
  },
  {
    key: 'team.manage',
    domain: 'team',
    label: 'Manage team',
    description:
      'Can invite staff, manage roles, assign people to work, and control access within the workspace.',
  },
  {
    key: 'team.view-branch',
    domain: 'team',
    label: 'View branch team',
    description:
      'Can view team members associated with the user assigned branch context without managing tenant-wide access.',
  },
  {
    key: 'audit.view',
    domain: 'audit',
    label: 'View audit trail',
    description:
      'Can view major activity history within the workspace or assigned branch jurisdiction.',
  },
  {
    key: 'branches.view',
    domain: 'branches',
    label: 'View branches',
    description:
      'Can view workspace branches, locations, assigned managers, contacts, and operating details.',
  },
  {
    key: 'branches.manage',
    domain: 'branches',
    label: 'Manage branches',
    description:
      'Can update branch details for branches the user is assigned to manage.',
  },
  {
    key: 'branches.manage-all',
    domain: 'branches',
    label: 'Manage all branches',
    description:
      'Can create, update, assign managers to, deactivate, and remove any branch in the workspace.',
  },
  {
    key: 'customers.manage',
    domain: 'customers',
    label: 'Manage customers',
    description:
      'Can view and manage customer records, contacts, notes, and customer-related activity.',
  },
  {
    key: 'leads.manage',
    domain: 'leads',
    label: 'Manage leads',
    description:
      'Can view, create, assign, update, and work leads across sales, rental, leasing, and auction workflows.',
  },
  {
    key: 'conversations.manage',
    domain: 'conversations',
    label: 'Manage conversations',
    description:
      'Can manage shared inbox conversations, customer replies, internal notes, templates, and ownership.',
  },
  {
    key: 'vehicles.view',
    domain: 'vehicles',
    label: 'View vehicles',
    description:
      'Can view vehicle inventory, fleet records, pricing, availability, and assignment context.',
  },
  {
    key: 'vehicles.manage',
    domain: 'vehicles',
    label: 'Manage vehicles',
    description:
      'Can manage vehicle inventory, fleet records, photos, availability, pricing, and assignment context.',
  },
  {
    key: 'pipeline.manage',
    domain: 'pipeline',
    label: 'Manage pipeline',
    description:
      'Can manage deal stages, sales progress, pipeline ownership, deposits, and lost/won outcomes.',
  },
  {
    key: 'bookings.manage',
    domain: 'bookings',
    label: 'Manage bookings',
    description:
      'Can manage appointments, test drives, inspections, rental bookings, lease handovers, and deliveries.',
  },
  {
    key: 'rentals.manage',
    domain: 'rentals',
    label: 'Manage rentals',
    description:
      'Can manage rental operations, vehicle availability, check-outs, check-ins, extensions, and rental status.',
  },
  {
    key: 'leases.manage',
    domain: 'leases',
    label: 'Manage leases',
    description:
      'Can manage lease workflows, lease customers, payment context, assignments, and lease lifecycle status.',
  },
  {
    key: 'auctions.manage',
    domain: 'auctions',
    label: 'Manage auctions',
    description:
      'Can manage auction listings, bidder workflows, auction stages, assignments, and auction outcomes.',
  },
  {
    key: 'assignments.manage',
    domain: 'assignments',
    label: 'Manage assignments',
    description:
      'Can assign leads, conversations, vehicles, bookings, and operational tasks to the right team members.',
  },
  {
    key: 'tasks.manage',
    domain: 'tasks',
    label: 'Manage tasks',
    description:
      'Can manage follow-ups, reminders, assigned work, driver tasks, and operational activity queues.',
  },
  {
    key: 'reports.view',
    domain: 'reports',
    label: 'View reports',
    description:
      'Can view operational reports, lead performance, response times, conversion metrics, and fleet insights.',
  },
  {
    key: 'billing.manage',
    domain: 'billing',
    label: 'Manage billing',
    description:
      'Can manage subscription, billing, invoices, payment settings, and plan-related workspace controls.',
  },
  {
    key: 'settings.manage',
    domain: 'settings',
    label: 'Manage settings',
    description:
      'Can manage workspace configuration, integrations, automation settings, and operational preferences.',
  },
];

export const builtInTenantRolePresets = [
  {
    key: 'owner',
    name: 'Owner',
    description:
      'Full workspace control for the business owner or principal decision maker.',
    permissionKeys: permissionCatalog
      .filter((permission) => permission.domain !== 'platform')
      .map((permission) => permission.key),
  },
  {
    key: 'tenant-admin',
    name: 'Tenant Admin',
    description:
      'Administrative role for managing one dealership workspace, including team access, settings, and daily operations.',
    permissionKeys: permissionCatalog
      .filter((permission) => permission.domain !== 'platform')
      .map((permission) => permission.key),
  },
  {
    key: 'manager',
    name: 'Manager',
    description:
      'Can run daily operations, manage teams, assignments, pipeline, bookings, inventory, and reports.',
    permissionKeys: [
      'team.view-branch',
      'audit.view',
      'branches.view',
      'branches.manage',
      'customers.manage',
      'leads.manage',
      'conversations.manage',
      'vehicles.view',
      'vehicles.manage',
      'pipeline.manage',
      'bookings.manage',
      'rentals.manage',
      'leases.manage',
      'auctions.manage',
      'assignments.manage',
      'tasks.manage',
      'reports.view',
    ],
  },
  {
    key: 'salesperson',
    name: 'Salesperson',
    description:
      'Can work leads, conversations, assigned customers, vehicles, pipeline activity, and follow-up tasks.',
    permissionKeys: [
      'customers.manage',
      'branches.view',
      'leads.manage',
      'conversations.manage',
      'vehicles.view',
      'vehicles.manage',
      'pipeline.manage',
      'bookings.manage',
      'tasks.manage',
    ],
  },
  {
    key: 'rental-agent',
    name: 'Rental Agent',
    description:
      'Can manage rental customers, bookings, vehicle availability, rental tasks, and customer communication.',
    permissionKeys: [
      'customers.manage',
      'branches.view',
      'conversations.manage',
      'vehicles.view',
      'vehicles.manage',
      'bookings.manage',
      'rentals.manage',
      'assignments.manage',
      'tasks.manage',
    ],
  },
  {
    key: 'driver',
    name: 'Driver',
    description:
      'Can view assigned vehicles, bookings, delivery tasks, handovers, and update assigned operational work.',
    permissionKeys: [
      'branches.view',
      'vehicles.view',
      'vehicles.manage',
      'bookings.manage',
      'tasks.manage',
    ],
  },
  {
    key: 'viewer',
    name: 'Viewer',
    description:
      'Read-oriented access for stakeholders who need visibility without managing daily operations.',
    permissionKeys: ['branches.view', 'vehicles.view', 'reports.view'],
  },
];
