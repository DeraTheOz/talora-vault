"use client";

import { useCallback, useEffect, useState } from "react";

import {
  clearSearchHistory,
  deleteSearchQuery,
  getRecentSearches,
  saveSearchQuery,
} from "../actions/search-history-actions";

type RecentSearch = {
  id: string;
  query: string;
  searchedAt: Date;
};

/**
 * Hook that manages the user's recent search history.
 * Fetches recent searches on mount and provides functions to save, delete, and clear history.
 *
 * @returns An object with the recent searches array, loading state, and mutation functions.
 */
export function useSearchHistory() {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch recent searches when the hook mounts
  useEffect(() => {
    getRecentSearches(5)
      .then((searches) => {
        setRecentSearches(searches as RecentSearch[]);
      })
      .catch((error) => {
        console.error("Failed to load recent searches:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  /**
   * Saves a search query to the database and prepends it to the local list.
   * If the query already exists, it moves to the top.
   *
   * @param query - The search query string to save.
   */
  const save = useCallback(async (query: string) => {
    const result = await saveSearchQuery(query);

    if (result.success) {
      setRecentSearches((prev) => {
        // Remove any existing entry with the same query (deduplication)
        const filtered = prev.filter(
          (s) => s.query.toLowerCase() !== query.trim().toLowerCase(),
        );

        // Add the new entry at the top with a temporary ID
        const newEntry: RecentSearch = {
          id: crypto.randomUUID(),
          query: query.trim(),
          searchedAt: new Date(),
        };

        // Keep only the 5 most recent
        return [newEntry, ...filtered].slice(0, 5);
      });
    }
  }, []);

  /**
   * Removes a single search history entry by ID.
   *
   * @param id - The UUID of the entry to delete.
   */
  const remove = useCallback(async (id: string) => {
    const result = await deleteSearchQuery(id);

    if (result.success) {
      setRecentSearches((prev) => prev.filter((s) => s.id !== id));
    }
  }, []);

  /**
   * Clears all search history for the current user.
   */
  const clear = useCallback(async () => {
    const result = await clearSearchHistory();

    if (result.success) {
      setRecentSearches([]);
    }
  }, []);

  return {
    recentSearches,
    isLoading,
    save,
    remove,
    clear,
  };
}
