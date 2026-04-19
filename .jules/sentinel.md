## 2024-03-09 - @neondatabase/serverless Parameterized Queries Change
**Vulnerability:** The codebase is using `sql(query, params)` with `@neondatabase/serverless` which is no longer supported and throws a runtime error.
**Learning:** In newer versions of `@neondatabase/serverless`, calling `sql(query, params)` throws a TypeError: `This function can now be called only as a tagged-template function: sql\`SELECT \${value}\`, not sql("SELECT $1", [value], options). For a conventional function call with value placeholders ($1, $2, etc.), use sql.query("SELECT $1", [value], options).`
**Prevention:** Always use `sql\`SELECT * FROM table WHERE col = \${val}\`` or `sql(query, params)` -> `sql(query, params)` is wrong, must use tagged templates or if dynamically building, `sql(query, params)` doesn't exist, we must use tagged templates `sql\`SELECT * FROM prospects WHERE status = \${status} ORDER BY overall_score DESC\``.

## 2024-03-09 - Client-Side Database Credentials Exposure
**Vulnerability:** The database connection string (`VITE_DATABASE_URL`) was exposed to the client bundle in the Vite frontend (`my-neon-app/src/lib/db.ts`), allowing arbitrary database access and querying.
**Learning:** Prefixing an environment variable with `VITE_` makes it publicly accessible in the compiled JavaScript. Direct database connections (`@neondatabase/serverless`) should never be established in client-side code, as this inherently leaks the connection string.
**Prevention:** Implement a Backend-for-Frontend (BFF) architecture. Ensure Vite frontends communicate with databases solely through secured server-side API routes. Never use `VITE_` or `NEXT_PUBLIC_` prefixes for sensitive credentials.
