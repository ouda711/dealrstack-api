# DealrStack API

Backend API for DealrStack, a dealership sales operating system designed to help dealerships convert leads into car sales faster.

This codebase is based on a NestJS REST API boilerplate and will be shaped into the DealrStack backend over time.

## Product Focus

DealrStack is not a dealership ERP. The backend should prioritize:

- multi-tenant dealership workspaces
- unified lead capture
- WhatsApp-native communication
- sales pipeline visibility
- fast lead assignment and follow-up automation
- lightweight vehicle inventory for sales workflows

Every backend feature should answer: does this help dealerships convert leads into sales faster?

## Stack

- NestJS
- TypeScript
- PostgreSQL with TypeORM first
- Docker Compose for local infrastructure
- Swagger API docs
- JWT auth, users, sessions, files, mail, and seeds from the starter boilerplate

## Local Development

Start with the relational/PostgreSQL setup:

```bash
cp env-example-relational .env
docker compose up --build
```

Useful local URLs:

- API: `http://localhost:3001`
- Swagger docs: `http://localhost:3001/docs`
- Adminer: `http://localhost:8080`
- Maildev: `http://localhost:1080`

The original boilerplate docs are still available in `docs/readme.md` while we learn and adapt the project.
