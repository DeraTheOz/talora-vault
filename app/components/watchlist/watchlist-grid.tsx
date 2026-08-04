"use client";

import { useTranslations } from "next-intl";
import MediaCard from "@/app/components/media/card/media-card";
import type { WatchlistMediaItem } from "@/features/watchlist/types/watchlist";
import Link from "next/link";
import { usePathname } from "next/navigation";

type WatchlistGridProps = {
  media: WatchlistMediaItem[];
  isSignedIn: boolean;
};

export default function WatchlistGrid({
  media,
  isSignedIn,
}: WatchlistGridProps) {
  const t = useTranslations("watchlist");
  const pathname = usePathname();

  // Empty state — not signed in
  if (!isSignedIn) {
    return (
      <section aria-labelledby="watchlist-heading" className="mb-16 space-y-4">
        <h1
          id="watchlist-heading"
          className="text-xl font-normal md:text-[2rem] md:leading-tight">
          {t("title")}
        </h1>

        <p className="max-w-xl text-sm text-talora-white/70">
          {t("loginPrompt")}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}
            className="inline-flex min-h-11 items-center rounded-lg bg-talora-red px-6 text-sm font-medium text-talora-white transition hover:bg-talora-red/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white active:scale-95">
            {t("login")}
          </Link>

          <Link
            href="/"
            className="ml-1 inline-flex min-h-11 items-center rounded-lg bg-talora-white/10 px-6 text-sm font-medium text-talora-white ring-1 ring-talora-white/15 transition hover:bg-talora-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white">
            {t("exploreTitles")}
          </Link>
        </div>
      </section>
    );
  }

  // Empty state — signed in but watchlist is empty
  if (media.length === 0) {
    return (
      <section aria-labelledby="watchlist-heading" className="mb-16 space-y-4">
        <h1
          id="watchlist-heading"
          className="text-xl font-normal md:text-[2rem] md:leading-tight">
          {t("yourWatchlist")}
        </h1>

        <p className="max-w-xl text-sm text-talora-white/70">
          {t("emptyWatchlist")}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/"
            className="ml-1 inline-flex min-h-11 items-center rounded-lg bg-talora-white/10 px-6 text-sm font-medium text-talora-white ring-1 ring-talora-white/15 transition hover:bg-talora-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white">
            {t("exploreTitles")}
          </Link>
        </div>
      </section>
    );
  }

  // Populated state — render the grid
  return (
    <div className="grid max-[369px]:grid-cols-1 grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-x-7 md:gap-y-6 xl:grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] xl:gap-x-10 xl:gap-y-8 xl:pr-8">
      {media.map((item) => (
        <MediaCard
          key={`${item.media_type}-${item.id}`}
          media={item}
          defaultInWatchlist={true}
        />
      ))}
    </div>
  );
}
