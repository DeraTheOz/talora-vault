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
import type { SeriesDetail } from "@/app/data/series-detail";

interface SeriesFactsProps {
  series: SeriesDetail;
}

export default function SeriesFacts({ series }: SeriesFactsProps) {
  const facts: MediaFactItem[] = [
    {
      id: "rating",
      icon: StarIcon,
      label: series.rating,
    },
    {
      id: "year",
      icon: Calendar03Icon,
      label: series.year,
    },
    {
      id: "seasons",
      icon: Tv01Icon,
      label: `${series.seasons} Seasons`,
    },
    {
      id: "episodes",
      icon: Video01Icon,
      label: `${series.episodes} Episodes`,
    },
    ...series.genres.map((genre) => ({
      id: `genre-${genre}`,
      icon: Film02Icon,
      label: genre,
    })),
  ];

  return <MediaFacts items={facts} ariaLabel="Series facts" />;
}
