"use client";

import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import type { CustomSelectOption } from "@/app/components/forms/custom-select";
import type {
  TmdbTvEpisode,
  TmdbTvSeasonSummary,
} from "@/features/series/types/series-detail";
import { useTvSeason } from "./use-series-season";

type UseEpisodeSelectorParams = {
  tvShowId: string;
  seasons: TmdbTvSeasonSummary[];
  initialSeason?: number;
  initialEpisode?: number;
};

// Stable empty array prevents creating a new fallback array on every render.
const emptyEpisodes: TmdbTvEpisode[] = [];

export function useEpisodeSelector({
  tvShowId,
  seasons,
  initialSeason,
  initialEpisode,
}: UseEpisodeSelectorParams) {
  const t = useTranslations("detail");
  // Exclude specials/season 0 so the selector starts with regular seasons only.
  const availableSeasons = useMemo(
    () => seasons.filter((season) => season.season_number > 0),
    [seasons],
  );

  // Use the first real season as the default, falling back to season 1 if none exist.
  const firstSeasonNumber = availableSeasons[0]?.season_number ?? 1;
  const defaultSeason =
    initialSeason != null &&
    availableSeasons.some((s) => s.season_number === initialSeason)
      ? initialSeason
      : firstSeasonNumber;

  const [selectedSeason, setSelectedSeason] = useState(defaultSeason);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState("");
  const [hasUserSelected, setHasUserSelected] = useState(false);

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

  // Derive selectedEpisode: user selection takes priority, then initial, then first.
  const selectedEpisode = useMemo(() => {
    if (selectedEpisodeId) {
      return (
        episodes.find((ep) => String(ep.id) === selectedEpisodeId) ??
        episodes[0]
      );
    }
    if (!hasUserSelected && initialEpisode != null && episodes.length > 0) {
      return (
        episodes.find((ep) => ep.episode_number === initialEpisode) ??
        episodes[0]
      );
    }
    return episodes[0];
  }, [selectedEpisodeId, episodes, hasUserSelected, initialEpisode]);

  const episodeValue = selectedEpisode ? String(selectedEpisode.id) : "";

  // Shape seasons for the custom select component.
  const seasonOptions: CustomSelectOption[] = availableSeasons.map(
    (season) => ({
      value: String(season.season_number),
      label: season.name || t("seasonLabel", { season: season.season_number }),
    }),
  );

  // Shape episodes for the custom select component.
  const episodeOptions: CustomSelectOption[] = episodes.map((episode) => ({
    value: String(episode.id),
    label: t("episodeOptionLabel", {
      episode: episode.episode_number,
      name: episode.name,
    }),
  }));

  function handleSeasonChange(value: string) {
    setHasUserSelected(true);
    // Reset episode selection so a previous season's episode ID is not reused.
    setSelectedSeason(Number(value));
    setSelectedEpisodeId("");
  }

  function handleEpisodeChange(value: string) {
    setHasUserSelected(true);
    setSelectedEpisodeId(value);
  }

  const goToEpisode = useCallback(
    (targetSeason: number, targetEpisode: number) => {
      setHasUserSelected(true);
      const seasonExists = availableSeasons.some(
        (s) => s.season_number === targetSeason,
      );
      if (seasonExists) {
        setSelectedSeason(targetSeason);
      }
      // If targeting the current season, resolve the episode immediately.
      if (targetSeason === activeSeason) {
        const match = episodes.find(
          (ep) => ep.episode_number === targetEpisode,
        );
        if (match) {
          setSelectedEpisodeId(String(match.id));
        } else {
          setSelectedEpisodeId("");
        }
      } else {
        // Different season — episode list will change, clear selection.
        setSelectedEpisodeId("");
      }
    },
    [availableSeasons, activeSeason, episodes],
  );

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
    handleEpisodeChange,
    handleRetry: refetch,
    goToEpisode,
  };
}
