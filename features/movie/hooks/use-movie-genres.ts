"use client";

import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getMovieGenres } from "../api/get-movie-genres";

export function useMovieGenres() {
  const locale = useLocale();

  return useQuery({
    queryKey: ["movie-genres", locale],
    queryFn: () => getMovieGenres(locale),
    staleTime: 1000 * 60 * 60 * 24,
  });
}
