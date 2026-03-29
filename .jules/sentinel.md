## 2024-05-20 - Next.js Security Headers

**Vulnerability:** Next.js application was missing OWASP-recommended HTTP security headers in `next.config.ts`, including `X-Frame-Options`, `X-Content-Type-Options`, and `Referrer-Policy`.
**Learning:** By default, Next.js does not enforce these security headers globally. They must be explicitly configured to protect the application from common web vulnerabilities like Clickjacking and MIME-type sniffing.
**Prevention:** Always ensure `next.config.ts` exports an async `headers()` function applying strict security headers globally (using `source: '/(.*)'`) during initial project setup.
