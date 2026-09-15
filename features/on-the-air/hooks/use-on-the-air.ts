"use client";

import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getOnTheAirTv } from "../api/get-on-the-air-tv";

export function useOnTheAir() {
  const locale = useLocale();

  return useQuery({
    queryKey: ["on-the-air", locale],
    queryFn: () => getOnTheAirTv(locale),
    staleTime: 1000 * 60 * 5,
  });
}
