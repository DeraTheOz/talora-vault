import { TmdbSimilarMediaResponse } from "@/features/media/types/media";

export async function getSimilarMovies(
  id: string,
): Promise<TmdbSimilarMediaResponse> {
  const response = await fetch(`/api/tmdb/movie/${id}/similar`);

  if (!response.ok) {
    throw new Error(`Unable to load similar movies for movie ${id}`);
  }

  return response.json() as Promise<TmdbSimilarMediaResponse>;
}
