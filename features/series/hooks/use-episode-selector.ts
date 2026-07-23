"use client";

import { useMemo, useState } from "react";

import type { CustomSelectOption } from "@/app/components/forms/custom-select";
import type {
  TmdbTvEpisode,
  TmdbTvSeasonSummary,
} from "@/features/series/types/series-detail";
import { useTvSeason } from "./use-series-season";

type UseEpisodeSelectorParams = {
  tvShowId: string;
  seasons: TmdbTvSeasonSummary[];
};

// Stable empty array prevents creating a new fallback array on every render.
const emptyEpisodes: TmdbTvEpisode[] = [];

export function useEpisodeSelector({
  tvShowId,
  seasons,
}: UseEpisodeSelectorParams) {
  // Exclude specials/season 0 so the selector starts with regular seasons only.
  const availableSeasons = useMemo(
    () => seasons.filter((season) => season.season_number > 0),
    [seasons],
  );

  // Use the first real season as the default, falling back to season 1 if none exist.
  const firstSeasonNumber = availableSeasons[0]?.season_number ?? 1;
  const [selectedSeason, setSelectedSeason] = useState(firstSeasonNumber);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState("");

  // If the selected season no longer exists in the provided season list, fall back safely.
  const hasSelectedSeason = availableSeasons.some(
    (season) => season.season_number === selectedSeason,
  );
  const activeSeason = hasSelectedSeason ? selectedSeason : firstSeasonNumber;

  // Fetch the full episode list for the season currently shown in the selector.
  const { data, isLoading, isError, refetch } = useTvSeason(
    tvShowId,
    activeSeason,
  );
  const episodes = data?.episodes ?? emptyEpisodes;

  // Prefer the user-selected episode, but default to the first episode when none is selected.
  const selectedEpisode =
    episodes.find((episode) => String(episode.id) === selectedEpisodeId) ??
    episodes[0];

  const episodeValue = selectedEpisode ? String(selectedEpisode.id) : "";

  // Shape seasons for the custom select component.
  const seasonOptions: CustomSelectOption[] = availableSeasons.map(
    (season) => ({
      value: String(season.season_number),
      label: season.name || `Season ${season.season_number}`,
    }),
  );

  // Shape episodes for the custom select component.
  const episodeOptions: CustomSelectOption[] = episodes.map((episode) => ({
    value: String(episode.id),
    label: `E${episode.episode_number} - ${episode.name}`,
  }));

  function handleSeasonChange(value: string) {
    // Reset episode selection so a previous season's episode ID is not reused.
    setSelectedSeason(Number(value));
    setSelectedEpisodeId("");
  }

  return {
    seasonOptions,
    episodeOptions,
    selectedSeasonValue: String(activeSeason),
    selectedEpisodeValue: episodeValue,
    selectedEpisode,
    isLoading,
    isError,
    isEpisodeSelectDisabled: isLoading || episodeOptions.length === 0,
    handleSeasonChange,
    handleEpisodeChange: setSelectedEpisodeId,
    handleRetry: refetch,
  };
}
