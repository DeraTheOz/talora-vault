import { Tv01Icon } from "@hugeicons/core-free-icons";

import MediaCard from "@/app/components/media/card/media-card";
import seriesImage from "@/public/large.jpg";

export default function SeriesCard() {
  return (
    <MediaCard
      href="/series/1"
      title="Beyond Earth"
      year="2019"
      rating="8.7"
      maturity="TV"
      image={seriesImage}
      mediaLabel="TV Series"
      mediaIcon={Tv01Icon}
    />
  );
}
