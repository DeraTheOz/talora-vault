"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  FilterHorizontalIcon,
  Sorting05Icon,
} from "@hugeicons/core-free-icons";

import FilterSelect from "@/app/components/media/filter/filter-select";
import { useWatchlistFilterStore } from "@/stores/watchlist/watchlist-filter-store";
import { watchlistSortOptions } from "@/lib/constants/watchlist-sort-options";

/**
 * Media type filter options.
 * "all" shows both movies and TV, "movie" and "tv" filter to that type.
 */
const mediaTypeOptions = [
  { label: "All", value: "all" },
  { label: "Movies", value: "movie" },
  { label: "TV Series", value: "tv" },
];

export default function WatchlistFilter() {
  const { filters, setMediaType, setSortBy } = useWatchlistFilterStore();

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <FilterSelect
        id="watchlist-media-type-filter"
        ariaLabel="Filter by media type"
        value={filters.mediaType}
        options={mediaTypeOptions}
        icon={
          <HugeiconsIcon icon={Sorting05Icon} size={18} color="currentColor" />
        }
        onChange={(value) => setMediaType(value as "all" | "movie" | "tv")}
      />

      <FilterSelect
        id="watchlist-sort-filter"
        ariaLabel="Sort watchlist"
        value={filters.sortBy}
        options={watchlistSortOptions}
        icon={
          <HugeiconsIcon
            icon={FilterHorizontalIcon}
            size={18}
            color="currentColor"
          />
        }
        onChange={(value) =>
          setSortBy(value as "added_at.desc" | "title.asc" | "title.desc")
        }
      />
    </div>
  );
}
