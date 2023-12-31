import { bigint, boolean, timestamp, varchar } from "drizzle-orm/mysql-core";

import { mysqlTable } from "@/server/db/util";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 15 }).primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  active: boolean("active").default(false).notNull(),
  role: varchar("role", { length: 15, enum: ["admin", "user", "super_admin"] })
    .default("user")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const key = mysqlTable("user_keys", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 15 }).notNull(),
  hashedPassword: varchar("hashed_password", { length: 255 }),
});

export const session = mysqlTable("user_sessions", {
  id: varchar("id", { length: 128 }).primaryKey(),
  userId: varchar("user_id", { length: 15 }).notNull(),
  activeExpires: bigint("active_expires", { mode: "number" }).notNull(),
  idleExpires: bigint("idle_expires", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const passwordResetTokens = mysqlTable("password_reset_tokens", {
  id: varchar("id", { length: 63 }).primaryKey(),
  userId: varchar("user_id", { length: 15 }).notNull(),
  expires: bigint("expires", { mode: "number" }).notNull(),
});

export const emailVerificationTokens = mysqlTable("email_verification_tokens", {
  id: varchar("id", { length: 63 }).primaryKey(),
  userId: varchar("user_id", { length: 15 }).notNull(),
  expires: bigint("expires", { mode: "number" }).notNull(),
});
