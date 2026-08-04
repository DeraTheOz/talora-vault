"use client";

import { useTranslations } from "next-intl";
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
  const t = useTranslations("browse");
  const genreOptions: FilterSelectOption[] = [
    { label: t("allGenres"), value: "all" },
    ...genres.map((genre) => ({
      label: genre.name,
      value: String(genre.id),
    })),
  ];

  return (
    <div className="grid gap-3 items-center grid-cols-[repeat(auto-fit,minmax(180px,1fr))] sm:grid-cols-2">
      <FilterSelect
        id="media-genre-filter"
        ariaLabel={t("genreFilterAria")}
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
        ariaLabel={t("sortFilterAria")}
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
