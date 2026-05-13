## 2024-03-09 - @neondatabase/serverless Parameterized Queries Change
**Vulnerability:** The codebase is using `sql(query, params)` with `@neondatabase/serverless` which is no longer supported and throws a runtime error.
**Learning:** In newer versions of `@neondatabase/serverless`, calling `sql(query, params)` throws a TypeError: `This function can now be called only as a tagged-template function: sql\`SELECT \${value}\`, not sql("SELECT $1", [value], options). For a conventional function call with value placeholders ($1, $2, etc.), use sql.query("SELECT $1", [value], options).`
**Prevention:** Always use `sql\`SELECT * FROM table WHERE col = \${val}\`` or `sql(query, params)` -> `sql(query, params)` is wrong, must use tagged templates or if dynamically building, `sql(query, params)` doesn't exist, we must use tagged templates `sql\`SELECT * FROM prospects WHERE status = \${status} ORDER BY overall_score DESC\``.

## 2024-05-20 - Environment Enumeration in Health Check
**Vulnerability:** The public `/api/health` endpoint explicitly returned whether `COMPOSIO_API_KEY` and `ANTHROPIC_API_KEY` environment variables were present or missing (binary `"ok"`/`"missing"` status).
**Learning:** This is an environment enumeration vulnerability. An attacker can probe public endpoints to map out the services and tools used internally by the application.
**Prevention:** Instead of exposing explicit configuration checks, health endpoints should determine service availability internally based on instantiation or actual connectivity tests, hiding the underlying presence of specific configuration keys.
