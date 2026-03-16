## 2024-03-24 - Missing Global Security Headers
**Vulnerability:** The root Next.js application lacked globally enforced HTTP security headers (e.g., HSTS, X-Frame-Options, X-Content-Type-Options).
**Learning:** This architectural security gap exposed the app to potential risks like clickjacking, MIME-type sniffing, and man-in-the-middle attacks. It is crucial for Next.js apps to define security headers globally via `next.config.ts`.
**Prevention:** Always enforce standard OWASP security headers in `next.config.ts` during project initialization.
