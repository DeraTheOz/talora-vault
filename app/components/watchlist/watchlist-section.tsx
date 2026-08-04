"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { useWatchlistFilterStore } from "@/stores/watchlist/watchlist-filter-store";
import type { WatchlistMediaItem } from "@/features/watchlist/types/watchlist";
import WatchlistFilter from "./watchlist-filter";
import WatchlistGrid from "./watchlist-grid";
import { MediaSectionSkeleton } from "../media/media-skeletons";

interface WatchlistSectionProps {
  media: WatchlistMediaItem[];
}

/**
 * Sorts a watchlist by the given sort option.
 * Handles title sorting (case-insensitive) and added_at sorting (newest first by default).
 *
 * @param items - The array of watchlist items to sort.
 * @param sortBy - The sort option string key.
 * @returns A new sorted array (does not mutate the original).
 */
function sortWatchlist(
  items: WatchlistMediaItem[],
  sortBy: string,
): WatchlistMediaItem[] {
  const sorted = [...items];

  switch (sortBy) {
    case "title.asc":
      return sorted.sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
      );
    case "title.desc":
      return sorted.sort((a, b) =>
        b.title.localeCompare(a.title, undefined, { sensitivity: "base" }),
      );
    case "added_at.desc":
    default:
      return sorted.sort(
        (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
      );
  }
}

export default function WatchlistSection({ media }: WatchlistSectionProps) {
  const t = useTranslations("watchlist");
  const filters = useWatchlistFilterStore((state) => state.filters);
  const hasHydrated = useWatchlistFilterStore((state) => state._hasHydrated);

  const filteredMedia = useMemo(() => {
    const filtered =
      filters.mediaType === "all"
        ? media
        : media.filter((item) => item.media_type === filters.mediaType);
    return sortWatchlist(filtered, filters.sortBy);
  }, [media, filters.mediaType, filters.sortBy]);

  if (!hasHydrated) {
    return <MediaSectionSkeleton filters />;
  }

  return (
    <section aria-labelledby="watchlist-heading" className="mb-16 space-y-6">
      <div className="flex flex-col gap-6 justify-between sm:flex-row xl:pr-8">
        <h1
          id="watchlist-heading"
          className="text-2xl font-normal md:text-[2rem] md:leading-tight">
          {t("yourWatchlist")}
        </h1>

        {media.length > 0 ? <WatchlistFilter /> : null}
      </div>

      {filteredMedia.length > 0 ? (
        <WatchlistGrid media={filteredMedia} isSignedIn />
      ) : (
        <p className="text-sm text-talora-white/70">
          {filters.mediaType === "movie"
            ? t("noMoviesFound")
            : filters.mediaType === "tv"
              ? t("noTvFound")
              : t("noTitlesFound")}
        </p>
      )}
    </section>
  );
}
