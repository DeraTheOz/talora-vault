"use client";

import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getSimilarMovies } from "../api/get-similar-movies";

export function useSimilarMovies(id: string) {
  const locale = useLocale();

  return useQuery({
    queryKey: ["similar-movies", id, locale],
    queryFn: () => getSimilarMovies(id, locale),
    staleTime: 1000 * 60 * 10,
    enabled: Boolean(id),
  });
}
