"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { useWatchProgressStore } from "@/stores/watch-progress/watch-progress-store";
import ContinueWatchingCard from "./card/continue-watching-card";

type ContinueWatchingItem = {
  tmdbId: number;
  mediaType: "movie" | "tv";
  title: string;
  releaseDate: string | null;
  posterPath: string | null;
  percentage: number;
  lastWatchedAt: number;
  season?: number;
  episode?: number;
};

export default function ContinueWatchingSection() {
  const t = useTranslations("home");
  const movieProgress = useWatchProgressStore((s) => s.movieProgress);
  const tvProgress = useWatchProgressStore((s) => s.tvProgress);

  const items = useMemo(() => {
    const result: ContinueWatchingItem[] = [];

    // Movies: one card per entry.
    for (const [key, entry] of Object.entries(movieProgress)) {
      if (entry.completed) continue;
      const tmdbId = Number(key.split(":")[1]);
      result.push({
        tmdbId,
        mediaType: "movie",
        title: entry.title,
        releaseDate: entry.release_date,
        posterPath: entry.poster_path,
        percentage: entry.percentage,
        lastWatchedAt: entry.lastWatchedAt,
      });
    }

    // TV: group episodes by tmdbId into one card per show.
    const tvGroups = new Map<
      number,
      {
        title: string;
        releaseDate: string | null;
        posterPath: string | null;
        latestAt: number;
        latestSeason: number;
        latestEpisode: number;
        latestPercentage: number;
      }
    >();

    for (const [key, entry] of Object.entries(tvProgress)) {
      if (entry.completed) continue;
      const parts = key.split(":");
      const tmdbId = Number(parts[1]);
      const season = Number(parts[2]);
      const episode = Number(parts[3]);

      const group = tvGroups.get(tmdbId);
      if (group) {
        if (entry.lastWatchedAt > group.latestAt) {
          group.latestAt = entry.lastWatchedAt;
          group.latestSeason = season;
          group.latestEpisode = episode;
          group.latestPercentage = entry.percentage;
        }
      } else {
        tvGroups.set(tmdbId, {
          title: entry.title,
          releaseDate: entry.release_date,
          posterPath: entry.poster_path,
          latestAt: entry.lastWatchedAt,
          latestSeason: season,
          latestEpisode: episode,
          latestPercentage: entry.percentage,
        });
      }
    }

    for (const [id, group] of tvGroups) {
      result.push({
        tmdbId: id,
        mediaType: "tv",
        title: group.title,
        releaseDate: group.releaseDate,
        posterPath: group.posterPath,
        percentage: group.latestPercentage,
        lastWatchedAt: group.latestAt,
        season: group.latestSeason,
        episode: group.latestEpisode,
      });
    }

    result.sort((a, b) => b.lastWatchedAt - a.lastWatchedAt);
    return result;
  }, [movieProgress, tvProgress]);

  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="continue-watching-heading"
      className="space-y-4 md:space-y-6 mb-16">
      <h2
        id="continue-watching-heading"
        className="text-2xl font-normal md:text-[2rem] md:leading-tight">
        {t("continueWatching")}
      </h2>

      <div className="grid max-[369px]:grid-cols-1 grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-x-7 md:gap-y-6 xl:pr-8 xl:grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] xl:gap-x-10 xl:gap-y-8">
        {items.map((item) => (
          <ContinueWatchingCard
            key={
              item.mediaType === "movie"
                ? `movie:${item.tmdbId}`
                : `tv:${item.tmdbId}`
            }
            tmdbId={item.tmdbId}
            mediaType={item.mediaType}
            title={item.title}
            releaseDate={item.releaseDate}
            posterPath={item.posterPath}
            percentage={item.percentage}
            season={item.season}
            episode={item.episode}
          />
        ))}
      </div>
    </section>
  );
}
