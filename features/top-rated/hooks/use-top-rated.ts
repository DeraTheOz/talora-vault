"use client";

import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getTopRated } from "../api/get-top-rated";

export function useTopRated() {
  const locale = useLocale();

  return useQuery({
    queryKey: ["top-rated", locale],
    queryFn: () => getTopRated(locale),
    staleTime: 1000 * 60 * 50,
  });
}
