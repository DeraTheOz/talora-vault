"use client";

import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FilterHorizontalIcon,
  Sorting05Icon,
} from "@hugeicons/core-free-icons";

import FilterSelect from "@/app/components/media/filter/filter-select";
import { useWatchHistoryFilterStore } from "@/stores/watch-history/watch-history-filter-store";
import { toFilterSelectOptions } from "@/lib/constants/sort-options";
import { watchHistorySortOptions } from "@/lib/constants/watch-history-sort-options";

export default function WatchHistoryFilter() {
  const t = useTranslations("watchHistory");
  const { filters, setMediaType, setSortBy } = useWatchHistoryFilterStore();

  const mediaTypeOptions = [
    { label: t("mediaTypeAll"), value: "all" },
    { label: t("mediaTypeMovies"), value: "movie" },
    { label: t("mediaTypeTvSeries"), value: "tv" },
  ];

  return (
    <div className="grid gap-3 items-center grid-cols-[repeat(auto-fit,minmax(180px,1fr))] sm:grid-cols-2">
      <FilterSelect
        id="watch-history-media-type-filter"
        ariaLabel={t("filterByMediaTypeAria")}
        value={filters.mediaType}
        options={mediaTypeOptions}
        icon={
          <HugeiconsIcon icon={Sorting05Icon} size={18} color="currentColor" />
        }
        onChange={(value) => setMediaType(value as "all" | "movie" | "tv")}
      />

      <FilterSelect
        id="watch-history-sort-filter"
        ariaLabel={t("sortAria")}
        value={filters.sortBy}
        options={toFilterSelectOptions(watchHistorySortOptions, (key) =>
          t(key),
        )}
        icon={
          <HugeiconsIcon
            icon={FilterHorizontalIcon}
            size={18}
            color="currentColor"
          />
        }
        onChange={(value) =>
          setSortBy(value as "lastWatchedAt.desc" | "title.asc" | "title.desc")
        }
      />
    </div>
  );
}
