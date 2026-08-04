"use client";

import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getNowPlaying } from "../api/get-now-playing";

export function useNowPlaying() {
  const locale = useLocale();

  return useQuery({
    queryKey: ["now-playing", locale],
    queryFn: () => getNowPlaying(locale),
    staleTime: 1000 * 60 * 5,
  });
}
