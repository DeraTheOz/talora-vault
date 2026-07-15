"use client";

import { useQuery } from "@tanstack/react-query";
import { getNowPlaying } from "../api/get-now-playing";

export function useNowPlaying() {
  return useQuery({
    queryKey: ["now-playing"],
    queryFn: getNowPlaying,
    staleTime: 1000 * 60 * 5,
  });
}
