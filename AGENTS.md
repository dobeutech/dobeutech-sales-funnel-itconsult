# AGENTS.md

## Cursor Cloud specific instructions

This is a **Next.js 15** application (TypeScript, Tailwind CSS v4, App Router) for the Dobeu Tech Solutions IT consulting sales funnel platform.

### Key commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (port 3000) |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Test | `npm test` |
| Test (watch) | `npm run test:watch` |
| Automation check | `npm run automation:check` |
| Automation demo | `npm run automation:demo` |

### Project structure

- `src/app/` — Next.js App Router pages and layouts
- `src/lib/automation/` — Composio + Claude SDK integration layer
  - `composio-client.ts` — Singleton Composio client factory with `AnthropicProvider`
  - `claude-agent.ts` — `ClaudeAutomationAgent` class for agentic tool-use loops
  - `index.ts` — Public exports
- `src/scripts/` — Standalone runnable scripts (`tsx`)
  - `demo-setup-check.ts` — Validates SDK installation and env vars
  - `demo-automation.ts` — Runs a Claude agent with Composio tools
  - `demo-composio-tools.ts` — Lists live toolkits and tools from Composio API
- `src/__tests__/` — Jest + React Testing Library tests
- `jest.config.ts` / `jest.setup.ts` — Test configuration
- `eslint.config.mjs` — ESLint flat config extending `next/core-web-vitals` and `next/typescript`
- `postcss.config.mjs` — PostCSS with Tailwind CSS v4 plugin (`@tailwindcss/postcss`)

### Automation SDK integration

The project integrates **Composio SDK v3** (`@composio/core` + `@composio/anthropic`) with the **Anthropic Claude SDK** (`@anthropic-ai/sdk`).

**Authentication strategy:**

- **Composio**: Requires `COMPOSIO_API_KEY` env var (provided as a Cursor secret for cloud agents, or in `.env` locally).
- **Anthropic/Claude**: Two options:
  1. Set `ANTHROPIC_API_KEY` in `.env` or as a secret.
  2. Use Claude Code login with a Max subscription (`claude login` locally) — the SDK picks up the session automatically. No API key needed.

**To run live automation:**

1. Copy `.env.example` to `.env` and fill in `COMPOSIO_API_KEY` (and optionally `ANTHROPIC_API_KEY`).
2. Run `npm run automation:check` to verify the setup.
3. Run `npm run automation:demo` to execute a Claude agent with Composio tools.

The `Composio` client must be typed as `Composio<AnthropicProvider>` — the default generic is `OpenAIProvider` and will cause type errors if unparameterized. See `composio-client.ts` for the pattern.

### Notes

- Node.js 22+ is required (managed via nvm in the cloud environment).
- Tailwind CSS v4 uses `@import "tailwindcss"` in CSS files instead of the v3 `@tailwind` directives.
- The `next lint` command emits a deprecation warning; this is expected with Next.js 15 and is non-blocking.
- Jest uses `next/jest` for automatic SWC transforms — no separate Babel config needed.
- The `composio.tools.get()` API requires exactly one of `{ tools: [...] }` or `{ toolkits: [...] }` — passing both optional fields in a single object triggers a TypeScript discriminated union error.
- **Anthropic API key type matters:** The Claude Messages API requires a key starting with `sk-ant-api03-`. Admin keys (`sk-ant-admin-`) only work for the Admin API and will return 401 on message calls. If using Claude Code Max subscription locally, no API key is needed.
- The `/api/health` endpoint validates SDK loading and env var presence at runtime — use it as a quick integration smoke test.
