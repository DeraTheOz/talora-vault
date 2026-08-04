"use client";

import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { getTvSeason } from "@/features/series/api/get-series-season";

export function useTvSeason(id: string, seasonNumber: number) {
  const locale = useLocale();

  return useQuery({
    queryKey: ["tv-season", id, seasonNumber, locale],
    queryFn: () => getTvSeason(id, seasonNumber, locale),
    enabled: Boolean(id) && seasonNumber > 0,
    staleTime: 1000 * 60 * 30,
  });
}
