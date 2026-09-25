import "server-only";
import { neon } from "@neondatabase/serverless";

let client: ReturnType<typeof neon> | null = null;

/** Returns a Neon SQL tag, or null when DATABASE_URL is not configured (e.g. local preview). */
export function sql() {
  if (!process.env.DATABASE_URL) return null;
  client ??= neon(process.env.DATABASE_URL);
  return client;
}
