export type TmdbMediaType = "movie" | "tv";

export type TmdbNowPlayingMovie = {
  id: number;
  title: string;
  original_title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  popularity: number;
};

export type TmdbNowPlayingTvShow = {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  popularity: number;
};

export type TmdbNowPlayingItem = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  media_type: TmdbMediaType;
  vote_average: number;
  popularity: number;
};

export type TmdbNowPlayingApiResponse = {
  results: TmdbNowPlayingItem[];
};

export type TmdbMovieListResponse = {
  page?: number;
  results: TmdbNowPlayingMovie[];
  total_pages?: number;
  total_results?: number;
};

export type TmdbTvListResponse = {
  page?: number;
  results: TmdbNowPlayingTvShow[];
  total_pages?: number;
  total_results?: number;
};
