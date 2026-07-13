import type { FilterSelectOption } from "@/features/media/hooks/use-filter-select";

export const movieSortOptions: FilterSelectOption[] = [
  { label: "Most popular", value: "popularity.desc" },
  { label: "Least popular", value: "popularity.asc" },
  { label: "Highest rated", value: "vote_average.desc" },
  { label: "Lowest rated", value: "vote_average.asc" },
  { label: "Newest", value: "primary_release_date.desc" },
  { label: "Oldest", value: "primary_release_date.asc" },
  { label: "Title A–Z", value: "title.asc" },
  { label: "Title Z–A", value: "title.desc" },
];

export const tvSortOptions: FilterSelectOption[] = [
  { label: "Most popular", value: "popularity.desc" },
  { label: "Least popular", value: "popularity.asc" },
  { label: "Highest rated", value: "vote_average.desc" },
  { label: "Lowest rated", value: "vote_average.asc" },
  { label: "Newest", value: "first_air_date.desc" },
  { label: "Oldest", value: "first_air_date.asc" },
  { label: "Title A–Z", value: "name.asc" },
  { label: "Title Z–A", value: "name.desc" },
];
