"use client";

import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getSimilarTvShows } from "../api/get-similar-series";

export function useSimilarTvShows(id: string) {
  const locale = useLocale();

  return useQuery({
    queryKey: ["similar-tvShows", id, locale],
    queryFn: () => getSimilarTvShows(id, locale),
    staleTime: 1000 * 60 * 10,
    enabled: Boolean(id),
  });
}
