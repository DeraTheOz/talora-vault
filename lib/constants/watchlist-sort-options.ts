import type { FilterSelectOption } from "@/features/media/hooks/use-filter-select";

export const watchlistSortOptions: FilterSelectOption[] = [
  { label: "Recently added", value: "added_at.desc" },
  { label: "Title A–Z", value: "title.asc" },
  { label: "Title Z–A", value: "title.desc" },
];
