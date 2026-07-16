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
  backdrop_path: string | null;
  poster_path: string | null;
};
