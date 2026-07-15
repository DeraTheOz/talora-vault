export type TmdbMovieDetail = {
  id: number;
  title: string;
  overview: string;
  tagline: string;
  status: string;
  release_date: string;
  runtime: number | null;
  vote_average: number;
  vote_count: number;
  genres: { id: number; name: string }[];
  backdrop_path: string | null;
  poster_path: string | null;
};
