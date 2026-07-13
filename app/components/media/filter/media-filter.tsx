"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  FilterHorizontalIcon,
  Sorting05Icon,
} from "@hugeicons/core-free-icons";

import FilterSelect, { type FilterSelectOption } from "./filter-select";

import type {
  MediaFilters,
  MediaSortOption,
  MediaType,
  TmdbGenre,
} from "@/features/media/types/media";

type MediaFilterProps<TMedia extends MediaType> = {
  genres: TmdbGenre[];
  filters: MediaFilters<TMedia>;
  sortOptions: FilterSelectOption[];
  onFiltersChange: (filters: MediaFilters<TMedia>) => void;
};

export default function MediaFilter<TMedia extends MediaType>({
  genres,
  filters,
  sortOptions,
  onFiltersChange,
}: MediaFilterProps<TMedia>) {
  const genreOptions: FilterSelectOption[] = [
    { label: "All genres", value: "all" },
    ...genres.map((genre) => ({
      label: genre.name,
      value: String(genre.id),
    })),
  ];

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <FilterSelect
        id="media-genre-filter"
        ariaLabel="Filter content by genre"
        value={filters.genreId ? String(filters.genreId) : "all"}
        options={genreOptions}
        icon={
          <HugeiconsIcon icon={Sorting05Icon} size={18} color="currentColor" />
        }
        onChange={(value) =>
          onFiltersChange({
            ...filters,
            genreId: value === "all" ? undefined : Number(value),
          })
        }
      />

      <FilterSelect
        id="media-sort-filter"
        ariaLabel="Sort content"
        value={filters.sortBy ?? sortOptions[0]?.value ?? "popularity.desc"}
        options={sortOptions}
        icon={
          <HugeiconsIcon
            icon={FilterHorizontalIcon}
            size={18}
            color="currentColor"
          />
        }
        onChange={(value) =>
          onFiltersChange({
            ...filters,
            sortBy: value as MediaSortOption<TMedia>,
          })
        }
      />
    </div>
  );
}
