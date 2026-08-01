"use client";

import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { ProfileStatsProps } from "@/features/profile/types/profile";
import { createStatCards } from "./stat-cards";

export default function ProfileStats(props: ProfileStatsProps) {
  const t = useTranslations("profile");
  const statCards = createStatCards((key) => t(key), props);

  return (
    <section aria-label={t("statsHeading")} className="space-y-4">
      <h2
        id="activity-heading"
        className="text-xl font-normal md:text-[2rem] md:leading-tight">
        {t("statsHeading")}
      </h2>
      <div className="grid max-[369px]:grid-cols-1 grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-x-7 md:gap-y-6 xl:grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))]">
        {statCards.map((card) => {
          const value = card.getValue(props);
          return (
            <div
              key={card.key}
              className="flex items-center gap-3 rounded-xl bg-talora-semi-dark-blue p-4 md:p-5">
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${card.bg} ${card.color}`}>
                <HugeiconsIcon icon={card.icon} size={22} />
              </div>

              <div className="min-w-0 flex flex-col justify-between">
                <p className="truncate text-xs text-talora-white/60 md:text-sm">
                  {card.label}
                </p>
                <p className="text-lg font-bold leading-tight md:text-xl">
                  {value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
