"use client";

import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getSeriesGenres } from "../api/get-series-genres";

export function useSeriesGenres() {
  const locale = useLocale();

  return useQuery({
    queryKey: ["tv-genres", locale],
    queryFn: () => getSeriesGenres(locale),
    staleTime: 1000 * 60 * 60 * 24,
  });
}
