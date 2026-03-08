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

### Project structure

- `src/app/` — Next.js App Router pages and layouts
- `src/__tests__/` — Jest + React Testing Library tests
- `jest.config.ts` / `jest.setup.ts` — Test configuration
- `eslint.config.mjs` — ESLint flat config extending `next/core-web-vitals` and `next/typescript`
- `postcss.config.mjs` — PostCSS with Tailwind CSS v4 plugin (`@tailwindcss/postcss`)

### Notes

- Node.js 22+ is required (managed via nvm in the cloud environment).
- Tailwind CSS v4 uses `@import "tailwindcss"` in CSS files instead of the v3 `@tailwind` directives.
- The `next lint` command emits a deprecation warning; this is expected with Next.js 15 and is non-blocking.
- Jest uses `next/jest` for automatic SWC transforms — no separate Babel config needed.
