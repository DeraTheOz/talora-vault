"use client";

import { useState, type ButtonHTMLAttributes, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  BookmarkAdd02Icon,
  BookmarkRemove02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { useWatchlistItem } from "@/features/watchlist/hooks/use-watchlist-item";
import type { WatchlistMediaType } from "@/features/watchlist/schemas/watchlist-schema";
import { useBookmarkStore } from "@/stores/bookmark/bookmark-store";

type BookmarkButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-label"
> & {
  tmdbId: number;
  mediaType: WatchlistMediaType;
  label?: string;
  removeLabel?: string;
  defaultInWatchlist?: boolean;
  variant?: "icon" | "hero";
};

const iconButtonClasses = [
  "group/bookmark inline-flex items-center justify-center rounded-full backdrop-blur transition duration-300",
  "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white active:scale-95",
  "disabled:cursor-not-allowed disabled:opacity-60",
];

export default function BookmarkButton({
  tmdbId,
  mediaType,
  label,
  removeLabel = "Remove from watchlist",
  defaultInWatchlist = false,
  variant = "icon",
  className = "",
  onClick,
  disabled,
  ...props
}: BookmarkButtonProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const pathname = usePathname();
  const isSignedIn = useBookmarkStore((state) => state.isSignedIn);
  const { isInWatchlist, isPending, toggle } = useWatchlistItem({
    tmdbId,
    mediaType,
    defaultInWatchlist,
  });

  const isHero = variant === "hero";

  const heroButtonClasses = [
    "inline-flex min-h-12 items-center gap-2 rounded-lg px-5 text-sm font-medium",
    "cursor-pointer transition duration-300",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white active:scale-95",
    "disabled:cursor-not-allowed disabled:opacity-60",
    isInWatchlist
      ? "bg-talora-white text-talora-red shadow-[0_0_0_4px_rgba(255,255,255,0.18)] hover:bg-talora-red hover:text-talora-white"
      : "bg-talora-red text-talora-white hover:bg-talora-red/85",
  ];

  const authModal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bookmark-auth-title"
      className="fixed inset-0 z-50 grid place-items-center bg-talora-dark-blue/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-talora-semi-dark-blue p-6 text-talora-white shadow-2xl">
        <h2 id="bookmark-auth-title" className="text-xl font-medium">
          Save to your watchlist
        </h2>

        <p className="mt-2 text-sm text-talora-white/70">
          Log in to keep track of movies and TV series you want to watch later.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}
            className="inline-flex min-h-11 items-center rounded-lg bg-talora-red px-6 text-sm font-medium text-talora-white transition hover:bg-talora-red/85">
            Log in
          </Link>

          <button
            type="button"
            onClick={() => setShowAuthModal(false)}
            className="inline-flex min-h-11 items-center rounded-lg bg-talora-white/10 px-6 text-sm font-medium text-talora-white cursor-pointer transition hover:bg-talora-white/15">
            Keep browsing
          </button>
        </div>
      </div>
    </div>
  );

  function onButtonClick(event: MouseEvent<HTMLButtonElement>) {
    onClick?.(event);

    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }

    toggle();
  }

  return (
    <>
      <button
        type="button"
        aria-label={isInWatchlist ? removeLabel : label}
        aria-pressed={isInWatchlist}
        data-bookmarked={isInWatchlist}
        disabled={disabled || isPending}
        onClick={onButtonClick}
        className={[
          ...(isHero ? heroButtonClasses : iconButtonClasses),
          !isHero &&
            (isInWatchlist
              ? "bg-talora-red text-talora-white shadow-[0_0_0_4px_rgba(252,71,71,0.2)] hover:bg-talora-white hover:text-talora-red"
              : "bg-talora-dark-blue/65 text-talora-white hover:bg-talora-white hover:text-talora-dark-blue"),
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}>
        <HugeiconsIcon
          icon={isInWatchlist ? BookmarkRemove02Icon : BookmarkAdd02Icon}
          size={isHero ? 19 : 18}
          color="currentColor"
          strokeWidth={isInWatchlist ? 2.4 : 1.7}
          className={
            isHero
              ? undefined
              : "transition duration-200 group-data-[bookmarked=true]/bookmark:scale-110"
          }
          aria-hidden="true"
        />

        {isHero && (isInWatchlist ? removeLabel : label)}
      </button>

      {showAuthModal ? createPortal(authModal, document.body) : null}
    </>
  );
}
