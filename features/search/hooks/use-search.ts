"use client";

import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getSearchResults } from "../api/get-search-results";
import { SearchType } from "../types/search";

/**
 * Hook that provides debounced, cached search results via TanStack Query.
 *
 * @param query - The debounced search query string.
 * @param type  - The search type ("multi" | "movie" | "tv"). Defaults to "multi".
 * @returns The TanStack Query result with search data, loading state, and error.
 */
export function useSearch(query: string, type: SearchType = "multi") {
  const locale = useLocale();

  return useQuery({
    // Include type and locale in the query key so different pages/languages cache independently
    queryKey: ["search", query, type, locale],
    queryFn: () => getSearchResults(query, type, 1, locale),
    // Only enable the query when the query is at least 2 characters
    enabled: query.trim().length >= 2,
    // Short stale time since search results can change
    staleTime: 1000 * 60 * 2,
  });
}
