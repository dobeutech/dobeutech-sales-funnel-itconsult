## 2024-03-27 - Security Headers in Next.js
**Vulnerability:** Missing fundamental HTTP security headers. The application did not enforce basic web security protections out of the box.
**Learning:** Next.js default setups often do not include `Strict-Transport-Security`, `X-Content-Type-Options`, or `X-Frame-Options` globally, leading to potential MITM attacks, MIME-sniffing, and clickjacking out of the box without manual configuration.
**Prevention:** Always verify and explicitly declare global HTTP security headers via Next.js `next.config.ts` configuration or equivalent framework routing constructs from day one.
