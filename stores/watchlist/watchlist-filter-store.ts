import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type WatchlistSortBy = "added_at.desc" | "title.asc" | "title.desc";
export type WatchlistMediaTypeFilter = "all" | "movie" | "tv";

type WatchlistFilterState = {
  filters: {
    mediaType: WatchlistMediaTypeFilter;
    sortBy: WatchlistSortBy;
  };
  setFilters: (filters: {
    mediaType: WatchlistMediaTypeFilter;
    sortBy: WatchlistSortBy;
  }) => void;
  setMediaType: (mediaType: WatchlistMediaTypeFilter) => void;
  setSortBy: (sortBy: WatchlistSortBy) => void;
  resetFilters: () => void;
  _hasHydrated: boolean;
  _setHasHydrated: () => void;
};

const defaultWatchlistFilters = {
  mediaType: "all" as const,
  sortBy: "added_at.desc" as const,
};

export const useWatchlistFilterStore = create<WatchlistFilterState>()(
  devtools(
    persist(
      (set) => ({
        filters: defaultWatchlistFilters,
        _hasHydrated: false,

        setFilters: (filters) => {
          set({ filters }, false, "watchlistFilters/setFilters");
        },

        setMediaType: (mediaType) => {
          set(
            (state) => ({
              filters: { ...state.filters, mediaType },
            }),
            false,
            "watchlistFilters/setMediaType",
          );
        },

        setSortBy: (sortBy) => {
          set(
            (state) => ({ filters: { ...state.filters, sortBy } }),
            false,
            "watchlistFilters/setSortBy",
          );
        },

        resetFilters: () => {
          set(
            { filters: defaultWatchlistFilters },
            false,
            "watchlistFilters/resetFilters",
          );
        },

        _setHasHydrated: () => {
          set({ _hasHydrated: true }, false, "watchlistFilters/hydrated");
        },
      }),
      {
        name: "talora-watchlist-filters",
        partialize: (state) => ({
          filters: state.filters,
        }),
        onRehydrateStorage: () => (state, error) => {
          if (!error && state) {
            state._setHasHydrated();
          }
        },
      },
    ),
    { name: "watchlist-filter-store" },
  ),
);
