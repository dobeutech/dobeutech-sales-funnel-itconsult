## 2024-05-24 - [Add Global Security Headers]
**Vulnerability:** Missing security headers (CSP, X-Frame-Options, etc.)
**Learning:** Security headers were not enabled globally in `next.config.ts`, exposing the app to potential cross-site scripting (XSS), clickjacking, and mime-sniffing attacks.
**Prevention:** Always define `headers()` in `next.config.ts` applying OWASP-recommended standard security headers (e.g., `X-DNS-Prefetch-Control`, `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) globally (`/(.*)`).
