import { sql } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  jsonb,
} from "drizzle-orm/pg-core";
export const typeEnum = pgEnum("type", ["swot", "improvement", "other"]);

export const usersTable = pgTable("users_table", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").unique(),
  image: text("image"),
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

export const thumbnailTypeEnum = pgEnum("thumbnail_type", ["ai", "original"]);
export const productTypeEnum = pgEnum("product_type", ["ai", "original"]);

export const abTestsTable = pgTable("ab_tests_table", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  asin: text("asin").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  original: jsonb("original").notNull(),
  aiEnhanced: jsonb("ai_enhanced").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const abTestReviewsTable = pgTable("ab_test_reviews_table", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  abTestId: uuid("ab_test_id")
    .notNull()
    .references(() => abTestsTable.id, { onDelete: "cascade" }),
  thumbnail: thumbnailTypeEnum("thumbnail"),
  product: productTypeEnum("product"),
  name: text("name"),
  review: text("review"),
  location: text("location"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertRequest = typeof requestsTable.$inferInsert;
export type SelectRequest = typeof requestsTable.$inferSelect;

export type InsertABTest = typeof abTestsTable.$inferInsert;
export type SelectABTest = typeof abTestsTable.$inferSelect;

export type InsertABTestReview = typeof abTestReviewsTable.$inferInsert;
export type SelectABTestReview = typeof abTestReviewsTable.$inferSelect;
