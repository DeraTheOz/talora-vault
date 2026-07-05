import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Film02Icon } from "@hugeicons/core-free-icons";

import BookmarkButton from "../../ui/bookmark-button";
import movieImage from "@/public/large.jpg";

export default function TrendingMediaCard() {
  return (
    <article className="group relative h-45 w-60 shrink-0 overflow-hidden rounded-lg md:h-57.5 md:w-117.5">
      <Link
        href="/movies/1"
        className="relative block h-full w-full focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-talora-white">
        <Image
          src={movieImage}
          alt=""
          fill
          placeholder="blur"
          sizes="(min-width: 768px) 470px, 240px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Media Detail */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4 md:px-6 md:pb-6">
          <p className="mb-1 flex flex-wrap items-center gap-2 text-xs font-light text-white/75 md:text-[0.9375rem]">
            <span>2019</span>
            <span aria-hidden="true">•</span>
            <span className="inline-flex items-center gap-1">
              <HugeiconsIcon
                icon={Film02Icon}
                size={16}
                color="currentColor"
                aria-hidden="true"
              />
              Movie
            </span>
            <span aria-hidden="true" className="hidden md:block">
              •
            </span>
            <span className="hidden md:block">PG</span>
          </p>

          <h2 className="text-[0.9375rem] font-medium leading-tight text-talora-white transition duration-300 group-hover:text-talora-red md:text-2xl">
            Beyond Earth
          </h2>
        </div>

        {/* Mobile Movie Rating */}
        <span className="absolute bottom-6 right-6 z-20 flex items-center justify-center text-[0.8125rem] uppercase w-8.5 h-5.25 rounded-[0.65625rem] bg-talora-white/15 md:hidden">
          PG
        </span>

        {/* Card Overlay */}
        <span className="image-overlay" aria-hidden="true" />
      </Link>

      <BookmarkButton
        label="Add Beyond Earth to bookmarks"
        removeLabel="Remove Beyond Earth from bookmarks"
        className="absolute right-2 top-2 z-20 size-10 md:right-6 md:top-4"
      />
    </article>
  );
}
