
## 2025-05-14 - [Neon Serverless Driver SQL Injection Prevention]
**Vulnerability:** Use of string concatenation or `sql(query, params)` function calls for parameterized queries with the `@neondatabase/serverless` driver. This can cause runtime TypeErrors or bypass query compilation protections.
**Learning:** The `@neondatabase/serverless` driver specifically requires the use of tagged template literals (`sql\`SELECT * FROM table WHERE col = ${val}\``) instead of standard function calls to properly execute parameterized queries. Using `sql(query, params)` breaks the driver's compilation, leading to runtime failures or insecure query execution.
**Prevention:** Always use tagged template literals (`sql\`...\``) for querying with the Neon driver to ensure variables are safely sanitized and type errors are avoided.
