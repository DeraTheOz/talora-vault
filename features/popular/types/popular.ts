export type TmdbPopularMovie = {
  id: number;
  title: string;
  original_title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  popularity: number;
  overview: string;
};

export type TmdbPopularTvShow = {
  id: number;
  name: string;
  original_name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  popularity: number;
  overview: string;
};

export type TmdbPopularItem = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  media_type: "movie" | "tv";
  vote_average: number;
  popularity: number;
};

export type TmdbPopularMovieApiResponse = {
  page: number;
  results: TmdbPopularMovie[];
  total_pages: number;
  total_results: number;
};

export type TmdbPopularTvApiResponse = {
  page: number;
  results: TmdbPopularTvShow[];
  total_pages: number;
  total_results: number;
};
