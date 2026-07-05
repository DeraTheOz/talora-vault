import { Film02Icon } from "@hugeicons/core-free-icons";

import MediaHero from "@/app/components/media/hero/media-hero";
import type { MovieDetail } from "@/app/data/movie-detail";

interface MovieHeroProps {
  movie: MovieDetail;
}

export default function MovieHero({ movie }: MovieHeroProps) {
  return (
    <MediaHero
      titleId="movie-title"
      title={movie.title}
      overview={movie.overview}
      image={movie.image}
      mediaLabel="Movie"
      mediaIcon={Film02Icon}
      year={movie.year}
      maturity={movie.maturity}
      secondaryHref="#streaming-preview"
      secondaryLabel="Streaming preview"
    />
  );
}
