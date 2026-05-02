## 2024-03-09 - @neondatabase/serverless Parameterized Queries Change
**Vulnerability:** The codebase is using `sql(query, params)` with `@neondatabase/serverless` which is no longer supported and throws a runtime error.
**Learning:** In newer versions of `@neondatabase/serverless`, calling `sql(query, params)` throws a TypeError: `This function can now be called only as a tagged-template function: sql\`SELECT \${value}\`, not sql("SELECT $1", [value], options). For a conventional function call with value placeholders ($1, $2, etc.), use sql.query("SELECT $1", [value], options).`
**Prevention:** Always use `sql\`SELECT * FROM table WHERE col = \${val}\`` or `sql(query, params)` -> `sql(query, params)` is wrong, must use tagged templates or if dynamically building, `sql(query, params)` doesn't exist, we must use tagged templates `sql\`SELECT * FROM prospects WHERE status = \${status} ORDER BY overall_score DESC\``.
## 2025-05-02 - Frontend Exposed Database Credentials
**Vulnerability:** The Vite frontend application directly connected to the Neon database, exposing the `VITE_DATABASE_URL` credential and allowing arbitrary client-side SQL execution.
**Learning:** In a BFF (Backend-for-Frontend) architecture, database logic must strictly reside in the secure Next.js API layer. Never introduce direct database connections in the Vite frontend.
**Prevention:** Avoid configuring `@neondatabase/serverless` in Vite. Ensure all database access is proxied through authenticated server endpoints.
## 2025-05-02 - Free Tier Branch Limit Prevention
**Vulnerability:** GitHub Actions encountered a 422 error creating preview branches due to the Neon Free Tier 10-branch limit being reached.
**Learning:** Checking for and deleting an explicitly named branch does not prevent 422 errors if the total branch capacity is consumed by other stale preview branches.
**Prevention:** Automatically prune the oldest `preview/pr-*` branch using `neonctl` when the project branch count reaches 10 before creating a new one.
