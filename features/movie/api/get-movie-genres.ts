import type { TmdbGenreApiResponse } from "@/features/media/types/media";

export async function getMovieGenres(lang = "en"): Promise<TmdbGenreApiResponse> {
  const response = await fetch(`/api/tmdb/movie/genres?lang=${lang}`);

  if (!response.ok) {
    throw new Error("Unable to load movie genres");
  }

  return response.json();
}
