"use client";

import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getAiringTodayTv } from "../api/get-airing-today-tv";

export function useAiringToday() {
  const locale = useLocale();

  return useQuery({
    queryKey: ["airing-today", locale],
    queryFn: () => getAiringTodayTv(locale),
    staleTime: 1000 * 60 * 5,
  });
}
