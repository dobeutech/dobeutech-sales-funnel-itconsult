# dobeutech-sales-funnel-itconsult

Fully automated customer sourcing and prospecting platform through invoicing and deliverables for Dobeu Tech.

## Development

```bash
npm install
npm run dev          # Dev server (http://localhost:3000)
npm run dev:inspect  # Dev server with Node inspector (port 9229) for attach debugging
npm run build
npm run type-check
npm run lint
```

## Debugging (VS Code)

Use the **Run and Debug** panel (Ctrl+Shift+D) and choose:

| Config | Use when |
|--------|----------|
| **Next.js: debug server** | Set breakpoints in API routes, server code, Prisma; F5 to start. |
| **Next.js: debug full stack** | Server + Chrome; breakpoints in both. |
| **Chrome / Edge: debug client** | Dev server already running; debug React/client only. |
| **Next.js: start server (inspect)** | Start dev server with inspector, then run **Attach to Node (Next.js server)** to attach. |

Tasks (Terminal → Run Task): `dev`, `dev:inspect`, `build`, `type-check`, `lint`.
