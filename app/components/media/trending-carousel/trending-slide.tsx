"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { PanInfo } from "framer-motion";

import { getTmdbImageUrl } from "@/lib/tmdb/tmdb-image";
import type { TmdbTrendingTitles } from "@/features/trending/types/trending";

import {
  fadeTransition,
  pad,
  rankFilterClass,
  springTransition,
} from "./config";
import type { SlidePose } from "./config";

interface TrendingSlideProps {
  item: TmdbTrendingTitles;
  index: number;
  activeIndex: number;
  pose: SlidePose;
  stageWidth: number;
  onActivate: (index: number) => void;
  onDragEnd: (event: unknown, info: PanInfo) => void;
}

export default function TrendingSlide({
  item,
  index,
  activeIndex,
  pose,
  stageWidth,
  onActivate,
  onDragEnd,
}: TrendingSlideProps) {
  const mediaT = useTranslations("media");
  const reducedMotion = useReducedMotion();

  const isActive = index === activeIndex;
  const title = item.title ?? item.name ?? mediaT("untitled");
  const imagePath = item.poster_path ?? item.backdrop_path;
  const imageUrl = imagePath ? getTmdbImageUrl(imagePath, "w500") : null;
  const isMovieItem = item.media_type === "movie";
  const href = isMovieItem ? `/movies/${item.id}` : `/series/${item.id}`;

  return (
    <motion.div
      drag={isActive && !reducedMotion ? "x" : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.18}
      onDragEnd={onDragEnd}
      animate={{
        x: pose.x,
        y: pose.y,
        scale: pose.scale,
        opacity: pose.opacity,
        zIndex: pose.zIndex,
      }}
      transition={{
        x: springTransition,
        y: springTransition,
        scale: springTransition,
        opacity: fadeTransition,
      }}
      className={`group absolute inset-y-0 left-1/2 ${
        isActive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
      }`}
      style={{
        marginLeft: -stageWidth / 2,
        width: stageWidth,
        willChange: "transform",
      }}>
      <Link
        href={href}
        aria-hidden={!isActive}
        tabIndex={isActive ? undefined : -1}
        onClick={(event) => {
          if (!isActive) {
            event.preventDefault();
            onActivate(index);
          }
        }}
        className={`relative block h-full w-full overflow-hidden rounded-lg ring-1 transition-[filter,box-shadow] duration-500 ease-out ${
          rankFilterClass[pose.rank]
        } ${
          isActive ? "ring-white/20" : "ring-white/10 hover:ring-white/30"
        } focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-talora-red`}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={isActive ? mediaT("posterAlt", { title }) : ""}
            fill
            sizes="320px"
            draggable={false}
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-talora-semi-dark-blue text-xs text-white/60">
            {mediaT("noDisplayImage")}
          </div>
        )}

        <span className="image-overlay" aria-hidden="true" />

        {isActive ? (
          <>
            <span className="absolute left-3 top-3 z-30 inline-flex items-center gap-1.5 rounded-sm bg-talora-dark-blue/60 px-2 py-1 font-mono text-[0.65rem] tracking-[0.25em] text-white/85 ring-1 ring-white/10 backdrop-blur-sm">
              <span className="size-1 rounded-full bg-talora-red" />
              T+{pad(index + 1)}
            </span>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2 z-40 hidden opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 md:block md:group-hover:opacity-100">
              <span className="absolute left-0 top-0 size-3.5 border-l-2 border-t-2 border-talora-red/80" />
              <span className="absolute right-0 top-0 size-3.5 border-r-2 border-t-2 border-talora-red/80" />
              <span className="absolute left-0 bottom-0 size-3.5 border-l-2 border-b-2 border-talora-red/80" />
              <span className="absolute right-0 bottom-0 size-3.5 border-r-2 border-b-2 border-talora-red/80" />
            </span>

            {!reducedMotion ? (
              <AnimatePresence>
                <motion.span
                  key={item.id}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
                  <motion.span
                    className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-transparent via-white/12 to-transparent blur-[2px]"
                    initial={{ y: "-130%" }}
                    animate={{ y: "380%" }}
                    transition={{
                      duration: 1.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </motion.span>
              </AnimatePresence>
            ) : null}
          </>
        ) : null}
      </Link>
    </motion.div>
  );
}
