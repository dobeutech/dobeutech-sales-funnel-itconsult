## 2024-03-09 - @neondatabase/serverless Parameterized Queries Change
**Vulnerability:** The codebase is using `sql(query, params)` with `@neondatabase/serverless` which is no longer supported and throws a runtime error.
**Learning:** In newer versions of `@neondatabase/serverless`, calling `sql(query, params)` throws a TypeError: `This function can now be called only as a tagged-template function: sql\`SELECT \${value}\`, not sql("SELECT $1", [value], options). For a conventional function call with value placeholders ($1, $2, etc.), use sql.query("SELECT $1", [value], options).`
**Prevention:** Always use `sql\`SELECT * FROM table WHERE col = \${val}\`` or `sql(query, params)` -> `sql(query, params)` is wrong, must use tagged templates or if dynamically building, `sql(query, params)` doesn't exist, we must use tagged templates `sql\`SELECT * FROM prospects WHERE status = \${status} ORDER BY overall_score DESC\``.

## 2024-05-18 - Client-side Exposure of Database Credentials
**Vulnerability:** The Vite client-side bundle was directly importing and using `@neondatabase/serverless` with a `VITE_DATABASE_URL` environment variable to query the database. Anything prefixed with `VITE_` is automatically included in the output bundle, meaning the production database connection string would be exposed to end users, allowing direct and potentially malicious database access.
**Learning:** Vite applications bundle all logic into static files sent to the browser. Database clients must only be used on the server side (like Next.js API Routes).
**Prevention:** Never prefix sensitive environment variables with `VITE_` or `NEXT_PUBLIC_`. Ensure data fetching from the client is always done via authenticated proxy endpoints rather than directly connecting to the database layer.

## 2024-05-18 - Automated Code Reviewer Limitations
**Vulnerability:** Not a code vulnerability, but a process limitation. Automated code reviewers may incorrectly flag missing API implementations when modifying a subproject (like the Vite frontend `my-neon-app`) to use Next.js backend routes.
**Learning:** The reviewer script might analyze the patch and incorrectly conclude that the Next.js API endpoints (`/api/...`) do not exist because they were not modified in the current pull request, even though they already exist in the repository's `src/app/api/` directory.
**Prevention:** Always manually verify the existence of referenced API routes (e.g., using `ls` or `grep` in `src/app/api/`) instead of relying solely on the automated reviewer's assumptions about missing implementations.
