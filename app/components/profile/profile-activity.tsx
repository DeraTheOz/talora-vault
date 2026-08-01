"use client";

import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { Clock01Icon, StarIcon } from "@hugeicons/core-free-icons";

import ProfileReviewCard from "./profile-review-card";
import ProfileWatchlistCard from "./profile-watchlist-card";
import {
  RecentReviewItem,
  RecentWatchlistItem,
} from "@/features/profile/types/profile";

interface ProfileActivityProps {
  recentWatchlist: RecentWatchlistItem[];
  recentReviews: RecentReviewItem[];
}

export default function ProfileActivity({
  recentWatchlist,
  recentReviews,
}: ProfileActivityProps) {
  const t = useTranslations("profile");
  const hasActivity = recentWatchlist.length > 0 || recentReviews.length > 0;

  if (!hasActivity) {
    return (
      <section aria-labelledby="activity-heading" className="space-y-4">
        <h2
          id="activity-heading"
          className="text-xl font-normal md:text-[2rem] md:leading-tight">
          {t("recentActivity")}
        </h2>
        <p className="text-sm text-talora-white/60">{t("noActivity")}</p>
      </section>
    );
  }

  return (
    <section aria-labelledby="activity-heading" className="space-y-4">
      <h2
        id="activity-heading"
        className="text-xl font-normal md:text-[2rem] md:leading-tight">
        {t("recentActivity")}
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent watchlist */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-talora-white/60">
            <HugeiconsIcon icon={Clock01Icon} size={16} />
            <span>{t("recentlyAddedToWatchlist")}</span>
          </div>

          {recentWatchlist.length > 0 ? (
            <div className="flex flex-col gap-2">
              {recentWatchlist.map((item) => (
                <ProfileWatchlistCard
                  key={`${item.mediaType}-${item.tmdbId}`}
                  item={item}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-talora-white/50">{t("noItemsYet")}</p>
          )}
        </div>

        {/* Recent reviews */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-talora-white/60">
            <HugeiconsIcon icon={StarIcon} size={16} />
            <span>{t("latestReviews")}</span>
          </div>

          {recentReviews.length > 0 ? (
            <div className="flex flex-col gap-2">
              {recentReviews.map((item) => (
                <ProfileReviewCard
                  key={`${item.mediaType}-${item.tmdbId}-${item.createdAt}`}
                  item={item}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-talora-white/50">{t("noReviewsYet")}</p>
          )}
        </div>
      </div>
    </section>
  );
}
