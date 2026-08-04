import type { SortOptionKey } from "./sort-options";

export const watchlistSortOptions: SortOptionKey[] = [
  { labelKey: "sortRecentlyAdded", value: "added_at.desc" },
  { labelKey: "sortTitleAZ", value: "title.asc" },
  { labelKey: "sortTitleZA", value: "title.desc" },
];
