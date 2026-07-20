import { Tv01Icon } from "@hugeicons/core-free-icons";

import MediaHero from "@/app/components/media/hero/media-hero";
import { getTmdbImageUrl } from "@/lib/tmdb/tmdb-image";
import { TmdbTvDetail } from "@/features/series/types/series-detail";
import { formatReleaseYear } from "@/lib/helpers/format";

interface SeriesHeroProps {
  tvShow: TmdbTvDetail;
  isBookmarked?: boolean;
}

export default function SeriesHero({
  tvShow,
  isBookmarked = false,
}: SeriesHeroProps) {
  // Fallback to the other path if one does not exist
  const desktopPath = tvShow.backdrop_path ?? tvShow.poster_path;
  const mobilePath = tvShow.poster_path ?? tvShow.backdrop_path;

  const imageUrl = desktopPath ? getTmdbImageUrl(desktopPath) : null;
  const mobileImageUrl = mobilePath
    ? getTmdbImageUrl(mobilePath, "w780")
    : null;

  const tvShowStatus =
    tvShow.status === "Released" ? "Released" : tvShow.status;

  return (
    <MediaHero
      tmdbId={tvShow.id}
      mediaType="tv"
      titleId={`tvShow-${tvShow.id}`}
      title={tvShow.name}
      overview={tvShow.overview}
      image={imageUrl}
      mobileImage={mobileImageUrl}
      mediaLabel="TV Series"
      mediaIcon={Tv01Icon}
      year={formatReleaseYear(tvShow.first_air_date)}
      status={tvShowStatus}
      secondaryHref="#episode-selector"
      secondaryLabel="Choose episode"
      defaultInWatchlist={isBookmarked}
    />
  );
}
