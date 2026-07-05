import SimilarMedia from "@/app/components/media/similar/similar-media";
import type { SimilarMovie } from "@/app/data/movie-detail";

interface SimilarMoviesProps {
  movies: SimilarMovie[];
}

export default function SimilarMovies({ movies }: SimilarMoviesProps) {
  return (
    <SimilarMedia
      title="Similar Movies"
      titleId="similar-movies-title"
      items={movies}
      hrefBase="/movies"
      mediaLabel="Movie"
    />
  );
}
