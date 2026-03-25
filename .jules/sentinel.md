## 2024-05-15 - [Direct Database Access from Vite Client]
**Vulnerability:** The Vite frontend (`my-neon-app`) accesses the Postgres database directly using `@neondatabase/serverless` and a `VITE_DATABASE_URL` environment variable.
**Learning:** This exposes the database connection string directly to the client bundle, a severe security violation that allows an attacker complete access to the database using the connection string.
**Prevention:** Always create an API layer in Next.js to proxy database calls for SPA frontends. Never use `VITE_` or `NEXT_PUBLIC_` prefixes for secrets, particularly database connection strings.
