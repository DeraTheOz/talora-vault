"use client";

import { useQuery } from "@tanstack/react-query";
import { getTrending } from "../api/get-trending";

export function useTrendingTitles() {
  return useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
    staleTime: 1000 * 60 * 5,
  });
}
