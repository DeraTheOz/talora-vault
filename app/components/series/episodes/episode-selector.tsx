"use client";

import { Video01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import type { TmdbTvSeasonSummary } from "@/features/series/types/series-detail";
import { useEpisodeSelector } from "@/features/series/hooks/use-episode-selector";
import EpisodeSelectField from "./episode-select-field";
import EpisodeSummaryCard from "./episode-summary-card";

interface EpisodeSelectorProps {
  tvShowId: string;
  seasons: TmdbTvSeasonSummary[];
}

export default function EpisodeSelector({
  tvShowId,
  seasons,
}: EpisodeSelectorProps) {
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
  } = useEpisodeSelector({ tvShowId, seasons });

  return (
    <section id="episode-selector" aria-labelledby="episode-selector-title">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 id="episode-selector-title" className="text-2xl font-normal">
          Episodes
        </h2>
      </div>

      <form className="rounded-lg bg-talora-semi-dark-blue p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <EpisodeSelectField
            id="season"
            name="season"
            label="Select season"
            options={seasonOptions}
            value={selectedSeasonValue}
            onChange={handleSeasonChange}
          />

          <EpisodeSelectField
            id="episode"
            name="episode"
            label="Select episode"
            options={episodeOptions}
            value={selectedEpisodeValue}
            disabled={isEpisodeSelectDisabled}
            onChange={handleEpisodeChange}
          />
        </div>

        <button
          type="button"
          disabled={!selectedEpisode}
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-talora-red px-5 text-sm font-medium text-talora-white transition cursor-pointer hover:bg-talora-red/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-60">
          <HugeiconsIcon icon={Video01Icon} size={18} color="currentColor" />
          Load episode
        </button>

        <div className="mt-5">
          {isLoading ? (
            <p className="rounded-lg bg-talora-dark-blue p-4 text-sm text-talora-white/65">
              Loading episodes...
            </p>
          ) : isError ? (
            <div className="rounded-lg bg-talora-dark-blue p-4">
              <p className="text-sm text-talora-white/65">
                Episodes could not be loaded right now.
              </p>
              <button
                type="button"
                onClick={() => void handleRetry()}
                className="mt-3 text-sm font-medium text-talora-red transition cursor-pointer hover:text-talora-red/80">
                Try again
              </button>
            </div>
          ) : (
            <EpisodeSummaryCard episode={selectedEpisode} />
          )}
        </div>
      </form>
    </section>
  );
}
