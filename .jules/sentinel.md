## 2024-XX-XX - [Initial Sentinel Boot]
**Vulnerability:** Initial run, setting up Sentinel journal.
**Learning:** Establishing the baseline security process.
**Prevention:** Follow Sentinel guidelines.
## 2024-XX-XX - [Security Headers Enrichment]
**Vulnerability:** Missing default HTTP security headers in Next.js configuration.
**Learning:** Default configurations often lack basic security protections like X-Frame-Options or Strict-Transport-Security, leaving applications vulnerable to clickjacking or basic MITM attacks.
**Prevention:** Establish a base `headers` configuration in `next.config.ts` defining X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Strict-Transport-Security, and Permissions-Policy.
