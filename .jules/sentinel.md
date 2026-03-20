## 2024-05-18 - [Add Security Headers to Next.js Application]
**Vulnerability:** The Next.js application lacked standard security headers in `next.config.ts`, exposing the application to clickjacking, MIME-type sniffing, XSS, and lacking strict transport security (HSTS) and proper referrer policies.
**Learning:** Security headers must be explicitly defined in Next.js `next.config.ts` via the `headers()` async function to enforce browser-level security controls globally.
**Prevention:** Next.js projects should be bootstrapped with a baseline `next.config.ts` that includes recommended OWASP security headers (Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy) by default.
