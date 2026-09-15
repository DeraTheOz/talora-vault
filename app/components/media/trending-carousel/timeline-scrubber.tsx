"use client";

import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

import type { TmdbTrendingTitles } from "@/features/trending/types/trending";

interface TimelineScrubberProps {
  items: TmdbTrendingTitles[];
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onPause: () => void;
  onResume: () => void;
}

export default function TimelineScrubber({
  items,
  count,
  activeIndex,
  onSelect,
  onPrev,
  onNext,
  onPause,
  onResume,
}: TimelineScrubberProps) {
  const t = useTranslations("home");
  const mediaT = useTranslations("media");

  return (
    <div
      className="mx-auto mt-10 flex max-w-2xl items-center gap-5 px-1"
      onMouseEnter={onPause}
      onMouseLeave={onResume}>
      <button
        type="button"
        onClick={onPrev}
        aria-label={t("trendingPrev")}
        className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 text-white/70 transition-colors cursor-pointer duration-300 hover:border-talora-red hover:text-talora-red focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-talora-red">
        <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
      </button>

      <div className="relative flex-1 py-3">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/15"
        />

        {items.map((item, index) => {
          const isCurrent = index === activeIndex;
          const tickTitle = item.title ?? item.name ?? mediaT("untitled");

          return (
            <button
              key={`${item.media_type}-${item.id}`}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={t("trendingSlide", {
                index: index + 1,
                count,
                title: tickTitle,
              })}
              aria-current={isCurrent ? "true" : undefined}
              className="absolute top-1/2 grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-talora-red"
              style={{ left: `${(index / (count - 1)) * 100}%` }}>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isCurrent
                    ? "h-2 w-0.75 bg-talora-red bg-linear-to-r from-transparent via-talora-red to-talora-red shadow-[0_0_12px_3px_rgba(252,71,71,0.5)]"
                    : "h-1 w-1 bg-white/25 hover:bg-white/60"
                }`}
              />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onNext}
        aria-label={t("trendingNext")}
        className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 text-white/70 transition-colors cursor-pointer duration-300 hover:border-talora-red hover:text-talora-red focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-talora-red">
        <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
      </button>
    </div>
  );
}
