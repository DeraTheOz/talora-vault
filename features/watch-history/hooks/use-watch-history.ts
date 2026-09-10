import { useTranslations } from "next-intl";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { useWatchProgressStore } from "@/stores/watch-progress/watch-progress-store";
import { WatchHistoryItem } from "../types/watch-history";
import { deleteAllWatchProgress } from "@/features/watch-progress/actions/watch-progress-actions";
import { toastStyles } from "@/lib/constants/toast";

export function useWatchHistory() {
  const t = useTranslations("watchHistory");
  const movieProgress = useWatchProgressStore((s) => s.movieProgress);
  const tvProgress = useWatchProgressStore((s) => s.tvProgress);
  const clearAll = useWatchProgressStore((state) => state.clearAll);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const watchHistoryItems = useMemo(() => {
    const result: WatchHistoryItem[] = [];

    for (const [key, entry] of Object.entries(movieProgress)) {
      const tmdbId = Number(key.split(":")[1]);
      result.push({
        tmdbId,
        mediaType: "movie",
        title: entry.title,
        releaseDate: entry.release_date,
        posterPath: entry.poster_path,
        percentage: entry.percentage,
        completed: entry.completed,
        lastWatchedAt: entry.lastWatchedAt,
      });
    }

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
        completed: boolean;
      }
    >();

    for (const [key, entry] of Object.entries(tvProgress)) {
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
          group.completed = entry.completed;
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
          completed: entry.completed,
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
        completed: group.completed,
        lastWatchedAt: group.latestAt,
        season: group.latestSeason,
        episode: group.latestEpisode,
      });
    }

    return result;
  }, [movieProgress, tvProgress]);

  function handleClearHistory() {
    startTransition(async () => {
      const result = await deleteAllWatchProgress();

      if (!result.success) {
        toast.error(t("clearHistoryError"), {
          id: "clear-history-error",
          ...toastStyles.error,
        });
        return;
      }

      clearAll();
      setIsConfirmOpen(false);
      toast.success(t("clearHistorySuccess"));
    });
  }

  return {
    watchHistoryItems,
    isConfirmOpen,
    isPending,
    setIsConfirmOpen,
    handleClearHistory,
  };
}
