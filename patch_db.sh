#!/bin/bash
find src/app/api -name "route.ts" | while read -r file; do
  sed -i "s|import { neon } from '@neondatabase/serverless';|import { sql } from '@/lib/db';|" "$file"
  sed -i "/const dbUrl = process.env.DATABASE_URL;/d" "$file"
  sed -i "/if (!dbUrl) {/d" "$file"
  sed -i "/throw new Error('DATABASE_URL is not configured');/d" "$file"
  sed -i "/}/d" "$file" # DANGER: doing it manually via bash might be messy, I will use sed more carefully or Node script.
done
