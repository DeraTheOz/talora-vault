"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { useWatchlistFilterStore } from "@/stores/watchlist/watchlist-filter-store";
import { useBookmarkStore } from "@/stores/bookmark/bookmark-store";
import { clearWatchlist } from "@/features/watchlist/actions/watchlist-actions";
import { toastStyles } from "@/lib/constants/toast";
import type { WatchlistMediaItem } from "@/features/watchlist/types/watchlist";
import WatchlistFilter from "./watchlist-filter";
import WatchlistGrid from "./watchlist-grid";
import ClearActionButton from "../ui/clear-action-button";
import ClearWatchlistModal from "../modals/clear-watchlist-modal";
import { MediaSectionSkeleton } from "../media/media-skeletons";

interface WatchlistSectionProps {
  media: WatchlistMediaItem[];
}

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
  const router = useRouter();
  const filters = useWatchlistFilterStore((state) => state.filters);
  const hasHydrated = useWatchlistFilterStore((state) => state._hasHydrated);
  const clearBookmarks = useBookmarkStore((state) => state.clearBookmarks);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const filteredMedia = useMemo(() => {
    const filtered =
      filters.mediaType === "all"
        ? media
        : media.filter((item) => item.media_type === filters.mediaType);
    return sortWatchlist(filtered, filters.sortBy);
  }, [media, filters.mediaType, filters.sortBy]);

  function handleClearWatchlist() {
    startTransition(async () => {
      const result = await clearWatchlist();

      if (!result.success) {
        toast.error(t("clearWatchlistError"), {
          id: "clear-watchlist-error",
          ...toastStyles.error,
        });
        return;
      }

      clearBookmarks();
      setIsConfirmOpen(false);
      toast.success(t("clearWatchlistSuccess"));
      router.refresh();
    });
  }

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

      {media.length > 0 ? (
        <div className="flex justify-center mt-12">
          <ClearActionButton
            label={t("clearWatchlist")}
            onClick={() => setIsConfirmOpen(true)}
          />
        </div>
      ) : null}

      {isConfirmOpen ? (
        <ClearWatchlistModal
          isPending={isPending}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleClearWatchlist}
        />
      ) : null}
    </section>
  );
}
