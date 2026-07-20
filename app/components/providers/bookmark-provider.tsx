"use client";

import { startTransition, useEffect } from "react";

import { MediaType } from "@/features/media/types/media";
import { useBookmarkStore } from "@/stores/bookmark/bookmark-store";

type BookmarkProviderProps = {
  initialItems: {
    tmdbId: number;
    mediaType: MediaType;
  }[];
  isSignedIn: boolean;
  children: React.ReactNode;
};

export function BookmarkProvider({
  initialItems,
  isSignedIn,
  children,
}: BookmarkProviderProps) {
  const hydrateBookmarks = useBookmarkStore((state) => state.hydrateBookmarks);
  const setAuthStatus = useBookmarkStore((state) => state.setAuthStatus);

  useEffect(() => {
    // Wrap in startTransition to prevent cascading render warnings
    startTransition(() => {
      hydrateBookmarks(initialItems);
      setAuthStatus(isSignedIn);
    });
  }, [hydrateBookmarks, setAuthStatus, isSignedIn, initialItems]);

  return children;
}
