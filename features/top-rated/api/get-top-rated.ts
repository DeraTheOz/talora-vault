import {
  TmdbTopRatedMovie,
  TmdbTopRatedMovieApiResponse,
} from "../types/top-rated";

export async function getTopRatedMovies(
  lang: string,
): Promise<TmdbTopRatedMovie[]> {
  const response = await fetch(`/api/tmdb/top-rated?lang=${lang}`);

  if (!response.ok) {
    throw new Error("Unable to load top rated movies");
  }

  const data = (await response.json()) as TmdbTopRatedMovieApiResponse;

  return data.results;
}