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

- [x] Use PostgreSQL/TypeORM first for core DealrStack data.
- [x] Keep modules organized by product domain, not by technical layer alone.
- [x] Make all product records tenant-aware before real customers use the API.
- [x] Keep API contracts close to the frontend sample-data shape while moving features from mock data to real endpoints.
- [x] Add seeds for demo dealerships so the frontend can show realistic Kenyan dealership workflows.

## Phase 1 — Sales Engine API

### 1. Tenants

- [x] Create dealership workspace CRUD.
- [x] Store dealership name, slug, country, timezone, default currency, contact details, and active state.
- [x] Seed demo dealerships.
- [x] Later: bind users, branches, WhatsApp numbers, leads, vehicles, deals, activities, and notifications to tenants.

### 2. Branches & Staff

- [x] Add branches under tenants.
- [x] Extend users/staff with tenant membership.
- [x] Add owner, manager, and salesperson roles per tenant.
- [x] Add tenant-aware permission checks.

### 3. Vehicles

- [x] Add lightweight inventory records for sales workflows.
- [x] Track make, model, year, price, status, branch, stock age, photos, and assigned salesperson.
- [x] Link vehicles to leads and deals.

### 4. Leads

- [x] Add lead records from WhatsApp, website, Facebook, Instagram, calls, walk-ins, CSV imports, Jiji/Cheki, and manual entry.
- [x] Track source, priority, assigned salesperson, SLA status, last activity, and conversion state.
- [x] Add lead creation APIs that support integrations, imports, lost reason, and vehicle linking.

### 5. Conversations

- [x] Add conversation records linked to leads.
- [x] Add messages, unread counts, ownership, internal notes, templates, quick replies, and inbound media types.
- [x] Meta WhatsApp Cloud API webhooks (inbound text + media; outbound via integration).

### 6. Deals & Pipeline

- [x] Add deals linked to leads, vehicles, conversations, tenants, and users.
- [x] Support pipeline stages (system defaults + tenant-configurable stages via sales-pipeline module).
- [x] Add stage movement mutations and activity logging.

### 7. Assignment & Automation

- [x] Add assignment rules for round robin, branch, vehicle type, availability, geography, and manual override.
- [x] Add follow-up rules for no response, inactivity, and re-engagement.
- [x] Add manager escalation and ignored-lead reassignment flows.

### 8. Notifications

- [x] Add in-app notifications for new leads, customer replies, missed follow-ups, and reassignment.
- [x] Auto-create deposit and appointment notifications when deals enter deposit/test-drive stages.
- [x] Email and browser push delivery channels (tenant preferences + push subscriptions; requires mail + VAPID env).
- [x] Live in-app updates via SSE (`GET .../notifications/stream`; frontend patches bell without full workspace reload).

### 9. Analytics

- [x] Add manager-facing metrics for response time, lead source, conversion, salesperson performance, inventory aging, hot vehicles, and lost lead reasons.
- [x] Keep analytics actionable rather than turning into a bloated reporting suite.

## Integrations

- [x] Meta WhatsApp Cloud API.
- [x] Facebook and Instagram lead ads (webhook + per-tenant page token; leadgen idempotency).
- [x] Website forms (public lead endpoint, capture token, embed snippet, idempotency key).
- [x] CSV imports.
- [x] Marketplace/manual entry flows for Jiji/Cheki-style sources.
- [ ] Future: financing providers, calendars, social posting, AI lead qualification.

## Do Not Build Yet

These remain out of scope (unchecked = not started, by design):

- [ ] Accounting.
- [ ] Payroll.
- [ ] Procurement.
- [ ] Workshop ERP.
- [ ] HR modules.
- [ ] Giant reporting suites.
- [ ] Overcomplicated AI workflows before the core sales engine works.

## Ops reminders

- Run pending migrations after pull: `npm run migration:run`
- Sales workspace smoke test: `npm run smoke:sales-workspace`
- Optional push: set `WEB_PUSH_VAPID_PUBLIC_KEY` / `WEB_PUSH_VAPID_PRIVATE_KEY` / `WEB_PUSH_VAPID_SUBJECT` in `.env` (`npx web-push generate-vapid-keys`)
- Multi-instance SSE: in-memory pub/sub today; use Redis when running multiple API replicas
