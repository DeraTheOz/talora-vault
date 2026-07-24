import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const searchHistory = pgTable(
  "search_history",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    query: text("query").notNull(),
    searchedAt: timestamp("searched_at", { mode: "date" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("search_history_user_searched_at_idx").on(
      table.userId,
      table.searchedAt,
    ),
  ],
);
