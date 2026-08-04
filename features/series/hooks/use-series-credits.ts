"use client";

import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getTvCredits } from "../api/get-series-credits";

export function useTvCredits(id: string) {
  const locale = useLocale();

  return useQuery({
    queryKey: ["tv-credits", id, locale],
    queryFn: () => getTvCredits(id, locale),
    staleTime: 1000 * 60 * 60,
    enabled: Boolean(id),
  });
}
