import {
  TmdbUpcomingTvApiResponse,
  TmdbUpcomingTvShow,
} from "../types/upcoming";

export async function getUpcomingTv(
  lang: string,
): Promise<TmdbUpcomingTvShow[]> {
  const response = await fetch(`/api/tmdb/tv/popular?lang=${lang}`);

  if (!response.ok) {
    throw new Error("Unable to load upcoming TV shows");
  }

  const data = (await response.json()) as TmdbUpcomingTvApiResponse;

  return data.results;
}
