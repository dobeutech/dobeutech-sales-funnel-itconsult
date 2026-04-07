## 2026-04-07 - [Exposed Database URL in Frontend]
**Vulnerability:** Direct database access in the Vite frontend via VITE_DATABASE_URL exposing credentials to the client.
**Learning:** Hardcoded or prefixed secrets with VITE_ are bundled into client code. Frontend directly making SQL queries to Neon.
**Prevention:** Always use Backend-for-Frontend (BFF) architecture for DB queries and keep credentials on the server.
