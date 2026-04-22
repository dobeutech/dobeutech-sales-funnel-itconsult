## 2024-03-09 - @neondatabase/serverless Parameterized Queries Change
**Vulnerability:** The codebase is using `sql(query, params)` with `@neondatabase/serverless` which is no longer supported and throws a runtime error.
**Learning:** In newer versions of `@neondatabase/serverless`, calling `sql(query, params)` throws a TypeError: `This function can now be called only as a tagged-template function: sql\`SELECT \${value}\`, not sql("SELECT $1", [value], options). For a conventional function call with value placeholders ($1, $2, etc.), use sql.query("SELECT $1", [value], options).`
**Prevention:** Always use `sql\`SELECT * FROM table WHERE col = \${val}\`` or `sql(query, params)` -> `sql(query, params)` is wrong, must use tagged templates or if dynamically building, `sql(query, params)` doesn't exist, we must use tagged templates `sql\`SELECT * FROM prospects WHERE status = \${status} ORDER BY overall_score DESC\``.

## 2024-04-22 - Exposed Database Credentials in Vite Frontend
**Vulnerability:** The database connection string was exposed to the client-side code via the `VITE_DATABASE_URL` environment variable and direct database access was performed from the frontend application (`my-neon-app`).
**Learning:** Vite bundles all environment variables prefixed with `VITE_` directly into the frontend artifacts. Using `@neondatabase/serverless` directly in the frontend component codebase exposes sensitive data (e.g., credentials to the entire database) to anyone loading the site.
**Prevention:** Database queries and connection logic must be maintained strictly in the backend (e.g., Next.js API Routes). The frontend should interact with the database indirectly through secure API layers, and secrets must never be prefixed with `VITE_` or `NEXT_PUBLIC_`.
