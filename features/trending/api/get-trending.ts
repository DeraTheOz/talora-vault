import { TmdbTrendingTitlesResponse } from "../types/trending";

export async function getTrending(): Promise<TmdbTrendingTitlesResponse> {
  const response = await fetch("/api/tmdb/trending");

  if (!response.ok) {
    throw new Error("Unable to load trending titles");
  }

  return response.json();
}
