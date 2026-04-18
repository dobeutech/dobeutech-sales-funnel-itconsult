## 2025-05-18 - [Exposed Database URL to Client]
**Vulnerability:** [The Vite frontend exposed `VITE_DATABASE_URL` which got bundled to the client to make queries directly.]
**Learning:** [It existed to connect straight to the database from the client, likely an oversight or for convenience.]
**Prevention:** [All data access operations should go through backend endpoints. The database shouldn't be accessed from the client or contain credentials.]
