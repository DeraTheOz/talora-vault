"use client";

import { useLocale } from "next-intl";
import { useInfiniteQuery } from "@tanstack/react-query";
import { TvFilters } from "@/features/media/types/media";
import { getSeries } from "../api/get-series";

export function useSeries(filters: TvFilters = {}) {
  const locale = useLocale();

  return useInfiniteQuery({
    queryKey: ["series", filters, locale],
    queryFn: ({ pageParam }) => getSeries(pageParam, filters, locale),
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
