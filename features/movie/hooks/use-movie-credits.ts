"use client";

import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../api/get-movie-credits";

export function useMovieCredits(id: string) {
  return useQuery({
    queryKey: ["movie-credits", id],
    queryFn: () => getMovieCredits(id),
    staleTime: 1000 * 60 * 60,
    enabled: Boolean(id),
  });
}
