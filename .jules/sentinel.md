## 2024-03-13 - [Security Headers Enhancement]
**Vulnerability:** Next.js application lacked OWASP-recommended HTTP security headers.
**Learning:** Security headers (like X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Strict-Transport-Security) provide defense-in-depth against Clickjacking, XSS, and MIME-type sniffing, but are often overlooked in default Next.js setups.
**Prevention:** Always add standard security headers globally via `next.config.ts` or middleware as part of baseline project setup.
