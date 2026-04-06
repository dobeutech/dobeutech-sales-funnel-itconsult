## 2024-04-06 - [Next.js Security Headers Missing]
**Vulnerability:** The root Next.js application was missing essential HTTP security headers (e.g. HSTS, X-Frame-Options, X-Content-Type-Options) allowing potential attacks like clickjacking or MIME-type sniffing.
**Learning:** Next.js does not provide security headers out-of-the-box. They must be explicitly configured in `next.config.ts`.
**Prevention:** Always define an `async headers()` function in `next.config.ts` matching `/(.*)` to enforce standard security headers application-wide.
