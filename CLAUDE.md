# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**dobeutech-sales-funnel-itconsult** — Fully automated customer sourcing and prospecting platform through invoicing and deliverables for Dobeutech IT Consulting.

This is a greenfield project. No application source code exists yet. The spec/requirements are in `prompt/` as `.docx` files.

## Environment

- **Platform:** Windows 11 (primary), WSL available
- **Shell:** PowerShell 7 (pwsh) in Cursor's integrated terminal
- **Claude binary:** `%USERPROFILE%\.local\bin\claude.exe` (native install, not npm)
- **WSL Claude:** `~/.local/bin/claude`

## Critical: Terminal Constraints

**NEVER run interactive CLI tools through the Cursor agent Shell tool.** This includes `claude doctor`, `claude` REPL, and any command requiring TTY/raw mode. These hang indefinitely. Use an external PowerShell or WSL terminal instead.

If stuck processes appear: `Get-Process -Name "claude*" | Stop-Process -Force`

## MCP Servers

Configured in `%USERPROFILE%\.cursor\mcp.json` (global). Connected servers: **context7**, **composio**.

If MCP servers show as disconnected in Cursor:
1. Quit Cursor completely (File > Exit)
2. Edit config with Cursor closed
3. Restart Cursor (full restart, not Reload Window)

See `.cursor/MCP-TROUBLESHOOTING.md` and `.cursor/TERMINAL-TROUBLESHOOTING.md` for detailed diagnostics.

## Session State

`.agent/progress.md` — tracks migration history and session notes. Update at end of each session with completed work, issues, and next steps.

## Database

**Neon Postgres** (serverless, free tier) — project `dobeutech-sales-funnel` (ID: `jolly-snow-79034315`)
- Host: `ep-jolly-mouse-adt6tiw6.c-2.us-east-1.aws.neon.tech`
- Database: `salesfunnel` | Region: `aws-us-east-1`
- ORM: **Prisma** (`prisma/schema.prisma`)
- Migration applied: `prisma/migrations/001_initial_schema/migration.sql`
- Commands: `npm run db:generate` | `npm run db:migrate` | `npm run db:studio`

Tables: `prospects`, `outreach_log`, `survey_responses`, `analytics_events`, `weekly_batches`

## Stack

- **Frontend:** Next.js 15 + React 19 → Netlify
- **Backend/DB:** Neon Postgres + Prisma
- **Automation:** Make.com (team ID: 315584) + Composio.dev
- **Prospecting:** Apollo.io (Composio ACTIVE)
- **Survey:** Typeform (Composio ACTIVE, info@dobeu.net)
- **Email drip:** Customer.io (Composio ACTIVE — verify API key if 401)
- **SMS:** Twilio via Make.com connection `My Twilio connection`
- **SEO enrichment:** Semrush (Composio ACTIVE — 7-day trial, use immediately)

## Git

Branch strategy: `main` (stable) / feature branches. Current working branch: `dev-local`.
