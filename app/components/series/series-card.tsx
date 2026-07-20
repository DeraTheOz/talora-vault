import Link from "next/link";
import Image from "next/image";

import { StarIcon, Tv01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import type { TmdbTvShow } from "@/features/media/types/media";
import { getTmdbImageUrl } from "@/lib/tmdb/tmdb-image";

import BookmarkButton from "../ui/bookmark-button";
import { formatRating, formatReleaseYear } from "@/lib/helpers/format";

interface SeriesCardProps {
  tvShow: TmdbTvShow;
}

export default function SeriesCard({ tvShow }: SeriesCardProps) {
  const imagePath = tvShow.backdrop_path ?? tvShow.poster_path;
  const imageUrl = imagePath ? getTmdbImageUrl(imagePath) : null;

  return (
    <article className="group relative w-full">
      <Link
        href={`/series/${tvShow.id}`}
        className="block rounded-lg transition duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-talora-white">
        <div className="relative aspect-164/110 overflow-hidden rounded-lg bg-talora-semi-dark-blue md:aspect-220/140 xl:aspect-auto xl:h-44.5">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${tvShow.name} poster`}
              fill
              placeholder="blur"
              blurDataURL={imageUrl}
              sizes="(min-width: 1280px) 280px, (min-width: 768px) 220px, 164px"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-talora-semi-dark-blue text-xs text-talora-white/60">
              No display image
            </div>
          )}

          {/* Card Overlay */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,20,30,0)_35%,rgba(16,20,30,0.78)_100%)] opacity-80"
          />

          {/* Media star rating */}
          <div className="absolute left-2 top-3 flex items-center gap-1 rounded-full bg-talora-dark-blue/75 px-2.5 py-1 text-xs font-medium text-talora-white backdrop-blur">
            <HugeiconsIcon
              icon={StarIcon}
              size={13}
              fill="currentColor"
              color="currentColor"
            />
            {formatRating(tvShow.vote_average)}
          </div>
        </div>

        {/* Media Detail */}
        <div className="mt-3">
          <p className="mb-1 flex flex-wrap items-center gap-1.5 text-[0.6875rem] font-light text-talora-white/70 md:text-[0.8125rem]">
            <span>{formatReleaseYear(tvShow.first_air_date)}</span>
            <span aria-hidden="true">•</span>
            <span className="inline-flex items-center gap-1">
              <HugeiconsIcon
                icon={Tv01Icon}
                size={14}
                color="currentColor"
                aria-hidden="true"
              />
              TV Series
            </span>
          </p>

          <h2 className="line-clamp-2 text-sm font-medium leading-tight text-talora-white transition group-hover:text-talora-red md:text-lg">
            {tvShow.name}
          </h2>
        </div>
      </Link>

      <BookmarkButton
        tmdbId={Number(tvShow.id)}
        mediaType="tv"
        label={`Add ${tvShow.name} to watchlist`}
        removeLabel={`Remove ${tvShow.name} from watchlist`}
        className="absolute right-2 top-3 z-10 size-9"
      />
    </article>
  );
}
