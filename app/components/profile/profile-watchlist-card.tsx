"use client";

import { useTranslations } from "next-intl";
import { RecentWatchlistItem } from "@/features/profile/types/profile";
import { formatDate } from "@/lib/helpers/format";
import { getTmdbImageUrl } from "@/lib/tmdb/tmdb-image";
import Image from "next/image";
import Link from "next/link";

interface ProfileWatchlistCardProps {
  item: RecentWatchlistItem;
}

export default function ProfileWatchlistCard({
  item,
}: ProfileWatchlistCardProps) {
  const t = useTranslations("profile");
  const imageUrl = item.posterPath
    ? getTmdbImageUrl(item.posterPath, "w92")
    : null;
  const href =
    item.mediaType === "movie"
      ? `/movies/${item.tmdbId}`
      : `/series/${item.tmdbId}`;

  return (
    <Link
      href={href}
      className="group flex shrink-0 items-center gap-3 rounded-xl bg-talora-semi-dark-blue p-3 transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white md:w-auto">
      {/* Thumbnail */}
      <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-talora-greyish-blue/20 md:size-16">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.title}
            fill
            className="object-cover"
            sizes="64px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[0.625rem] text-talora-white/40">
            {t("noImage")}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-talora-white transition group-hover:text-talora-red md:text-base">
          {item.title}
        </p>
        <p className="mt-0.5 text-xs text-talora-white/50">
          {t("addedOn", { date: formatDate(item.addedAt) })}
        </p>
      </div>
    </Link>
  );
}
