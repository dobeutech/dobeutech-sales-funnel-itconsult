## 2024-03-09 - @neondatabase/serverless Parameterized Queries Change
**Vulnerability:** The codebase is using `sql(query, params)` with `@neondatabase/serverless` which is no longer supported and throws a runtime error.
**Learning:** In newer versions of `@neondatabase/serverless`, calling `sql(query, params)` throws a TypeError: `This function can now be called only as a tagged-template function: sql\`SELECT \${value}\`, not sql("SELECT $1", [value], options). For a conventional function call with value placeholders ($1, $2, etc.), use sql.query("SELECT $1", [value], options).`
**Prevention:** Always use `sql\`SELECT * FROM table WHERE col = \${val}\`` or `sql(query, params)` -> `sql(query, params)` is wrong, must use tagged templates or if dynamically building, `sql(query, params)` doesn't exist, we must use tagged templates `sql\`SELECT * FROM prospects WHERE status = \${status} ORDER BY overall_score DESC\``.

## 2024-05-04 - [Remove Client-Side Database Connections]
**Vulnerability:** A `VITE_DATABASE_URL` environment variable containing database credentials was exposed to the frontend browser context via `import.meta.env`, allowing potential arbitrary database execution. The `@neondatabase/serverless` client was performing queries directly in the client application (`my-neon-app/src/lib/db.ts`).
**Learning:** The Vite application frontend layer was not correctly separated from backend database access, exposing infrastructure secrets securely managed at the root Next.js API layer.
**Prevention:** Ensure frontend UI components always proxy database operations through secure backend API endpoints. Do not leak credentials with `VITE_` or `NEXT_PUBLIC_` prefixes unless the explicit intention is to expose them to all clients.
