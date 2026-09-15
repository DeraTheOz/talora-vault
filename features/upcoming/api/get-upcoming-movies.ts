import {
  TmdbUpcomingMovieApiResponse,
  TmdbUpcomingMovie,
} from "../types/upcoming";

export async function getUpcomingMovies(
  lang: string,
): Promise<TmdbUpcomingMovie[]> {
  const response = await fetch(`/api/tmdb/movie/upcoming?lang=${lang}`);

  if (!response.ok) {
    throw new Error("Unable to load upcoming movies");
  }

  const data = (await response.json()) as TmdbUpcomingMovieApiResponse;

  return data.results;
}
