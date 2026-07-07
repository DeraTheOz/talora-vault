export type TmdbTrendingTitles = {
  id: number;
  title: string;
  name: string;
  overview: string;
  media_type: string;
  poster_path: string;
  release_date: string;
  first_air_date: string;
};

export type TmdbResultsResponse<T> = {
  results: T[];
};

export type TmdbTrendingTitlesResponse =
  TmdbResultsResponse<TmdbTrendingTitles>;
