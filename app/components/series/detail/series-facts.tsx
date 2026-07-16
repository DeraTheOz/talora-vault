import {
  Calendar03Icon,
  Film02Icon,
  StarIcon,
  Tv01Icon,
  Video01Icon,
} from "@hugeicons/core-free-icons";

import MediaFacts, {
  type MediaFactItem,
} from "@/app/components/media/facts/media-facts";
import { TmdbTvDetail } from "@/features/series/types/series-detail";
import {
  formatCount,
  formatRating,
  formatReleaseYear,
} from "@/lib/helpers/format";

interface SeriesFactsProps {
  tvShow: TmdbTvDetail;
}

export default function SeriesFacts({ tvShow }: SeriesFactsProps) {
  const facts: MediaFactItem[] = [
    {
      id: "rating",
      icon: StarIcon,
      label: formatRating(tvShow.vote_average),
      fill: "currentColor",
    },
    {
      id: "year",
      icon: Calendar03Icon,
      label: formatReleaseYear(tvShow.first_air_date),
    },
    {
      id: "seasons",
      icon: Tv01Icon,
      label: formatCount(tvShow.number_of_seasons, "Season", "Seasons"),
    },
    {
      id: "episodes",
      icon: Video01Icon,
      label: formatCount(tvShow.number_of_episodes, "Episode", "Episodes"),
    },
    ...tvShow.genres.map((genre) => ({
      id: `genre-${genre.id}`,
      icon: Film02Icon,
      label: genre.name,
    })),
  ];

  return <MediaFacts items={facts} ariaLabel="Series facts" />;
}
