"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getNowPlayingMovies } from "../api/get-now-playing-movies";
import { getNowPlayingTv } from "../api/get-now-playing-tv";
import type {
  TmdbNowPlayingMovie,
  TmdbNowPlayingTvShow,
} from "../types/now-playing";

type NowPlayingTab = "movie" | "tv";
type NowPlayingResult = TmdbNowPlayingMovie | TmdbNowPlayingTvShow;

export function useNowPlaying() {
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<NowPlayingTab>("movie");

  const query = useQuery<NowPlayingResult[], Error>({
    queryKey: ["now-playing", activeTab, locale],
    queryFn: async () => {
      if (activeTab === "movie") {
        return getNowPlayingMovies(locale);
      }
      return getNowPlayingTv(locale);
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    activeTab,
    setActiveTab,
  };
}
