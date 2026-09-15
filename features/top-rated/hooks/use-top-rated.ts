"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getTopRatedMovies } from "../api/get-top-rated";
import { getTopRatedTv } from "../api/get-top-rated-tv";
import type { TmdbTopRatedMovie, TmdbTopRatedTvShow } from "../types/top-rated";

type TopRatedTab = "movie" | "tv";
type TopRatedResult = TmdbTopRatedMovie | TmdbTopRatedTvShow;

export function useTopRated() {
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<TopRatedTab>("movie");

  const query = useQuery<TopRatedResult[], Error>({
    queryKey: ["top-rated", activeTab, locale],
    queryFn: async () => {
      if (activeTab === "movie") {
        return getTopRatedMovies(locale);
      }
      return getTopRatedTv(locale);
    },
    staleTime: 1000 * 60 * 50,
  });

  return {
    ...query,
    activeTab,
    setActiveTab,
  };
}
