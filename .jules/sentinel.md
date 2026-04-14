## 2024-03-09 - @neondatabase/serverless Parameterized Queries Change
**Vulnerability:** The codebase is using `sql(query, params)` with `@neondatabase/serverless` which is no longer supported and throws a runtime error.
**Learning:** In newer versions of `@neondatabase/serverless`, calling `sql(query, params)` throws a TypeError: `This function can now be called only as a tagged-template function: sql\`SELECT \${value}\`, not sql("SELECT $1", [value], options). For a conventional function call with value placeholders ($1, $2, etc.), use sql.query("SELECT $1", [value], options).`
**Prevention:** Always use `sql\`SELECT * FROM table WHERE col = \${val}\`` or `sql(query, params)` -> `sql(query, params)` is wrong, must use tagged templates or if dynamically building, `sql(query, params)` doesn't exist, we must use tagged templates `sql\`SELECT * FROM prospects WHERE status = \${status} ORDER BY overall_score DESC\``.

## 2024-04-14 - Removed database credentials from Vite frontend
**Vulnerability:** The client-side application `my-neon-app` directly imported the `@neondatabase/serverless` client and used a `VITE_DATABASE_URL` environment variable to connect to the database directly from the browser.
**Learning:** `VITE_` prefixed environment variables are baked into the frontend bundle. Database access from the client exposes the connection string to any user, allowing direct and unauthorized database interaction.
**Prevention:** Ensure database clients are only instantiated in a secure backend environment (like Next.js API routes or Server Components). Use standard REST/GraphQL endpoints for client-to-server communication.
