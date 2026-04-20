## 2024-03-09 - @neondatabase/serverless Parameterized Queries Change
**Vulnerability:** The codebase is using `sql(query, params)` with `@neondatabase/serverless` which is no longer supported and throws a runtime error.
**Learning:** In newer versions of `@neondatabase/serverless`, calling `sql(query, params)` throws a TypeError: `This function can now be called only as a tagged-template function: sql\`SELECT \${value}\`, not sql("SELECT $1", [value], options). For a conventional function call with value placeholders ($1, $2, etc.), use sql.query("SELECT $1", [value], options).`
**Prevention:** Always use `sql\`SELECT * FROM table WHERE col = \${val}\`` or `sql(query, params)` -> `sql(query, params)` is wrong, must use tagged templates or if dynamically building, `sql(query, params)` doesn't exist, we must use tagged templates `sql\`SELECT * FROM prospects WHERE status = \${status} ORDER BY overall_score DESC\``.

## 2025-04-20 - Exposed Database Credentials via Vite Env
**Vulnerability:** Exposed `VITE_DATABASE_URL` hardcoded in `my-neon-app/src/lib/db.ts` directly accessing `@neondatabase/serverless`.
**Learning:** Vite bundles environment variables prefixed with `VITE_` into the client-side JavaScript, which completely exposes database credentials. Direct DB queries in Vite bypass the secure backend API layer.
**Prevention:** Move all database logic to secure Next.js API routes (`src/app/api/...`), removing `@neondatabase/serverless` and DB credentials from Vite codebase entirely, relying on `fetch` calls.
