"use client";

import type { MouseEvent } from "react";
import { useShallow } from "zustand/shallow";

import { useBookmarkStore } from "@/stores/bookmark/bookmark-store";

export function useBookmark(bookmarkId: string, defaultBookmarked = false) {
  const isBookmarked = useBookmarkStore(
    useShallow((state) => state.isBookmarked(bookmarkId, defaultBookmarked)),
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    toggleBookmark(bookmarkId, defaultBookmarked);
    return event;
  }

  return { isBookmarked, handleClick };
}
