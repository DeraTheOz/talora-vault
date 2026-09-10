"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { useWatchHistoryFilterStore } from "@/stores/watch-history/watch-history-filter-store";
import WatchHistoryFilter from "./watch-history-filter";
import WatchHistoryGrid from "./watch-history-grid";
import ClearActionButton from "../ui/clear-action-button";
import { MediaSectionSkeleton } from "../media/media-skeletons";
import { useWatchHistory } from "@/features/watch-history/hooks/use-watch-history";
import { WatchHistoryItem } from "@/features/watch-history/types/watch-history";
import ClearHistoryModal from "../modals/clear-history-modal";

function sortHistory(
  items: WatchHistoryItem[],
  sortBy: string,
): WatchHistoryItem[] {
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
    case "lastWatchedAt.desc":
    default:
      return sorted.sort((a, b) => b.lastWatchedAt - a.lastWatchedAt);
  }
}

export default function WatchHistorySection() {
  const t = useTranslations("watchHistory");
  const filters = useWatchHistoryFilterStore((state) => state.filters);
  const hasHydrated = useWatchHistoryFilterStore((state) => state._hasHydrated);

  const {
    watchHistoryItems,
    isConfirmOpen,
    isPending,
    setIsConfirmOpen,
    handleClearHistory,
  } = useWatchHistory();

  const filteredItems = useMemo(() => {
    const filtered =
      filters.mediaType === "all"
        ? watchHistoryItems
        : watchHistoryItems.filter(
            (item) => item.mediaType === filters.mediaType,
          );
    return sortHistory(filtered, filters.sortBy);
  }, [watchHistoryItems, filters.mediaType, filters.sortBy]);

  if (!hasHydrated) {
    return <MediaSectionSkeleton filters />;
  }

  // Empty history — show empty state with explore CTA
  if (watchHistoryItems.length === 0) {
    return (
      <div className="space-y-6 pb-6 md:space-y-8">
        <WatchHistoryGrid items={[]} isSignedIn />
      </div>
    );
  }

  return (
    <section
      aria-labelledby="watch-history-heading"
      className="mb-16 space-y-6">
      <div className="flex flex-col gap-6 justify-between sm:flex-row xl:pr-8">
        <h1
          id="watch-history-heading"
          className="text-2xl font-normal md:text-[2rem] md:leading-tight">
          {t("yourHistory")}
        </h1>

        {watchHistoryItems.length > 0 ? <WatchHistoryFilter /> : null}
      </div>

      {filteredItems.length > 0 ? (
        <WatchHistoryGrid items={filteredItems} isSignedIn />
      ) : (
        <p className="text-sm text-talora-white/70">
          {filters.mediaType === "movie"
            ? t("noMoviesFound")
            : filters.mediaType === "tv"
              ? t("noTvFound")
              : t("noTitlesFound")}
        </p>
      )}

      {watchHistoryItems.length > 0 ? (
        <div className="flex justify-center mt-12">
          <ClearActionButton
            label={t("clearHistory")}
            onClick={() => setIsConfirmOpen(true)}
          />
        </div>
      ) : null}

      {isConfirmOpen ? (
        <ClearHistoryModal
          isPending={isPending}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleClearHistory}
        />
      ) : null}
    </section>
  );
}
