import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type {
  MediaFilters,
  MovieSortOption,
} from "@/features/media/types/media";

type MovieFilterState = {
  filters: MediaFilters<"movie">;
  setFilters: (filters: MediaFilters<"movie">) => void;
  setGenreId: (genreId?: number) => void;
  setSortBy: (sortBy: MovieSortOption) => void;
  resetFilters: () => void;
};

const defaultMovieFilters: MediaFilters<"movie"> = {
  sortBy: "popularity.desc",
};

export const useMovieFilterStore = create<MovieFilterState>()(
  devtools(
    persist(
      (set) => ({
        filters: defaultMovieFilters,

        setFilters: (filters) => {
          set({ filters }, false, "movieFilters/setFilters");
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
            "movieFilters/setGenreId",
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
            "movieFilters/setSortBy",
          );
        },

        resetFilters: () => {
          set(
            { filters: defaultMovieFilters },
            false,
            "movieFilters/resetFilters",
          );
        },
      }),
      {
        name: "talora-movie-filters",
        partialize: (state) => ({
          filters: state.filters,
        }),
      },
    ),
    { name: "movie-filter-store" },
  ),
);
