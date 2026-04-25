## 2024-03-09 - @neondatabase/serverless Parameterized Queries Change
**Vulnerability:** The codebase is using `sql(query, params)` with `@neondatabase/serverless` which is no longer supported and throws a runtime error.
**Learning:** In newer versions of `@neondatabase/serverless`, calling `sql(query, params)` throws a TypeError: `This function can now be called only as a tagged-template function: sql\`SELECT \${value}\`, not sql("SELECT $1", [value], options). For a conventional function call with value placeholders ($1, $2, etc.), use sql.query("SELECT $1", [value], options).`
**Prevention:** Always use `sql\`SELECT * FROM table WHERE col = \${val}\`` or `sql(query, params)` -> `sql(query, params)` is wrong, must use tagged templates or if dynamically building, `sql(query, params)` doesn't exist, we must use tagged templates `sql\`SELECT * FROM prospects WHERE status = \${status} ORDER BY overall_score DESC\``.
## 2024-03-09 - [CRITICAL] Exposed Database Credentials in Client Bundle
**Vulnerability:** The `VITE_DATABASE_URL` environment variable was used in the frontend code (`my-neon-app/src/lib/db.ts`) with `@neondatabase/serverless`. Variables prefixed with `VITE_` are statically replaced during build, exposing the full database connection string (including username and password) directly to the client bundle. This allowed any user to extract the credentials and gain full, direct access to the database.
**Learning:** Any code connecting directly to a database or using API keys must remain strictly server-side (e.g. Next.js API Routes, Server Components). Vite bundles everything that imports `import.meta.env.VITE_*` into the client-side JavaScript. Connecting directly to a database from a Single Page Application (SPA) bypasses all server-side security checks and exposes credentials.
**Prevention:**
1. Never prefix sensitive secrets with `VITE_` or `NEXT_PUBLIC_`.
2. Do not import database clients (like `@neondatabase/serverless`) or instantiate them in client-only code (like a Vite React app).
3. Always implement a Backend-for-Frontend (BFF) pattern where the frontend makes secure HTTP requests to a backend API (like Next.js Route Handlers), which then safely executes the database queries server-side.

## 2024-03-09 - [NOTE] Automated Code Reviewer Feedback
**Vulnerability:** The automated code reviewer believed the backend API routes were missing.
**Learning:** Automated code reviewers may incorrectly flag missing API implementations when modifying the Vite frontend (`my-neon-app`) to use Next.js backend routes. The routes already existed in the repo.
**Prevention:** Always manually verify the existence of the API routes in `src/app/api/...` rather than assuming they need to be created in the current patch.
