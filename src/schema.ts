import { sql } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
export const typeEnum = pgEnum("type", ["swot", "improvement", "other"]);

export const usersTable = pgTable("users_table", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password"),
  openaiApiKey: text("openai_api_key"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const requestsTable = pgTable("requests_table", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  type: typeEnum("type").notNull().default("other"),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertRequest = typeof requestsTable.$inferInsert;
export type SelectRequest = typeof requestsTable.$inferSelect;
