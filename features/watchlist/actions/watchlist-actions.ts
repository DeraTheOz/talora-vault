"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";

import { auth } from "@/auth";
import { db } from "@/db/client";
import { watchlistItems } from "@/db/schema/watchlist";
import {
  watchlistItemSchema,
  type WatchlistInput,
} from "@/features/watchlist/schemas/watchlist-schema";

export async function toggleWatchlistItem(input: WatchlistInput) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      authRequired: true,
      error: "Log in to add titles to your watchlist",
    };
  }

  const parsed = watchlistItemSchema.safeParse(input);

  if (!parsed.success) {
    return { error: "Invalid watchlist item." };
  }

  const [existingItem] = await db
    .select({ id: watchlistItems.id })
    .from(watchlistItems)
    .where(
      and(
        eq(watchlistItems.userId, session.user.id),
        eq(watchlistItems.tmdbId, parsed.data.tmdbId),
        eq(watchlistItems.mediaType, parsed.data.mediaType),
      ),
    )
    .limit(1);

  if (existingItem) {
    await db
      .delete(watchlistItems)
      .where(eq(watchlistItems.id, existingItem.id));
    revalidatePath("/watchlist");

    return { isInWatchlist: false };
  }

  await db
    .insert(watchlistItems)
    .values({
      userId: session.user.id,
      tmdbId: parsed.data.tmdbId,
      mediaType: parsed.data.mediaType,
    })
    .onConflictDoNothing();

  revalidatePath("/watchlist");

  return { isInWatchlist: true };
}
