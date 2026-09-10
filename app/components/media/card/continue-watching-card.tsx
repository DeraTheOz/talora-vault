"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { Film02Icon, Tv01Icon } from "@hugeicons/core-free-icons";

import type { MediaType } from "@/features/media/types/media";
import { getTmdbImageUrl } from "@/lib/tmdb/tmdb-image";
import { formatReleaseYear } from "@/lib/helpers/format";

interface ContinueWatchingCardProps {
  tmdbId: number;
  mediaType: MediaType;
  title: string;
  releaseDate: string | null;
  posterPath: string | null;
  percentage: number;
  season?: number;
  episode?: number;
}

export default function ContinueWatchingCard({
  tmdbId,
  mediaType,
  title,
  releaseDate,
  posterPath,
  percentage,
  season,
  episode,
}: ContinueWatchingCardProps) {
  const t = useTranslations("media");
  const imageUrl = posterPath ? getTmdbImageUrl(posterPath) : null;
  const href =
    mediaType === "movie" ? `/movies/${tmdbId}` : `/series/${tmdbId}`;

  const isMovie = mediaType === "movie";
  const mediaTypeLabel = isMovie ? t("movie") : t("tvSeries");
  const mediaIcon = isMovie ? Film02Icon : Tv01Icon;
  const showProgress = !isMovie && season != null && episode != null;

  return (
    <article className="group relative w-full">
      <Link
        href={href}
        className="block rounded-lg transition duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-talora-white">
        <div className="relative aspect-164/110 overflow-hidden rounded-lg bg-talora-semi-dark-blue md:aspect-220/140 xl:aspect-auto xl:h-44.5">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={t("posterAlt", { title })}
              fill
              loading="eager"
              sizes="(min-width: 1280px) 280px, (min-width: 768px) 220px, 164px"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-talora-semi-dark-blue text-xs text-talora-white/60">
              {t("noDisplayImage")}
            </div>
          )}

          {/* Media Detail */}
          <div className="absolute inset-x-0 bottom-2 z-10 px-4 pb-1 md:px-5 md:pb-2">
            <p className="mb-1 flex flex-wrap items-center gap-2 text-xs font-light text-white/75 md:text-[0.9375rem]">
              <span>{formatReleaseYear(releaseDate)}</span>
              <span aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-1">
                <HugeiconsIcon
                  icon={mediaIcon}
                  size={16}
                  color="currentColor"
                  aria-hidden="true"
                />
                {mediaTypeLabel}
              </span>
              {showProgress && (
                <>
                  <span aria-hidden="true">•</span>
                  <span className="inline-flex items-center rounded bg-talora-red/80 px-1.5 py-0.5 text-[0.6875rem] font-medium leading-none text-white md:text-xs">
                    S{season}E{episode}
                  </span>
                </>
              )}
            </p>

            <h2 className="line-clamp-2 text-[0.9375rem] font-medium leading-tight text-talora-white transition duration-300 group-hover:text-talora-red md:text-2xl">
              {title}
            </h2>
          </div>

          {/* Card Overlay */}
          <span aria-hidden="true" className="image-overlay" />

          <div className="absolute inset-x-0 bottom-0 z-10 h-1 bg-white/20">
            <div
              className="h-full bg-talora-red transition-[width] duration-500"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
