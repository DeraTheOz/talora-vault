"use client";

import { useQuery } from "@tanstack/react-query";
import { getTvCredits } from "../api/get-series-credits";

export function useTvCredits(id: string) {
  return useQuery({
    queryKey: ["tv-credits", id],
    queryFn: () => getTvCredits(id),
    staleTime: 1000 * 60 * 60,
    enabled: Boolean(id),
  });
}
