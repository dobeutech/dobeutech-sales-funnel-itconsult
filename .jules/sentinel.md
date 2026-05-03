## 2024-03-09 - @neondatabase/serverless Parameterized Queries Change
**Vulnerability:** The codebase is using `sql(query, params)` with `@neondatabase/serverless` which is no longer supported and throws a runtime error.
**Learning:** In newer versions of `@neondatabase/serverless`, calling `sql(query, params)` throws a TypeError: `This function can now be called only as a tagged-template function: sql\`SELECT \${value}\`, not sql("SELECT $1", [value], options). For a conventional function call with value placeholders ($1, $2, etc.), use sql.query("SELECT $1", [value], options).`
**Prevention:** Always use `sql\`SELECT * FROM table WHERE col = \${val}\`` or `sql(query, params)` -> `sql(query, params)` is wrong, must use tagged templates or if dynamically building, `sql(query, params)` doesn't exist, we must use tagged templates `sql\`SELECT * FROM prospects WHERE status = \${status} ORDER BY overall_score DESC\``.

## 2024-05-03 - Unbounded Collection Retrieval (DoS Risk)
**Vulnerability:** Collection API endpoints (`/api/surveys`, `/api/prospects`) return all rows from the database without any limits or pagination. This could lead to out-of-memory errors on the server or unbounded memory consumption if the dataset grows large.
**Learning:** Returning unbounded results from the database is a common pattern in early stages of development but represents a significant Denial of Service (DoS) risk as the application scales. Next.js API routes could crash if the returned dataset exceeds memory limits.
**Prevention:** Implement pagination using `limit` and `offset` query parameters on all endpoints that return collections. Set a default limit (e.g., 50) and a maximum cap (e.g., 100) to ensure unbounded memory consumption is impossible.
