import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { MediaType } from "@/features/media/types/media";

type WatchlistKey = `${MediaType}:${number}`;

type WatchlistItem = {
  tmdbId: number;
  mediaType: MediaType;
};

type BookmarkState = {
  isSignedIn: boolean;
  bookmarkedById: Record<WatchlistKey, boolean>;
  hydrateBookmarks: (items: WatchlistItem[]) => void;
  setAuthStatus: (isSignedIn: boolean) => void;
  isBookmarked: (item: WatchlistItem, fallback?: boolean) => boolean;
  setBookmark: (item: WatchlistItem, value: boolean) => void;
};

function getWatchlistKey(item: WatchlistItem): WatchlistKey {
  return `${item.mediaType}:${item.tmdbId}`;
}

export const useBookmarkStore = create<BookmarkState>()(
  devtools(
    (set, get) => ({
      isSignedIn: false,
      bookmarkedById: {},

      setAuthStatus: (isSignedIn) => {
        set({ isSignedIn }, false, "bookmark/setAuthStatus");
      },

      hydrateBookmarks: (items) => {
        const nextBookmarkedById = items.reduce<Record<WatchlistKey, boolean>>(
          (acc, item) => {
            acc[getWatchlistKey(item)] = true;
            return acc;
          },
          {},
        );

        set(
          {
            bookmarkedById: nextBookmarkedById,
          },
          false,
          "bookmark/hydrateBookmarks",
        );
      },

      isBookmarked: (item, fallback = false) => {
        return get().bookmarkedById[getWatchlistKey(item)] ?? fallback;
      },

      setBookmark: (item, value) => {
        set(
          (state) => ({
            bookmarkedById: {
              ...state.bookmarkedById,
              [getWatchlistKey(item)]: value,
            },
          }),
          false,
          "bookmark/setBookmark",
        );
      },
    }),
    {
      name: "bookmark-store",
    },
  ),
);
