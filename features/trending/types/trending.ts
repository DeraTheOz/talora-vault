export type TmdbTrendingMediaType = "movie" | "tv";

export type TmdbTrendingTitles = {
  id: number;
  title: string;
  name: string;
  media_type: TmdbTrendingMediaType;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  first_air_date: string;
};

export type TmdbTrendingResponse<T> = {
  page?: number;
  results: T[];
  total_pages?: number;
  total_results?: number;
};

export type TmdbTrendingTitlesApiResponse =
  TmdbTrendingResponse<TmdbTrendingTitles>;
