"use client";

import { useLocale, useTranslations } from "next-intl";
import { RecentReviewItem } from "@/features/profile/types/profile";
import { formatDate } from "@/lib/helpers/format";
import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

interface ProfileReviewCardProps {
  item: RecentReviewItem;
}

export default function ProfileReviewCard({ item }: ProfileReviewCardProps) {
  const t = useTranslations("profile");
  const locale = useLocale();
  const href =
    item.mediaType === "movie"
      ? `/movies/${item.tmdbId}`
      : `/series/${item.tmdbId}`;

  return (
    <Link
      href={href}
      className="group rounded-xl bg-talora-semi-dark-blue p-4 md:p-5 transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white md:w-auto">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-talora-white transition group-hover:text-talora-red md:text-base">
            {item.title}
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            <HugeiconsIcon
              icon={StarIcon}
              size={15}
              className="fill-talora-white text-talora-white"
            />
            <span className="text-sm font-bold">{item.rating} / 10</span>
          </div>
        </div>
        <span className="shrink-0 text-xs text-talora-white/50">
          {t("createdOn", { date: formatDate(item.createdAt, locale) })}
        </span>
      </div>

      {item.content && (
        <p className="mt-2 line-clamp-2 text-sm text-talora-white/70">
          {item.content}
        </p>
      )}
    </Link>
  );
}
