export type TmdbOnTheAirTvShow = {
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

export type TmdbOnTheAirItem = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  media_type: "tv";
  vote_average: number;
  popularity: number;
};

export type TmdbOnTheAirApiResponse = {
  page: number;
  results: TmdbOnTheAirTvShow[];
  total_pages: number;
  total_results: number;
};
