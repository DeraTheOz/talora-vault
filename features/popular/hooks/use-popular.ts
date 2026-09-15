"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../api/get-popular-movies";
import { getPopularTv } from "../api/get-popular-tv";
import type { TmdbPopularMovie, TmdbPopularTvShow } from "../types/popular";

type PopularTab = "movie" | "tv";
type PopularResult = TmdbPopularMovie | TmdbPopularTvShow;

export function usePopular() {
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<PopularTab>("movie");

  const query = useQuery<PopularResult[], Error>({
    queryKey: ["popular", activeTab, locale],
    queryFn: async () => {
      if (activeTab === "movie") {
        return getPopularMovies(locale);
      }
      return getPopularTv(locale);
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    activeTab,
    setActiveTab,
  };
}
