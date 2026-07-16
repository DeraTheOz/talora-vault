"use client";

import { useQuery } from "@tanstack/react-query";

import { getTvSeason } from "@/features/series/api/get-series-season";

export function useTvSeason(id: string, seasonNumber: number) {
  return useQuery({
    queryKey: ["tv-season", id, seasonNumber],
    queryFn: () => getTvSeason(id, seasonNumber),
    enabled: Boolean(id) && seasonNumber > 0,
    staleTime: 1000 * 60 * 30,
  });
}
