import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";

import BookmarkButton from "../../ui/bookmark-button";

interface MediaCardProps {
  href: string;
  title: string;
  year: string;
  rating: string;
  maturity: string;
  image: StaticImageData;
  mediaLabel: string;
  mediaIcon: IconSvgElement;
  bookmarkLabel?: string;
}

export default function MediaCard({
  href,
  title,
  year,
  rating,
  maturity,
  image,
  mediaLabel,
  mediaIcon,
  bookmarkLabel = `Add ${title} to bookmarks`,
}: MediaCardProps) {
  return (
    <article className="group relative w-full">
      <Link
        href={href}
        className="block rounded-lg transition duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-talora-white">
        <div className="relative aspect-164/110 overflow-hidden rounded-lg bg-talora-semi-dark-blue md:aspect-220/140 xl:aspect-auto xl:h-44.5">
          <Image
            src={image}
            alt=""
            fill
            placeholder="blur"
            sizes="(min-width: 1280px) 280px, (min-width: 768px) 220px, 164px"
            className="object-cover transition duration-300 group-hover:scale-105"
          />

          {/* Card Overlay */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,20,30,0)_35%,rgba(16,20,30,0.78)_100%)] opacity-80"
          />

          {/* Media star rating */}
          <div className="absolute left-2 top-3 flex items-center gap-1 rounded-full bg-talora-dark-blue/75 px-2.5 py-1 text-xs font-medium text-talora-white backdrop-blur">
            <HugeiconsIcon icon={StarIcon} size={13} color="currentColor" />
            {rating}
          </div>
        </div>

        {/* Media Detail */}
        <div className="mt-3">
          <p className="mb-1 flex flex-wrap items-center gap-1.5 text-[0.6875rem] font-light text-talora-white/70 md:text-[0.8125rem]">
            <span>{year}</span>
            <span aria-hidden="true">•</span>
            <span className="inline-flex items-center gap-1">
              <HugeiconsIcon
                icon={mediaIcon}
                size={14}
                color="currentColor"
                aria-hidden="true"
              />
              {mediaLabel}
            </span>
            <span aria-hidden="true">•</span>
            <span>{maturity}</span>
          </p>

          <h2 className="line-clamp-2 text-sm font-medium leading-tight text-talora-white transition group-hover:text-talora-red md:text-lg">
            {title}
          </h2>
        </div>
      </Link>

      <BookmarkButton
        label={bookmarkLabel}
        removeLabel={`Remove ${title} from bookmarks`}
        className="absolute right-2 top-3 z-10 size-9"
      />
    </article>
  );
}
