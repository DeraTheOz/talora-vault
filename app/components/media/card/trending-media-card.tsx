import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Film02Icon, Tv01Icon } from "@hugeicons/core-free-icons";

import BookmarkButton from "../../ui/bookmark-button";

import { getTmdbImageUrl } from "@/lib/tmdb/tmdb-image";
import { TmdbTrendingTitles } from "@/features/trending/types/trending";
import { formatReleaseYear } from "@/lib/helpers/format";

interface TrendingMediaProps {
  trendingTitle: TmdbTrendingTitles;
}

export default function TrendingMediaCard({
  trendingTitle,
}: TrendingMediaProps) {
  const title = trendingTitle.title ?? trendingTitle.name ?? "Untitled";
  const imagePath = trendingTitle.backdrop_path ?? trendingTitle.poster_path;
  const imageUrl = imagePath ? getTmdbImageUrl(imagePath) : null;
  const isMovie = trendingTitle.media_type === "movie";
  const mediaType = isMovie ? "Movie" : "TV Series";
  const href = isMovie
    ? `/movies/${trendingTitle.id}`
    : `/series/${trendingTitle.id}`;
  const mediaIcon = isMovie ? Film02Icon : Tv01Icon;

  return (
    <article className="group relative h-45 w-60 shrink-0 overflow-hidden rounded-lg md:h-57.5 md:w-117.5">
      <Link
        href={href}
        className="relative block h-full w-full focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-talora-white">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${title} poster`}
            fill
            placeholder="blur"
            blurDataURL={imageUrl}
            sizes="(min-width: 768px) 470px, 240px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-talora-semi-dark-blue text-xs text-talora-white/60">
            No display image
          </div>
        )}

        {/* Media Detail */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4 md:px-6 md:pb-6">
          <p className="mb-1 flex flex-wrap items-center gap-2 text-xs font-light text-white/75 md:text-[0.9375rem]">
            <span>
              {formatReleaseYear(
                trendingTitle.release_date || trendingTitle.first_air_date,
              )}
            </span>
            <span aria-hidden="true">•</span>
            <span className="inline-flex items-center gap-1">
              <HugeiconsIcon
                icon={mediaIcon}
                size={16}
                color="currentColor"
                aria-hidden="true"
              />
              {mediaType}
            </span>
          </p>

          <h2 className="text-[0.9375rem] font-medium leading-tight text-talora-white transition duration-300 group-hover:text-talora-red md:text-2xl">
            {title}
          </h2>
        </div>

        {/* Card Overlay */}
        <span className="image-overlay" aria-hidden="true" />
      </Link>

      <BookmarkButton
        tmdbId={trendingTitle.id}
        mediaType={trendingTitle.media_type}
        label={`Add ${title} to watchlist`}
        removeLabel={`Remove ${title} from watchlist`}
        className="absolute right-2 top-2 z-20 size-10 md:right-6 md:top-4"
      />
    </article>
  );
}
