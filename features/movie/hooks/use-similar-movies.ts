"use client";

import { useQuery } from "@tanstack/react-query";
import { getSimilarMovies } from "../api/get-similar-movies";

export function useSimilarMovies(id: string) {
  return useQuery({
    queryKey: ["similar-movies", id],
    queryFn: () => getSimilarMovies(id),
    staleTime: 1000 * 60 * 10,
    enabled: Boolean(id),
  });
}
