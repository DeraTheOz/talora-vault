import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { MediaFilters, TvSortOption } from "@/features/media/types/media";

type TvFilterState = {
  filters: MediaFilters<"tv">;
  setFilters: (filters: MediaFilters<"tv">) => void;
  setGenreId: (genreId?: number) => void;
  setSortBy: (sortBy: TvSortOption) => void;
  resetFilters: () => void;
};

const defaultTvFilters: MediaFilters<"tv"> = {
  sortBy: "popularity.desc",
};

export const useTvFilterStore = create<TvFilterState>()(
  devtools(
    persist(
      (set) => ({
        filters: defaultTvFilters,

        setFilters: (filters) => {
          set({ filters }, false, "tvFilters/setFilters");
        },

        setGenreId: (genreId) => {
          set(
            (state) => ({
              filters: {
                ...state.filters,
                genreId,
              },
            }),
            false,
            "tvFilters/setGenreId",
          );
        },

        setSortBy: (sortBy) => {
          set(
            (state) => ({
              filters: {
                ...state.filters,
                sortBy,
              },
            }),
            false,
            "tvFilters/setSortBy",
          );
        },

        resetFilters: () => {
          set({ filters: defaultTvFilters }, false, "tvFilters/resetFilters");
        },
      }),
      {
        name: "talora-tv-filters",
        partialize: (state) => ({
          filters: state.filters,
        }),
      },
    ),
    { name: "tv-filter-store" },
  ),
);
