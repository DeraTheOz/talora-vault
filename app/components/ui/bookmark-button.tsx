"use client";

import { type ButtonHTMLAttributes, type MouseEvent } from "react";

import {
  BookmarkAdd02Icon,
  BookmarkRemove02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { useBookmark } from "@/features/bookmarks/hooks/use-bookmark";

type BookmarkButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-label"
> & {
  bookmarkId: string;
  label: string;
  removeLabel?: string;
  defaultBookmarked?: boolean;
};

export default function BookmarkButton({
  bookmarkId,
  label,
  removeLabel = "Remove from bookmarks",
  defaultBookmarked = false,
  className = "",
  onClick,
  ...props
}: BookmarkButtonProps) {
  const { isBookmarked, handleClick } = useBookmark(
    bookmarkId,
    defaultBookmarked,
  );

  function onButtonClick(event: MouseEvent<HTMLButtonElement>) {
    handleClick(event);
    onClick?.(event);
  }

  return (
    <button
      type="button"
      aria-label={isBookmarked ? removeLabel : label}
      aria-pressed={isBookmarked}
      data-bookmarked={isBookmarked}
      onClick={onButtonClick}
      className={[
        "group/bookmark inline-flex items-center justify-center rounded-full backdrop-blur transition duration-300",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white active:scale-95 cursor-pointer",
        isBookmarked
          ? "bg-talora-red text-talora-white shadow-[0_0_0_4px_rgba(252,71,71,0.2)] hover:bg-talora-white hover:text-talora-red"
          : "bg-talora-dark-blue/65 text-talora-white hover:bg-talora-white hover:text-talora-dark-blue",
        className,
      ].join(" ")}
      {...props}>
      <HugeiconsIcon
        icon={isBookmarked ? BookmarkRemove02Icon : BookmarkAdd02Icon}
        size={18}
        color="currentColor"
        strokeWidth={isBookmarked ? 2.4 : 1.7}
        className="transition duration-200 group-data-[bookmarked=true]/bookmark:scale-110"
        aria-hidden="true"
      />
    </button>
  );
}
