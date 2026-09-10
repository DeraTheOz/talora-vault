"use client";

import { useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";

import type { TmdbTvSeasonSummary } from "@/features/series/types/series-detail";
import { useEpisodeSelector } from "@/features/series/hooks/use-episode-selector";
import { useWatchProgressStore } from "@/stores/watch-progress/watch-progress-store";
import EpisodeSelectField from "./episode-select-field";
import EpisodeSummaryCard from "./episode-summary-card";
import { buildEmbedUrl } from "../../media/streaming/build-embed-url";
import Player from "../../media/streaming/player";

interface EpisodeSelectorProps {
  tvShowId: string;
  showName: string;
  seasons: TmdbTvSeasonSummary[];
}

export default function EpisodeSelector({
  tvShowId,
  showName,
  seasons,
}: EpisodeSelectorProps) {
  const t = useTranslations("detail");
  const tmdbId = Number(tvShowId);

  // Find the most recently watched episode for this TV show.
  // Uses getState() so it does not trigger re-renders on every progress save.
  const lastWatched = useMemo(() => {
    const tvProgress = useWatchProgressStore.getState().tvProgress;
    let best: {
      season: number;
      episode: number;
      lastWatchedAt: number;
    } | null = null;
    const prefix = `tv:${tmdbId}:`;

    for (const [key, entry] of Object.entries(tvProgress)) {
      if (!key.startsWith(prefix)) continue;
      if (entry.completed) continue;
      if (!best || entry.lastWatchedAt > best.lastWatchedAt) {
        const parts = key.split(":");
        best = {
          season: Number(parts[2]),
          episode: Number(parts[3]),
          lastWatchedAt: entry.lastWatchedAt,
        };
      }
    }
    return best;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    seasonOptions,
    episodeOptions,
    selectedSeasonValue,
    selectedEpisodeValue,
    selectedEpisode,
    isLoading,
    isError,
    isEpisodeSelectDisabled,
    handleSeasonChange,
    handleEpisodeChange,
    handleRetry,
    goToEpisode,
  } = useEpisodeSelector({
    tvShowId,
    seasons,
    initialSeason: lastWatched?.season,
    initialEpisode: lastWatched?.episode,
  });

  const seasonNum = Number(selectedSeasonValue);
  const episodeNum = selectedEpisode?.episode_number ?? 1;

  // Compute embed URL from episode identity only — never includes resume time.
  const embedUrl = useMemo(
    () =>
      buildEmbedUrl(
        "tv",
        tmdbId,
        selectedSeasonValue,
        selectedEpisode ? String(selectedEpisode.episode_number) : "1",
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tmdbId, selectedSeasonValue, selectedEpisode?.episode_number],
  );

  // Compute resume time once per episode change using a stable selector.
  const resumeTime = useMemo(() => {
    const snap = useWatchProgressStore.getState();
    const entry = snap.getTvProgress(tmdbId, seasonNum, episodeNum);
    if (entry && !entry.completed && entry.currentTime > 0) {
      return entry.currentTime;
    }
    return undefined;
  }, [tmdbId, seasonNum, episodeNum]);

  const handleEpisodeChangeFromPlayer = useCallback(
    (newSeason: number, newEpisode: number) => {
      goToEpisode(newSeason, newEpisode);
    },
    [goToEpisode],
  );

  return (
    <section
      id="episode-selector"
      aria-labelledby="episode-selector-title"
      className="space-y-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 id="episode-selector-title" className="text-2xl font-normal">
          {t("episodes")}
        </h2>
      </div>

      <form className="rounded-lg bg-talora-semi-dark-blue p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <EpisodeSelectField
            id="season"
            name="season"
            label={t("selectSeason")}
            options={seasonOptions}
            value={selectedSeasonValue}
            onChange={handleSeasonChange}
          />

          <EpisodeSelectField
            id="episode"
            name="episode"
            label={t("selectEpisode")}
            options={episodeOptions}
            value={selectedEpisodeValue}
            disabled={isEpisodeSelectDisabled}
            onChange={handleEpisodeChange}
          />
        </div>

        <div className="mt-5">
          {isLoading ? (
            <p className="rounded-lg bg-talora-dark-blue p-4 text-sm text-talora-white/65">
              {t("loadingEpisodes")}
            </p>
          ) : isError ? (
            <div className="rounded-lg bg-talora-dark-blue p-4">
              <p className="text-sm text-talora-white/65">
                {t("episodesLoadError")}
              </p>
              <button
                type="button"
                onClick={() => void handleRetry()}
                className="mt-3 text-sm font-medium text-talora-red transition cursor-pointer hover:text-talora-red/80">
                {t("tryAgain")}
              </button>
            </div>
          ) : (
            <EpisodeSummaryCard episode={selectedEpisode} />
          )}
        </div>
      </form>

      <div id="streaming-preview" aria-labelledby="streaming-title">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 id="streaming-title" className="text-2xl font-normal">
            {t("streamEpisode")}
          </h2>
        </div>

        <Player
          key={`${tmdbId}-${seasonNum}-${episodeNum}`}
          embedUrl={embedUrl}
          title={showName}
          mediaType="tv"
          tmdbId={tmdbId}
          season={seasonNum}
          episode={episodeNum}
          posterPath={selectedEpisode?.still_path ?? null}
          releaseDate={selectedEpisode?.air_date ?? null}
          resumeTime={resumeTime}
          onEpisodeChange={handleEpisodeChangeFromPlayer}
        />
      </div>
    </section>
  );
}
