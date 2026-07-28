import { MediaType } from "@/features/media/types/media";

export type TmdbSearchMovieResult = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  media_type?: "movie";
};

export type TmdbSearchTvResult = {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  media_type?: "tv";
};

export type TmdbSearchResultItem = TmdbSearchMovieResult | TmdbSearchTvResult;

export type TmdbSearchApiResponse = {
  page: number;
  results: TmdbSearchResultItem[];
  total_pages: number;
  total_results: number;
};

export type SearchResult = {
  id: number;
  title: string;
  posterPath: string | null;
  releaseYear: string;
  voteAverage: number;
  mediaType: MediaType;
};

// Supported search types that map to different TMDB endpoints
export type SearchType = "multi" | "movie" | "tv";
