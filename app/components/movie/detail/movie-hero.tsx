import { Film02Icon } from "@hugeicons/core-free-icons";
import { getTranslations } from "next-intl/server";

import MediaHero from "@/app/components/media/hero/media-hero";
import type { TmdbMovieDetail } from "@/features/movie/types/movie-detail";
import { getTmdbImageUrl } from "@/lib/tmdb/tmdb-image";
import { formatReleaseYear } from "@/lib/helpers/format";

interface MovieHeroProps {
  movie: TmdbMovieDetail;
  isBookmarked?: boolean;
}

export default async function MovieHero({
  movie,
  isBookmarked = false,
}: MovieHeroProps) {
  const t = await getTranslations("detail");

  // Fallback to the other path if one does not exist
  const desktopPath = movie.backdrop_path ?? movie.poster_path;
  const mobilePath = movie.poster_path ?? movie.backdrop_path;

  const imageUrl = desktopPath ? getTmdbImageUrl(desktopPath) : null;
  const mobileImageUrl = mobilePath
    ? getTmdbImageUrl(mobilePath, "w780")
    : null;

  const movieStatus = movie.status === "Released" ? "Released" : movie.status;

  return (
    <MediaHero
      tmdbId={movie.id}
      mediaType="movie"
      titleId={`movie-${movie.id}`}
      title={movie.title}
      overview={movie.overview}
      image={imageUrl}
      mobileImage={mobileImageUrl}
      mediaLabel={t("movie")}
      mediaIcon={Film02Icon}
      year={formatReleaseYear(movie.release_date)}
      status={movieStatus}
      secondaryHref="#streaming-preview"
      secondaryLabel={t("streamingPreview")}
      watchlistLabel={t("addToWatchlist")}
      defaultInWatchlist={isBookmarked}
    />
  );
}
