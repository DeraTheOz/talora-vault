import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { WatchHistoryFilterState } from "@/features/watch-history/types/watch-history";

const defaultWatchHistoryFilters = {
  mediaType: "all" as const,
  sortBy: "lastWatchedAt.desc" as const,
};

export const useWatchHistoryFilterStore = create<WatchHistoryFilterState>()(
  devtools(
    persist(
      (set) => ({
        filters: defaultWatchHistoryFilters,
        _hasHydrated: false,

        setFilters: (filters) => {
          set({ filters }, false, "watchHistoryFilters/setFilters");
        },

        setMediaType: (mediaType) => {
          set(
            (state) => ({
              filters: { ...state.filters, mediaType },
            }),
            false,
            "watchHistoryFilters/setMediaType",
          );
        },

        setSortBy: (sortBy) => {
          set(
            (state) => ({ filters: { ...state.filters, sortBy } }),
            false,
            "watchHistoryFilters/setSortBy",
          );
        },

        resetFilters: () => {
          set(
            { filters: defaultWatchHistoryFilters },
            false,
            "watchHistoryFilters/resetFilters",
          );
        },

        _setHasHydrated: () => {
          set({ _hasHydrated: true }, false, "watchHistoryFilters/hydrated");
        },
      }),
      {
        name: "talora-watch-history-filters",
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
    { name: "watch-history-filter-store" },
  ),
);
