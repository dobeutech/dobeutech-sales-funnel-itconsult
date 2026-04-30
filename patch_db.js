const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, 'src', 'app', 'api');

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('route.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      if (content.includes("import { neon } from '@neondatabase/serverless';")) {
        content = content.replace(
          "import { neon } from '@neondatabase/serverless';",
          "import { sql } from '@/lib/db';"
        );

        content = content.replace(/\s*const dbUrl = process\.env\.DATABASE_URL;\s*if \(\!dbUrl\) \{\s*throw new Error\('DATABASE_URL is not configured'\);\s*\}\s*const sql = neon\(dbUrl\);/g, '');

        fs.writeFileSync(fullPath, content);
        console.log(`Patched ${fullPath}`);
      }
    }
  }
}

walk(apiDir);
