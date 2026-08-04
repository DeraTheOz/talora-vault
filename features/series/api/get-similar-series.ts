import { TmdbSimilarMediaResponse } from "@/features/media/types/media";

export async function getSimilarTvShows(
  id: string,
  lang = "en",
): Promise<TmdbSimilarMediaResponse> {
  const response = await fetch(`/api/tmdb/series/${id}/similar?lang=${lang}`);

  if (!response.ok) {
    throw new Error(`Unable to load similar series for TV show: ${id}`);
  }

  return response.json() as Promise<TmdbSimilarMediaResponse>;
}
