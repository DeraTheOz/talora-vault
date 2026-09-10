import type { SortOptionKey } from "./sort-options";

export const watchHistorySortOptions: SortOptionKey[] = [
  { labelKey: "sortRecentlyWatched", value: "lastWatchedAt.desc" },
  { labelKey: "sortTitleAZ", value: "title.asc" },
  { labelKey: "sortTitleZA", value: "title.desc" },
];
