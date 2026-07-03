import {
  Calendar03Icon,
  Clock7Icon,
  Film02Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";

import MediaFacts, {
  type MediaFactItem,
} from "@/app/components/media/facts/media-facts";
import type { MovieDetail } from "@/app/data/movie-detail";

interface MovieFactsProps {
  movie: MovieDetail;
}

export default function MovieFacts({ movie }: MovieFactsProps) {
  const facts: MediaFactItem[] = [
    {
      id: "rating",
      icon: StarIcon,
      label: movie.rating,
    },
    {
      id: "year",
      icon: Calendar03Icon,
      label: movie.year,
    },
    {
      id: "runtime",
      icon: Clock7Icon,
      label: movie.runtime,
    },
    ...movie.genres.map((genre) => ({
      id: `genre-${genre}`,
      icon: Film02Icon,
      label: genre,
    })),
  ];

  return <MediaFacts items={facts} ariaLabel="Movie facts" />;
}
