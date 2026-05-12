# DealrStack API TODO

## Product Principle

Every backend feature must answer: does this help dealerships convert leads into sales faster?

DealrStack is a dealership sales operating system, not a dealership ERP. Avoid backend complexity that does not directly improve lead capture, response speed, sales visibility, or follow-up execution.

## Learning Track

- [ ] Learn the NestJS request lifecycle: module -> controller -> service -> repository -> database.
- [ ] Learn DTO validation with `class-validator` and `class-transformer`.
- [ ] Learn Swagger decorators and API documentation.
- [ ] Learn guards, roles, JWT auth, sessions, and tenant-aware access control.
- [ ] Learn TypeORM entities, repositories, migrations, and seeds.
- [ ] Learn Docker concepts: images, containers, volumes, ports, networks, env vars, and Compose services.
- [ ] Learn integration patterns: webhooks, external API clients, retries, idempotency, background jobs, and audit logs.

## Backend Architecture Direction

- [ ] Use PostgreSQL/TypeORM first for core DealrStack data.
- [ ] Keep modules organized by product domain, not by technical layer alone.
- [ ] Make all product records tenant-aware before real customers use the API.
- [ ] Keep API contracts close to the frontend sample-data shape while moving features from mock data to real endpoints.
- [ ] Add seeds for demo dealerships so the frontend can show realistic Kenyan dealership workflows.

## Phase 1 — Sales Engine API

### 1. Tenants

- [ ] Create dealership workspace CRUD.
- [ ] Store dealership name, slug, country, timezone, default currency, contact details, and active state.
- [ ] Seed demo dealerships.
- [ ] Later: bind users, branches, WhatsApp numbers, leads, vehicles, deals, activities, and notifications to tenants.

### 2. Branches & Staff

- [ ] Add branches under tenants.
- [ ] Extend users/staff with tenant membership.
- [ ] Add owner, manager, and salesperson roles per tenant.
- [ ] Add tenant-aware permission checks.

### 3. Vehicles

- [ ] Add lightweight inventory records for sales workflows.
- [ ] Track make, model, year, price, status, branch, stock age, photos, and assigned salesperson.
- [ ] Link vehicles to leads and deals.

### 4. Leads

- [ ] Add lead records from WhatsApp, website, Facebook, Instagram, calls, walk-ins, CSV imports, Jiji/Cheki, and manual entry.
- [ ] Track source, priority, assigned salesperson, SLA status, last activity, and conversion state.
- [ ] Add lead creation APIs that later support integrations and imports.

### 5. Conversations

- [ ] Add conversation records linked to leads.
- [ ] Add messages, unread counts, ownership, internal notes, templates, quick replies, and media placeholders.
- [ ] Prepare for Meta WhatsApp Cloud API webhooks.

### 6. Deals & Pipeline

- [ ] Add deals linked to leads, vehicles, conversations, tenants, and users.
- [ ] Support pipeline stages: New Lead, Contacted, Interested, Test Drive, Negotiation, Deposit Paid, Sold, Lost.
- [ ] Add stage movement mutations and activity logging.

### 7. Assignment & Automation

- [ ] Add assignment rules for round robin, branch, vehicle type, availability, geography, and manual override.
- [ ] Add follow-up rules for no response, inactivity, and re-engagement.
- [ ] Add manager escalation and ignored-lead reassignment flows.

### 8. Notifications

- [ ] Add in-app notifications for new leads, replies, missed follow-ups, reassignment, deposits, and appointments.
- [ ] Later: add push and email delivery channels.

### 9. Analytics

- [ ] Add manager-facing metrics for response time, lead source, conversion, salesperson performance, inventory aging, hot vehicles, and lost lead reasons.
- [ ] Keep analytics actionable rather than turning into a bloated reporting suite.

## Integrations

- [ ] Meta WhatsApp Cloud API.
- [ ] Facebook and Instagram lead ads.
- [ ] Website forms.
- [ ] CSV imports.
- [ ] Marketplace/manual entry flows for Jiji/Cheki-style sources.
- [ ] Future: financing providers, calendars, social posting, AI lead qualification.

## Do Not Build Yet

- [ ] Accounting.
- [ ] Payroll.
- [ ] Procurement.
- [ ] Workshop ERP.
- [ ] HR modules.
- [ ] Giant reporting suites.
- [ ] Overcomplicated AI workflows before the core sales engine works.
