"use client";

import { useQuery } from "@tanstack/react-query";
import { getSimilarTvShows } from "../api/get-similar-series";

export function useSimilarTvShows(id: string) {
  return useQuery({
    queryKey: ["similar-tvShows", id],
    queryFn: () => getSimilarTvShows(id),
    staleTime: 1000 * 60 * 10,
    enabled: Boolean(id),
  });
}
