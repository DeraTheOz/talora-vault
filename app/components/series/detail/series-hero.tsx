import { Tv01Icon } from "@hugeicons/core-free-icons";

import MediaHero from "@/app/components/media/hero/media-hero";
import type { SeriesDetail } from "@/app/data/series-detail";

interface SeriesHeroProps {
  series: SeriesDetail;
}

export default function SeriesHero({ series }: SeriesHeroProps) {
  return (
    <MediaHero
      titleId="series-title"
      title={series.title}
      overview={series.overview}
      image={series.image}
      mediaLabel="TV Series"
      mediaIcon={Tv01Icon}
      year={series.year}
      maturity={series.maturity}
      secondaryHref="#episode-selector"
      secondaryLabel="Choose episode"
    />
  );
}
