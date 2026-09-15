"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getUpcomingMovies } from "../api/get-upcoming-movies";
import { getUpcomingTv } from "../api/get-upcoming-tv";
import type { TmdbUpcomingMovie, TmdbUpcomingTvShow } from "../types/upcoming";

export type UpcomingTab = "movie" | "tv";

export type UpcomingResult = TmdbUpcomingMovie | TmdbUpcomingTvShow;

export function useUpcoming() {
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<UpcomingTab>("movie");

  const query = useQuery<UpcomingResult[], Error>({
    queryKey: ["upcoming", activeTab, locale],
    queryFn: async () => {
      if (activeTab === "movie") {
        return getUpcomingMovies(locale);
      }
      return getUpcomingTv(locale);
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    activeTab,
    setActiveTab,
  };
}
