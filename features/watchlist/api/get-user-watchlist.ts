import { db } from "@/db/client";
import { watchlistItems } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { cache } from "react";

export const getCachedUserWatchlist = cache(async (userId: string) => {
  return db
    .select()
    .from(watchlistItems)
    .where(eq(watchlistItems.userId, userId))
    .orderBy(desc(watchlistItems.addedAt));
});
