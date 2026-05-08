## 2024-03-09 - @neondatabase/serverless Parameterized Queries Change
**Vulnerability:** The codebase is using `sql(query, params)` with `@neondatabase/serverless` which is no longer supported and throws a runtime error.
**Learning:** In newer versions of `@neondatabase/serverless`, calling `sql(query, params)` throws a TypeError: `This function can now be called only as a tagged-template function: sql\`SELECT \${value}\`, not sql("SELECT $1", [value], options). For a conventional function call with value placeholders ($1, $2, etc.), use sql.query("SELECT $1", [value], options).`
**Prevention:** Always use `sql\`SELECT * FROM table WHERE col = \${val}\`` or `sql(query, params)` -> `sql(query, params)` is wrong, must use tagged templates or if dynamically building, `sql(query, params)` doesn't exist, we must use tagged templates `sql\`SELECT * FROM prospects WHERE status = \${status} ORDER BY overall_score DESC\``.

## 2024-05-08 - Client-Side Database Credential Leakage
**Vulnerability:** The Vite frontend application (`my-neon-app`) was directly importing and using `@neondatabase/serverless` along with `VITE_DATABASE_URL`. This exposes sensitive database credentials to the client bundle and allows arbitrary execution.
**Learning:** Any variable prefixed with `VITE_` or `NEXT_PUBLIC_` is injected directly into the client bundle at build time. Database credentials must never be exposed to the client. The frontend should always communicate with a backend API (like Next.js route handlers) which safely manages database operations.
**Prevention:** Strictly enforce the Backend-For-Frontend (BFF) architecture. Do not use direct database clients in Vite or client-side Next.js code. Audit environment variables to ensure no secrets use public prefixes.

## 2024-05-08 - Automated Code Reviewer Assumption Note
**Learning:** Automated code reviewers might incorrectly flag missing API implementations when migrating database logic from the Vite frontend to the Next.js backend. Always manually verify the existence of API routes in `src/app/api/...` rather than assuming they need to be created in the current patch.
**Prevention:** If the API endpoints are already present in the codebase, ignore incorrect code review feedback suggesting they are missing.
