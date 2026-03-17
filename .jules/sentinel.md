## 2024-05-18 - Missing Security Headers in Next.js

**Vulnerability:** The application is missing standard security headers (Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, Strict-Transport-Security, X-XSS-Protection).
**Learning:** Default Next.js configuration doesn't automatically include these essential HTTP headers. They must be explicitly defined in `next.config.ts`.
**Prevention:** Add a standard `headers` function to `next.config.ts` enforcing these policies globally.
