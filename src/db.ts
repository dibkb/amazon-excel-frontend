import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Get database connection string with fallback
const url = process.env.NEXT_PUBLIC_DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(url);
export const db = drizzle({ client: sql });
