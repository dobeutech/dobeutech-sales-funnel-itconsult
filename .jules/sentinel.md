## YYYY-MM-DD - [Title]
**Vulnerability:** [What you found]
**Learning:** [Why it existed]
**Prevention:** [How to avoid next time]
## 2024-05-24 - [Vite VITE_DATABASE_URL exposing credentials]
**Vulnerability:** The Vite frontend application (`my-neon-app`) uses `import.meta.env.VITE_DATABASE_URL` with `@neondatabase/serverless` to connect directly to the database from the client-side. This exposes the database connection string and credentials directly in the bundled JavaScript code.
**Learning:** This exists because the Vite application was likely set up as a standalone client connecting directly to the database without a backend API layer, but Vite prefixing an environment variable with `VITE_` forces it to be bundled into the client build.
**Prevention:** Database credentials should NEVER be exposed in the frontend. If a frontend needs database access, it should connect to a backend API which securely queries the database. Environment variables containing secrets should not be prefixed with `VITE_` or `NEXT_PUBLIC_`.

## 2024-05-24 - [Missing Security Headers in Next.js]
**Vulnerability:** The Next.js root application does not enforce OWASP-recommended HTTP security headers (e.g., `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) globally in `next.config.ts`.
**Learning:** This is a common oversight where developers assume default Next.js configurations are secure enough, but critical security headers must be explicitly defined in Next.js using the `headers()` async function in `next.config.ts`.
**Prevention:** Always explicitly define global security headers in `next.config.ts` using the `source: "/(.*)"` matcher to protect the application from common web vulnerabilities like clickjacking, MIME-sniffing, and downgrade attacks.
