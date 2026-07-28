"use server";

import { auth } from "@/auth";
import { db } from "@/db/client";
import { searchHistory } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";

/**
 * Saves a search query to the user's search history.
 * If the same query already exists for the user, updates its timestamp
 * instead of creating a duplicate (deduplication by userId + query).
 *
 * @param query - The search query string to save.
 * @returns An object indicating success or failure, with an auth flag if not signed in.
 */
export async function saveSearchQuery(query: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { authRequired: true as const };
  }

  const trimmedQuery = query.trim();

  if (trimmedQuery.length === 0 || trimmedQuery.length > 200) {
    return { error: "Invalid search query." };
  }

  try {
    // Check if this exact query already exists for this user
    const [existingEntry] = await db
      .select({ id: searchHistory.id })
      .from(searchHistory)
      .where(
        and(
          eq(searchHistory.userId, session.user.id),
          eq(searchHistory.query, trimmedQuery),
        ),
      )
      .limit(1);

    if (existingEntry) {
      // Update the timestamp of the existing entry to bring it to the top
      await db
        .update(searchHistory)
        .set({ searchedAt: new Date() })
        .where(eq(searchHistory.id, existingEntry.id));
    } else {
      // Insert a new search history entry
      await db
        .insert(searchHistory)
        .values({ userId: session.user.id, query: trimmedQuery });
    }

    return { success: true as const };
  } catch (error) {
    console.error("Failed to save search query:", error);
    return { error: "Failed to save search query." };
  }
}

/**
 * Retrieves the user's search queries, ordered by most recent first.
 *
 * @param limit - Maximum number of recent searches to return (defaults to 5).
 * @returns An array of search history entries (id, query, searchedAt), or an empty array if not signed in.
 */
export async function getRecentSearches(limit = 5) {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  try {
    const recentSearches = await db
      .select({
        id: searchHistory.id,
        query: searchHistory.query,
        searchedAt: searchHistory.searchedAt,
      })
      .from(searchHistory)
      .where(eq(searchHistory.userId, session.user.id))
      .orderBy(desc(searchHistory.searchedAt))
      .limit(limit);

    return recentSearches;
  } catch (error) {
    console.error("Failed to fetch recent searches:", error);
    return [];
  }
}

/**
 * Deletes a single search history entry by its ID.
 * Only deletes entries belonging to the authenticated user.
 *
 * @param id - The UUID of the search history entry to delete.
 * @returns An object indicating success or failure.
 */
export async function deleteSearchQuery(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { authRequired: true as const };
  }

  try {
    await db
      .delete(searchHistory)
      .where(
        and(
          eq(searchHistory.id, id),
          eq(searchHistory.userId, session.user.id),
        ),
      );

    return { success: true as const };
  } catch (error) {
    console.error("Failed to delete search query:", error);
    return { error: "Failed to delete search query." };
  }
}

/**
 * Clears all search history entries for the authenticated user.
 *
 * @returns An object indicating success or failure.
 */
export async function clearSearchHistory() {
  const session = await auth();

  if (!session?.user?.id) {
    return { authRequired: true as const };
  }

  try {
    await db
      .delete(searchHistory)
      .where(eq(searchHistory.userId, session.user.id));

    return { success: true as const };
  } catch (error) {
    console.error("Failed to clear search history:", error);
    return { error: "Failed to clear search history." };
  }
}
