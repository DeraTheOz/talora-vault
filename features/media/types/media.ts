export type MediaType = "movie" | "tv";

export type TmdbPagedResponse<T> = {
  page?: number;
  results: T[];
  total_pages?: number;
  total_results?: number;
};

export type TmdbGenre = {
  id: number;
  name: string;
};

export type TmdbGenreApiResponse = {
  genres: TmdbGenre[];
};

export type TmdbMovie = {
  id: string;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
};

export type TmdbTvShow = {
  id: string;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
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

export type TvSortOption =
  | "popularity.desc"
  | "popularity.asc"
  | "vote_average.desc"
  | "vote_average.asc"
  | "first_air_date.desc"
  | "first_air_date.asc"
  | "name.asc"
  | "name.desc";

export type MediaSortOption<TMedia extends MediaType = MediaType> =
  TMedia extends "movie" ? MovieSortOption : TvSortOption;

export type MediaFilters<TMedia extends MediaType = MediaType> = {
  genreId?: number;
  sortBy?: MediaSortOption<TMedia>;
};

export type TmdbMovieApiResponse = TmdbPagedResponse<TmdbMovie>;
export type TmdbTvApiResponse = TmdbPagedResponse<TmdbTvShow>;

export type MovieFilters = MediaFilters<"movie">;
export type TvFilters = MediaFilters<"tv">;

// ---------------------------------------------------------------------------
// Shared cast / credits types — used by movie AND TV series detail pages
// ---------------------------------------------------------------------------

export type TmdbCastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
};

export type TmdbCrewMember = {
  id: number;
  name: string;
  job: string;
  department: string;
};

export type TmdbCreditsResponse = {
  cast: TmdbCastMember[];
  crew: TmdbCrewMember[];
};

// ---------------------------------------------------------------------------
// Shared movie / tv types — used by movie AND TV series detail pages
// ---------------------------------------------------------------------------

export type TmdbSimilarMediaItem = {
  id: number;
  title?: string;
  name?: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date?: string | null;
  first_air_date?: string | null;
};

export type TmdbSimilarMediaResponse = {
  results: TmdbSimilarMediaItem[];
};

export type SimilarMediaCardItem = {
  id: string;
  title: string;
  image: string | null;
  year: string;
  mediaType: MediaType;
};
