export type TmdbTopRatedMovie = {
  id: string;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
};

export type TmdbTopRatedResponse<T> = {
  page?: number;
  results: T[];
  total_pages?: number;
  total_results?: number;
};

export type TmdbTopRatedApiResponse = TmdbTopRatedResponse<TmdbTopRatedMovie>;
