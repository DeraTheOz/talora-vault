"use client";

import { useLocale } from "next-intl";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMovies } from "../api/get-movies";
import { MovieFilters } from "@/features/media/types/media";

export function useMovies(filters: MovieFilters = {}) {
  const locale = useLocale();

  return useInfiniteQuery({
    queryKey: ["movies", filters, locale],
    queryFn: ({ pageParam }) => getMovies(pageParam, filters, locale),
    initialPageParam: 1,
    placeholderData: (previousData) => previousData,
    getNextPageParam: (lastPage) => {
      if (!lastPage.page || !lastPage.total_pages) return undefined;

      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
}
