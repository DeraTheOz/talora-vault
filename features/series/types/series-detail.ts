export type TmdbTvSeasonSummary = {
  id: number;
  name: string;
  overview: string;
  season_number: number;
  episode_count: number;
  poster_path: string | null;
  air_date: string | null;
};

export type TmdbTvEpisode = {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  season_number: number;
  runtime: number | null;
  still_path: string | null;
  air_date: string | null;
  vote_average: number;
};

export type TmdbTvSeasonDetail = {
  id: number;
  name: string;
  overview: string;
  season_number: number;
  episodes: TmdbTvEpisode[];
};

export type TmdbTvDetail = {
  id: number;
  name: string;
  overview: string;
  tagline: string;
  status: string;
  first_air_date: string;
  episode_run_time: number[];
  vote_average: number;
  vote_count: number;
  number_of_seasons: number;
  number_of_episodes: number;
  genres: { id: number; name: string }[];
  seasons: TmdbTvSeasonSummary[];
  backdrop_path: string | null;
  poster_path: string | null;
};
