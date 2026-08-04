import type {
  MovieFilters,
  TmdbMovieApiResponse,
} from "@/features/media/types/media";

export async function getMovies(
  page = 1,
  filters: MovieFilters = {},
  lang = "en",
): Promise<TmdbMovieApiResponse> {
  const searchParams = new URLSearchParams({
    page: String(page),
    lang,
  });

  if (filters.genreId) {
    searchParams.set("genreId", String(filters.genreId));
  }

  if (filters.sortBy) {
    searchParams.set("sortBy", filters.sortBy);
  }

  const response = await fetch(`/api/tmdb/movie?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error("Unable to load movies");
  }

  return response.json();
}
