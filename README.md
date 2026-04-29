# Gumisofts Website

Next.js 15 application for the Gumisofts public website **and** the internal CRM/admin panel. The
project ships with a self-contained backend (Next.js API routes + Prisma) so a single repo runs
the public site, the API, and the CRM.

## Tech stack

- **Next.js 15** (App Router, Turbopack)
- **Tailwind CSS 4** for styling
- **Prisma** ORM (SQLite for development, PostgreSQL recommended for production)
- **Auth.js v5** (`next-auth@beta`) with credentials provider for admin login
- **Tanstack Query** + Axios on the public site

## What's in here

- **Public site** — Hero (product-led), Products, Services, Portfolio, Careers, Blog,
  Contact, etc. All gradients have been removed in favour of the brand color
  `#2b3991` and neutral grays.
- **Public API** under `/api/*` — mirrors the legacy Django endpoints so the
  existing frontend code (`useQuery` hooks against `apiClient`) keeps working
  with no changes.
- **CRM / Admin** under `/admin` — a fully featured back office to manage:
  - Leads / contact form submissions
  - Newsletter subscribers
  - Job applications
  - Job postings
  - Products (with pricing tiers)
  - Services
  - Portfolio projects
  - Testimonials
  - Blog posts
  - Company info / stats
  - Admin users

## Quick start

### 1. Install

```bash
pnpm install
```

### 2. Configure env

Copy `.env.example` to `.env` and adjust:

```bash
cp .env.example .env
```

| Variable              | Purpose                                              |
| --------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | Leave empty to use the built-in `/api` routes        |
| `DATABASE_URL`        | `file:./dev.db` for SQLite, or a `postgresql://` URL |
| `AUTH_SECRET`         | `openssl rand -base64 32`                            |
| `AUTH_TRUST_HOST`     | `true` (required for Auth.js in dev)                 |

### 3. Set up the database

```bash
pnpm db:push   # apply the Prisma schema
pnpm db:seed   # seed initial data + admin user
```

This creates an admin user with default credentials:

```
admin@gumisofts.com / admin1234
```

> Change the password from `/admin/users` after first login.

### 4. Run

```bash
pnpm dev
```

The app runs on [http://localhost:4000](http://localhost:4000).

- Public site: <http://localhost:4000>
- Admin panel: <http://localhost:4000/admin>

## Useful scripts

| Script             | What it does                                |
| ------------------ | ------------------------------------------- |
| `pnpm dev`         | Start the dev server (Turbopack, port 4000) |
| `pnpm build`       | Production build                            |
| `pnpm start`       | Start the production server                 |
| `pnpm lint`        | Lint the project                            |
| `pnpm db:push`     | Apply Prisma schema to the database         |
| `pnpm db:migrate`  | Create/apply a new migration (dev)          |
| `pnpm db:generate` | Regenerate the Prisma client                |
| `pnpm db:seed`     | Seed the database with default content      |
| `pnpm db:studio`   | Open Prisma Studio                          |

## Deploying to production

1. Provision a PostgreSQL database and set `DATABASE_URL`.
2. Set a real `AUTH_SECRET` (32+ random bytes, base64 encoded).
3. Run `pnpm db:push` (or `pnpm db:migrate deploy` if you maintain migrations).
4. Run `pnpm db:seed` once if you want the default content.
5. Build and run with `pnpm build && pnpm start`.

Vercel works out of the box; just provide the env vars above and use a hosted Postgres
(Neon, Supabase, RDS, etc.).
