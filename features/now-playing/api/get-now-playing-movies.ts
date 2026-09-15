import {
  TmdbMovieListResponse,
  TmdbNowPlayingMovie,
} from "../types/now-playing";

export async function getNowPlayingMovies(
  lang: string,
): Promise<TmdbNowPlayingMovie[]> {
  const response = await fetch(`/api/tmdb/movie/now-playing?lang=${lang}`);

  if (!response.ok) {
    throw new Error("Unable to load now playing movies");
  }

  const data = (await response.json()) as TmdbMovieListResponse;

  return data.results;
}