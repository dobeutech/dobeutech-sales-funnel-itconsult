## 2024-05-24 - Client-side Database Connection Leak
**Vulnerability:** The Vite frontend application directly accesses the Neon serverless database using `VITE_DATABASE_URL` via the `@neondatabase/serverless` package in `my-neon-app/src/lib/db.ts`.
**Learning:** This exposes the direct database connection string (including credentials) to the client-side bundle, violating `SECURITY.md` and standard security practices, as Vite bundles environment variables prefixed with `VITE_` into the client-side code. This means anyone who visits the frontend can extract the database credentials and gain full access to the database.
**Prevention:** Database clients and connection strings must only be used in server components or an API layer. A proxy API should be built for the Vite application to perform data fetching. Never use `VITE_` or `NEXT_PUBLIC_` prefixes for database connection strings.

## 2024-05-24 - Missing Security Headers in Next.js Configuration
**Vulnerability:** The `next.config.ts` configuration file is missing essential global security headers (such as `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy`), leaving the application vulnerable to common attacks like Clickjacking, MIME-type sniffing, and man-in-the-middle downgrade attacks.
**Learning:** In Next.js applications, global security headers are not applied automatically. They must be explicitly configured using the `headers()` async function in the `next.config.ts` or `next.config.js` file to ensure they apply globally to all routes via the `source: "/(.*)"` matcher.
**Prevention:** Always verify and include OWASP-recommended HTTP security headers in the Next.js configuration globally.
