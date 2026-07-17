import {
  check,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { users } from "./auth";
import { mediaTypeEnum } from "./media";

export const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tmdbId: integer("tmdb_id").notNull(),
    mediaType: mediaTypeEnum("media_type").notNull(),
    rating: integer("rating").notNull(),
    content: text("content"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (review) => [
    unique("review_user_media_unique").on(
      review.userId,
      review.mediaType,
      review.tmdbId,
    ),
    check(
      "review_rating_range",
      sql`${review.rating} >= 1 AND ${review.rating} <= 10`,
    ),
    index("reviews_media_idx").on(review.mediaType, review.tmdbId),
  ],
);
