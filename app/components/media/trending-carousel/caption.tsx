"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Film02Icon, Tv01Icon } from "@hugeicons/core-free-icons";

import { formatReleaseYear } from "@/lib/helpers/format";
import type { TmdbTrendingTitles } from "@/features/trending/types/trending";

import { pad } from "./config";

interface CaptionProps {
  activeItem: TmdbTrendingTitles;
  activeIndex: number;
}

export default function Caption({ activeItem, activeIndex }: CaptionProps) {
  const t = useTranslations("home");
  const mediaT = useTranslations("media");

  const title = activeItem.title ?? activeItem.name ?? mediaT("untitled");
  const isMovie = activeItem.media_type === "movie";
  const mediaTypeLabel = isMovie ? mediaT("movie") : mediaT("tvSeries");
  const mediaTypeIcon = isMovie ? Film02Icon : Tv01Icon;
  const releaseYear = formatReleaseYear(
    activeItem.release_date || activeItem.first_air_date,
  );
  const detailHref = isMovie
    ? `/movies/${activeItem.id}`
    : `/series/${activeItem.id}`;

  return (
    <div className="mx-auto mt-8 flex max-w-2xl items-end justify-between gap-8 px-1">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}>
          <p className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] tracking-[0.3em] text-white/50">
            <span className="text-talora-red">T+{pad(activeIndex + 1)}</span>
            <span aria-hidden="true">—</span>
            {releaseYear}
            <span aria-hidden="true">—</span>
            <span className="inline-flex items-center gap-1.5">
              <HugeiconsIcon
                icon={mediaTypeIcon}
                size={14}
                color="currentColor"
                aria-hidden="true"
              />
              {mediaTypeLabel}
            </span>
          </p>

          <h3 className="text-xl font-normal text-white md:text-2xl">
            <Link
              href={detailHref}
              className="transition-colors duration-300 hover:text-talora-red focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-talora-red">
              {title}
            </Link>
          </h3>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}>
          <Link
            href={detailHref}
            className="group inline-flex shrink-0 items-center gap-2 border-b border-white/20 pb-0.5 text-sm font-light text-white/75 transition-colors duration-300 hover:border-talora-red hover:text-talora-red focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-talora-red">
            {t("trendingView")}
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={16}
              color="currentColor"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
