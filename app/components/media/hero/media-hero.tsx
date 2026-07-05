import Image, { type StaticImageData } from "next/image";
import { BookmarkAdd02Icon, PlayCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";

interface MediaHeroProps {
  titleId: string;
  title: string;
  overview: string;
  image: StaticImageData;
  mediaLabel: string;
  mediaIcon: IconSvgElement;
  year: string;
  maturity: string;
  secondaryHref: string;
  secondaryLabel: string;
  watchlistLabel?: string;
}

export default function MediaHero({
  titleId,
  title,
  overview,
  image,
  mediaLabel,
  mediaIcon,
  year,
  maturity,
  secondaryHref,
  secondaryLabel,
  watchlistLabel = "Add to watchlist",
}: MediaHeroProps) {
  return (
    <section
      aria-labelledby={titleId}
      className="relative isolate overflow-hidden rounded-lg px-4 pb-8 pt-56 md:px-6 md:pt-72 xl:mx-0 xl:px-8 xl:pt-80">
      <Image
        src={image}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(16,20,30,0.15)_0%,rgba(16,20,30,0.78)_48%,#10141e_100%)]"
      />

      <div className="max-w-4xl">
        <p className="mb-3 flex flex-wrap items-center gap-2 text-sm text-talora-white/75">
          <span className="inline-flex items-center gap-1.5">
            <HugeiconsIcon icon={mediaIcon} size={16} color="currentColor" />
            {mediaLabel}
          </span>
          <span aria-hidden="true">•</span>
          <span>{year}</span>
          <span aria-hidden="true">•</span>
          <span>{maturity}</span>
        </p>

        <h1
          id={titleId}
          className="max-w-3xl text-4xl font-medium leading-none md:text-6xl">
          {title}
        </h1>

        <p className="mt-4 max-w-2xl text-base text-talora-white/80 md:text-lg">
          {overview}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-talora-red px-5 text-sm font-medium text-talora-white transition hover:bg-talora-red/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white active:scale-95">
            <HugeiconsIcon
              icon={BookmarkAdd02Icon}
              size={19}
              color="currentColor"
            />
            {watchlistLabel}
          </button>

          <a
            href={secondaryHref}
            className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-talora-white/10 px-5 text-sm font-medium text-talora-white ring-1 ring-talora-white/15 transition hover:bg-talora-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white">
            <HugeiconsIcon
              icon={PlayCircleIcon}
              size={20}
              color="currentColor"
            />
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
