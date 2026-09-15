export type TmdbTopRatedMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
};

export type TmdbTopRatedTvShow = {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
};

export type TmdbTopRatedResponse<T> = {
  page?: number;
  results: T[];
  total_pages?: number;
  total_results?: number;
};

export type TmdbTopRatedMovieApiResponse =
  TmdbTopRatedResponse<TmdbTopRatedMovie>;

export type TmdbTopRatedTvApiResponse =
  TmdbTopRatedResponse<TmdbTopRatedTvShow>;