import { TmdbTopRatedApiResponse } from "../types/top-rated";

export async function getTopRated(): Promise<TmdbTopRatedApiResponse> {
  const response = await fetch("/api/tmdb/top-rated");

  if (!response.ok) {
    throw new Error("Unable to load top rated content");
  }

  return response.json();
}
