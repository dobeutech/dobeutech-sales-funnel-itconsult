## 2025-04-05 - Missing Security Headers in Next.js

**Vulnerability:** The root Next.js application was missing standard security HTTP headers in its responses.
**Learning:** By default, Next.js does not apply restrictive security headers. The omission left the application susceptible to basic attacks like clickjacking, MIME-type sniffing, and cross-site scripting vulnerabilities that could otherwise be mitigated by standard defense-in-depth headers.
**Prevention:** Always define custom OWASP-recommended HTTP response headers in `next.config.ts` (using the `headers()` async function with a global `/(.*)` matcher) from the beginning of project setup.
