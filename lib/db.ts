import "server-only";
import { neon } from "@neondatabase/serverless";
export function db() {
  if (!process.env.DATABASE_URL)
    throw new Error("Database connection is not configured.");
  return neon(process.env.DATABASE_URL);
}
