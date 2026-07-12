import { create } from "zustand";
import { devtools } from "zustand/middleware";

type BookmarkState = {
  bookmarkedById: Record<string, boolean>;
  isBookmarked: (bookmarkId: string, fallback?: boolean) => boolean;
  toggleBookmark: (bookmarkId: string, fallback?: boolean) => void;
  setBookmark: (bookmarkId: string, value: boolean) => void;
};

export const useBookmarkStore = create<BookmarkState>()(
  devtools(
    (set, get) => ({
      bookmarkedById: {},

      isBookmarked: (bookmarkId, fallback = false) => {
        return get().bookmarkedById[bookmarkId] ?? fallback;
      },

      toggleBookmark: (bookmarkId, fallback = false) => {
        set(
          (state) => {
            const currentValue = state.bookmarkedById[bookmarkId] ?? fallback;

            return {
              bookmarkedById: {
                ...state.bookmarkedById,
                [bookmarkId]: !currentValue,
              },
            };
          },
          false,
          "bookmark/toggleBookmark",
        );
      },

      setBookmark: (bookmarkId, value) => {
        set(
          (state) => ({
            bookmarkedById: {
              ...state.bookmarkedById,
              [bookmarkId]: value,
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
