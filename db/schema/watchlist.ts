import {
  index,
  integer,
  pgTable,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

import { users } from "./auth";
import { mediaTypeEnum } from "./media";

export const watchlistItems = pgTable(
  "watchlist_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tmdbId: integer("tmdb_id").notNull(),
    mediaType: mediaTypeEnum("media_type").notNull(),
    addedAt: timestamp("added_at", { mode: "date" }).defaultNow().notNull(),
  },
  (item) => [
    unique("watchlist_user_media_unique").on(
      item.userId,
      item.mediaType,
      item.tmdbId,
    ),
    index("watchlist_user_added_at_idx").on(item.userId, item.addedAt),
  ],
);
