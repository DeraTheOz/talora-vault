"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { useBookmarkStore } from "@/stores/bookmark/bookmark-store";

import { toggleWatchlistItem } from "@/features/watchlist/actions/watchlist-actions";
import type {
  WatchlistInput,
  WatchlistMediaType,
} from "@/features/watchlist/schemas/watchlist-schema";

type UseWatchlistItemOptions = {
  tmdbId: number;
  mediaType: WatchlistMediaType;
  defaultInWatchlist?: boolean;
};

export function useWatchlistItem({
  tmdbId,
  mediaType,
  defaultInWatchlist = false,
}: UseWatchlistItemOptions) {
  const item: WatchlistInput = { tmdbId, mediaType };

  const isInWatchlist = useBookmarkStore((state) =>
    state.isBookmarked(item, defaultInWatchlist),
  );

  const setBookmark = useBookmarkStore((state) => state.setBookmark);
  const [isPending, startTransition] = useTransition();

  function toggle() {
    const previousValue = isInWatchlist;
    const nextValue = !previousValue;

    setBookmark(item, nextValue);

    startTransition(async () => {
      const result = await toggleWatchlistItem(item);

      if (result?.authRequired) {
        setBookmark(item, previousValue);
        toast.error(result.error);
        return;
      }

      if (typeof result?.isInWatchlist === "boolean") {
        setBookmark(item, result.isInWatchlist);
      }

      toast.success(
        result?.isInWatchlist
          ? "Added to watchlist successfully"
          : "Removed from watchlist successfully",
      );
    });
  }

  return { isInWatchlist, isPending, toggle };
}
