"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Film02Icon, Tv01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { getTmdbImageUrl } from "@/lib/tmdb/tmdb-image";
import type { SearchResult } from "@/features/search/types/search";

interface SearchResultItemProps {
  result: SearchResult;
  isHighlighted: boolean;
  onSelect: () => void;
}

export default function SearchResultItem({
  result,
  isHighlighted,
  onSelect,
}: SearchResultItemProps) {
  const t = useTranslations("search");
  const mediaT = useTranslations("media");

  // Determine the route based on media type
  const href =
    result.mediaType === "movie"
      ? `/movies/${result.id}`
      : `/series/${result.id}`;

  // Choose the appropriate icon and label for the media type badge
  const isMovie = result.mediaType === "movie";
  const mediaTypeLabel = isMovie ? t("movie") : t("tv");
  const mediaTypeIcon = isMovie ? Film02Icon : Tv01Icon;

  return (
    <li
      id={`search-option-${result.mediaType}-${result.id}`}
      role="option"
      aria-selected={isHighlighted}>
      <Link
        href={href}
        onClick={onSelect}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
          isHighlighted
            ? "bg-talora-greyish-blue/25"
            : "hover:bg-talora-greyish-blue/15"
        }`}>
        {/* Poster thumbnail */}
        <div className="relative h-12 w-8 shrink-0 overflow-hidden rounded bg-talora-semi-dark-blue">
          {result.posterPath ? (
            <Image
              src={getTmdbImageUrl(result.posterPath, "w92")}
              alt={mediaT("posterAlt", { title: result.title })}
              fill
              sizes="32px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[0.5rem] text-talora-white/40">
              {t("notAvailable")}
            </div>
          )}
        </div>

        {/* Title and metadata */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-talora-white">
            {result.title}
          </p>
          <p className="flex items-center gap-1.5 text-xs text-talora-white/60">
            <span>{result.releaseYear}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <HugeiconsIcon
                icon={mediaTypeIcon}
                size={12}
                color="currentColor"
                aria-hidden="true"
              />
              {mediaTypeLabel}
            </span>
          </p>
        </div>
      </Link>
    </li>
  );
}