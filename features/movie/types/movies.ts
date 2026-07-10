export type TmdbMovie = {
  id: string;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
};

export type TmdbMovieResponse<T> = {
  page?: number;
  results: T[];
  total_pages?: number;
  total_results?: number;
};

export type TmdbMovieApiResponse = TmdbMovieResponse<TmdbMovie>;

export type TmdbGenre = {
  id: number;
  name: string;
};

export type TmdbGenreApiResponse = {
  genres: TmdbGenre[];
};

export type MovieSortOption =
  | "popularity.desc"
  | "popularity.asc"
  | "vote_average.desc"
  | "vote_average.asc"
  | "primary_release_date.desc"
  | "primary_release_date.asc"
  | "title.asc"
  | "title.desc";

export type MovieFilters = {
  genreId?: number;
  sortBy?: MovieSortOption;
};
