"use client";

import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getTrending } from "../api/get-trending";

export function useTrendingTitles() {
  const locale = useLocale();

  return useQuery({
    queryKey: ["trending", locale],
    queryFn: () => getTrending(locale),
    staleTime: 1000 * 60 * 5,
  });
}
