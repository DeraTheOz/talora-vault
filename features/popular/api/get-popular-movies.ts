import {
  TmdbPopularMovieApiResponse,
  TmdbPopularMovie,
} from "../types/popular";

export async function getPopularMovies(
  lang: string,
): Promise<TmdbPopularMovie[]> {
  const response = await fetch(`/api/tmdb/movie/popular?lang=${lang}`);

  if (!response.ok) {
    throw new Error("Unable to load popular movies");
  }

  const data = (await response.json()) as TmdbPopularMovieApiResponse;

  return data.results;
}
