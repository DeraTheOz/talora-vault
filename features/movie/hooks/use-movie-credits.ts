"use client";

import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../api/get-movie-credits";

export function useMovieCredits(id: string) {
  const locale = useLocale();

  return useQuery({
    queryKey: ["movie-credits", id, locale],
    queryFn: () => getMovieCredits(id, locale),
    staleTime: 1000 * 60 * 60,
    enabled: Boolean(id),
  });
}
