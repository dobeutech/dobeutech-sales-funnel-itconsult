# Dobeu Tech Solutions - Sales Funnel

## Overview
Fully automated customer sourcing and prospecting platform for IT consulting. Built with Next.js 15, Prisma ORM, and Neon Postgres.

## Architecture
- **Framework**: Next.js 15.2.4 (App Router)
- **Database**: PostgreSQL via Neon (Prisma ORM)
- **Styling**: Tailwind CSS v4
- **AI**: Anthropic Claude SDK + Composio integrations
- **Package Manager**: npm

## Project Structure
```
src/
  app/          - Next.js App Router pages and layouts
    api/        - API route handlers
  lib/          - Shared utilities and database client
  scripts/      - Automation scripts (demo, Composio tools)
  __tests__/    - Jest test files
prisma/
  schema.prisma - Database schema
  seed.ts       - Database seed script
```

## Running the App
The app runs via the "Start application" workflow:
- Command: `npm run dev`
- Port: 5000 (required for Replit webview)

## Environment Variables
Copy `.env.example` to `.env` and fill in:
- `DATABASE_URL` - Neon Postgres connection string (pooled)
- `DATABASE_URL_UNPOOLED` - Neon Postgres direct connection
- `ANTHROPIC_API_KEY` - Anthropic Claude API key
- `COMPOSIO_API_KEY` - Composio SDK API key
- Various third-party API keys (Apollo, Typeform, Customer.io, Twilio, etc.)

## Database Commands
```bash
npm run db:generate   # Generate Prisma client
npm run db:migrate    # Run migrations (production)
npm run db:push       # Push schema changes (development)
npm run db:seed       # Seed the database
npm run db:studio     # Open Prisma Studio
```

## Replit Migration Notes
- Next.js pinned to 15.2.4 (15.5.x crashes with Bus error on Nix due to Turbopack Rust binaries)
- Dev and start scripts use `-p 5000 -H 0.0.0.0` for Replit compatibility
- `next.config.ts` has `allowedDevOrigins: ["*"]` for Replit proxy
