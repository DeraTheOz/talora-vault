"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { TvFilters } from "@/features/media/types/media";
import { getSeries } from "../api/get-series";

export function useSeries(filters: TvFilters = {}) {
  return useInfiniteQuery({
    queryKey: ["series", filters],
    queryFn: ({ pageParam }) => getSeries(pageParam, filters),
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
