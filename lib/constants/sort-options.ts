import type { FilterSelectOption } from "@/features/media/hooks/use-filter-select";

export type SortOptionKey = {
  value: string;
  labelKey: string;
};

export const movieSortOptions: SortOptionKey[] = [
  { labelKey: "sortMostPopular", value: "popularity.desc" },
  { labelKey: "sortLeastPopular", value: "popularity.asc" },
  { labelKey: "sortHighestRated", value: "vote_average.desc" },
  { labelKey: "sortLowestRated", value: "vote_average.asc" },
  { labelKey: "sortNewest", value: "primary_release_date.desc" },
  { labelKey: "sortOldest", value: "primary_release_date.asc" },
  { labelKey: "sortTitleAZ", value: "title.asc" },
  { labelKey: "sortTitleZA", value: "title.desc" },
];

export const tvSortOptions: SortOptionKey[] = [
  { labelKey: "sortMostPopular", value: "popularity.desc" },
  { labelKey: "sortLeastPopular", value: "popularity.asc" },
  { labelKey: "sortHighestRated", value: "vote_average.desc" },
  { labelKey: "sortLowestRated", value: "vote_average.asc" },
  { labelKey: "sortNewest", value: "first_air_date.desc" },
  { labelKey: "sortOldest", value: "first_air_date.asc" },
  { labelKey: "sortTitleAZ", value: "name.asc" },
  { labelKey: "sortTitleZA", value: "name.desc" },
];

export function toFilterSelectOptions(
  options: SortOptionKey[],
  translate: (labelKey: string) => string,
): FilterSelectOption[] {
  return options.map((option) => ({
    value: option.value,
    label: translate(option.labelKey),
  }));
}
