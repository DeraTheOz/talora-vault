import type { TmdbTvSeasonDetail } from "@/features/series/types/series-detail";

export async function getTvSeason(
  id: string,
  seasonNumber: number,
): Promise<TmdbTvSeasonDetail> {
  const response = await fetch(`/api/tmdb/series/${id}/season/${seasonNumber}`);

  if (!response.ok) {
    throw new Error(`Unable to load season ${seasonNumber} for TV show: ${id}`);
  }

  return response.json() as Promise<TmdbTvSeasonDetail>;
}
