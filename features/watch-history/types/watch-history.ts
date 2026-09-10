import { MediaType } from "@/features/media/types/media";

export type WatchHistoryItem = {
  tmdbId: number;
  mediaType: MediaType;
  title: string;
  releaseDate: string | null;
  posterPath: string | null;
  percentage: number;
  completed: boolean;
  lastWatchedAt: number;
  season?: number;
  episode?: number;
};

export type WatchHistorySortBy =
  | "lastWatchedAt.desc"
  | "title.asc"
  | "title.desc";

export type WatchHistoryMediaTypeFilter = "all" | "movie" | "tv";

export type WatchHistoryFilterState = {
  filters: {
    mediaType: WatchHistoryMediaTypeFilter;
    sortBy: WatchHistorySortBy;
  };
  setFilters: (filters: {
    mediaType: WatchHistoryMediaTypeFilter;
    sortBy: WatchHistorySortBy;
  }) => void;
  setMediaType: (mediaType: WatchHistoryMediaTypeFilter) => void;
  setSortBy: (sortBy: WatchHistorySortBy) => void;
  resetFilters: () => void;
  _hasHydrated: boolean;
  _setHasHydrated: () => void;
};
