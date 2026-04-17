## 2024-03-09 - @neondatabase/serverless Parameterized Queries Change
**Vulnerability:** The codebase is using `sql(query, params)` with `@neondatabase/serverless` which is no longer supported and throws a runtime error.
**Learning:** In newer versions of `@neondatabase/serverless`, calling `sql(query, params)` throws a TypeError: `This function can now be called only as a tagged-template function: sql\`SELECT \${value}\`, not sql("SELECT $1", [value], options). For a conventional function call with value placeholders ($1, $2, etc.), use sql.query("SELECT $1", [value], options).`
**Prevention:** Always use `sql\`SELECT * FROM table WHERE col = \${val}\`` or `sql(query, params)` -> `sql(query, params)` is wrong, must use tagged templates or if dynamically building, `sql(query, params)` doesn't exist, we must use tagged templates `sql\`SELECT * FROM prospects WHERE status = \${status} ORDER BY overall_score DESC\``.

## 2024-04-17 - VITE_DATABASE_URL exposing credentials to client
**Vulnerability:** The `VITE_DATABASE_URL` environment variable was used to store database credentials and passed directly to `@neondatabase/serverless` on the Vite client-side code (`my-neon-app/src/lib/db.ts`).
**Learning:** Any environment variable prefixed with `VITE_` (or `NEXT_PUBLIC_`) is automatically injected into the frontend build artifact as plaintext. This allowed anyone inspecting the client bundle to extract full database credentials.
**Prevention:** Never expose database connection strings to the client-side using `VITE_` or `NEXT_PUBLIC_` prefixes. All database logic must reside exclusively in backend API layers (e.g. Next.js server actions or API routes), acting as a secure intermediary for frontend requests.
