import { TmdbGenreApiResponse } from "../types/movies";

export async function getMovieGenres(): Promise<TmdbGenreApiResponse> {
  const response = await fetch("/api/tmdb/movie/genres");

  if (!response.ok) {
    throw new Error("Unable to load movie genres");
  }

  return response.json();
}
