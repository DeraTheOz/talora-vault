"use client";

import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FilterHorizontalIcon,
  Sorting05Icon,
} from "@hugeicons/core-free-icons";

import FilterSelect from "@/app/components/media/filter/filter-select";
import { useWatchlistFilterStore } from "@/stores/watchlist/watchlist-filter-store";
import { toFilterSelectOptions } from "@/lib/constants/sort-options";
import { watchlistSortOptions } from "@/lib/constants/watchlist-sort-options";

export default function WatchlistFilter() {
  const t = useTranslations("watchlist");
  const sortT = useTranslations("browse");
  const { filters, setMediaType, setSortBy } = useWatchlistFilterStore();

  const mediaTypeOptions = [
    { label: t("mediaTypeAll"), value: "all" },
    { label: t("mediaTypeMovies"), value: "movie" },
    { label: t("mediaTypeTvSeries"), value: "tv" },
  ];

  return (
    <div className="grid gap-3 items-center grid-cols-[repeat(auto-fit,minmax(180px,1fr))] sm:grid-cols-2">
      <FilterSelect
        id="watchlist-media-type-filter"
        ariaLabel={t("filterByMediaTypeAria")}
        value={filters.mediaType}
        options={mediaTypeOptions}
        icon={
          <HugeiconsIcon icon={Sorting05Icon} size={18} color="currentColor" />
        }
        onChange={(value) => setMediaType(value as "all" | "movie" | "tv")}
      />

      <FilterSelect
        id="watchlist-sort-filter"
        ariaLabel={t("sortAria")}
        value={filters.sortBy}
        options={toFilterSelectOptions(watchlistSortOptions, (key) =>
          sortT(key),
        )}
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
