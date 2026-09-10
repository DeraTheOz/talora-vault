import {
  boolean,
  index,
  integer,
  pgTable,
  real,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

import { users } from "./auth";
import { mediaTypeEnum } from "./media";

export const watchProgress = pgTable(
  "watch_progress",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tmdbId: integer("tmdb_id").notNull(),
    mediaType: mediaTypeEnum("media_type").notNull(),
    season: integer("season"),
    episode: integer("episode"),
    currentTime: real("current_time").notNull(),
    duration: real("duration").notNull(),
    percentage: real("percentage").notNull(),
    title: text("title").notNull(),
    posterPath: text("poster_path"),
    releaseDate: text("release_date"),
    completed: boolean("completed").notNull().default(false),
    lastWatchedAt: timestamp("last_watched_at", { mode: "date" })
      .defaultNow()
      .notNull(),
  },
  (item) => [
    unique("watch_progress_user_media_unique").on(
      item.userId,
      item.mediaType,
      item.tmdbId,
      item.season,
      item.episode,
    ),
    index("watch_progress_user_idx").on(item.userId, item.lastWatchedAt),
  ],
);
