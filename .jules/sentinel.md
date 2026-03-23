## 2024-05-24 - [Next.js Security Headers Configuration Gap]
**Vulnerability:** The root Next.js application lacked global HTTP security headers (e.g., `X-Frame-Options`, `Strict-Transport-Security`, `X-Content-Type-Options`) in `next.config.ts`.
**Learning:** Security features must be explicitly verified in the codebase, rather than assuming documentation or memories reflect the true state of the code. Previous knowledge indicated headers were configured, but the file was empty.
**Prevention:** Always verify security configurations directly by reading and inspecting the actual configuration files (`next.config.ts`) before concluding they are secured.

## 2024-05-24 - [Vite Direct Database Access Architecture Flaw]
**Vulnerability:** The Vite frontend in `my-neon-app` connects directly to the database via `@neondatabase/serverless` using `VITE_DATABASE_URL`, bypassing a backend API.
**Learning:** This architectural flaw exposes database credentials to the client. Vite bundles everything into the client code.
**Prevention:** In the future, shift this logic to an API layer and protect database connection strings to be used strictly on the server side (e.g., in Next.js Server Components or API Routes), per `SECURITY.md` guidelines.
