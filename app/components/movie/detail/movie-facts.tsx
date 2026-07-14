import {
  Calendar03Icon,
  Clock7Icon,
  Film02Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";

import MediaFacts, {
  type MediaFactItem,
} from "@/app/components/media/facts/media-facts";
import type { TmdbMovieDetail } from "@/features/movie/types/movie-detail";
import {
  formatRating,
  formatReleaseYear,
  formatRuntime,
} from "@/lib/helpers/format";

interface MovieFactsProps {
  movie: TmdbMovieDetail;
}

export default function MovieFacts({ movie }: MovieFactsProps) {
  const facts: MediaFactItem[] = [
    {
      id: "rating",
      icon: StarIcon,
      label: formatRating(movie.vote_average),
      fill: "currentColor",
    },
    {
      id: "year",
      icon: Calendar03Icon,
      label: formatReleaseYear(movie.release_date),
    },
    {
      id: "runtime",
      icon: Clock7Icon,
      label: formatRuntime(movie.runtime),
    },
    ...movie.genres.map((genre) => ({
      id: `genre-${genre.id}`,
      icon: Film02Icon,
      label: genre.name,
    })),
  ];

  return <MediaFacts items={facts} ariaLabel="Movie facts" />;
}
