## 2024-03-09 - @neondatabase/serverless Parameterized Queries Change
**Vulnerability:** The codebase is using `sql(query, params)` with `@neondatabase/serverless` which is no longer supported and throws a runtime error.
**Learning:** In newer versions of `@neondatabase/serverless`, calling `sql(query, params)` throws a TypeError: `This function can now be called only as a tagged-template function: sql\`SELECT \${value}\`, not sql("SELECT $1", [value], options). For a conventional function call with value placeholders ($1, $2, etc.), use sql.query("SELECT $1", [value], options).`
**Prevention:** Always use `sql\`SELECT * FROM table WHERE col = \${val}\`` or `sql(query, params)` -> `sql(query, params)` is wrong, must use tagged templates or if dynamically building, `sql(query, params)` doesn't exist, we must use tagged templates `sql\`SELECT * FROM prospects WHERE status = \${status} ORDER BY overall_score DESC\``.
## 2024-03-09 - Client-Side DB Credentials Exposure
**Vulnerability:** Client-side Vite application (my-neon-app) had direct access to the database via VITE_DATABASE_URL and made direct database queries using @neondatabase/serverless.
**Learning:** This exposed the database credentials directly to anyone loading the application, allowing arbitrary queries to be run against the database.
**Prevention:** Never prefix sensitive connection strings with VITE_ or NEXT_PUBLIC_. Always ensure database logic is kept server-side (like Next.js API routes) and accessed by the client through standard API calls (fetch).
## 2024-03-09 - CI Failure: Neon Free Tier 10-Branch Limit Reached
**Vulnerability:** CI workflow failed to create preview branches due to Neon Free Tier 10-branch limit causing 422 API errors.
**Learning:** The workflow only deleted the exact branch for the current PR if it existed, but didn't handle the overall capacity limit, causing all new PRs to fail when 10 stale branches accumulated.
**Prevention:** Integrated logic in .github/workflows/neon-branch.yml to use neonctl to check the branch count and automatically prune the oldest preview/pr-* branch before attempting creation.
