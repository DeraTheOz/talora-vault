import { Film02Icon } from "@hugeicons/core-free-icons";

import MediaCard from "@/app/components/media/card/media-card";
import movieImage from "@/public/large.jpg";

export default function MovieCard() {
  return (
    <MediaCard
      href="/movies/1"
      title="Beyond Earth"
      year="2019"
      rating="8.7"
      maturity="PG"
      image={movieImage}
      mediaLabel="Movie"
      mediaIcon={Film02Icon}
    />
  );
}
