import {
  TmdbNowPlayingTvShow,
  TmdbTvListResponse,
} from "../types/now-playing";

export async function getNowPlayingTv(
  lang: string,
): Promise<TmdbNowPlayingTvShow[]> {
  const response = await fetch(`/api/tmdb/tv/now-playing?lang=${lang}`);

  if (!response.ok) {
    throw new Error("Unable to load now playing TV shows");
  }

  const data = (await response.json()) as TmdbTvListResponse;

  return data.results;
}