"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Bookmark02Icon,
  Film02Icon,
  Home04Icon,
  Tv01Icon,
} from "@hugeicons/core-free-icons";

const navigationItems = [
  {
    href: "/",
    label: "Home",
    icon: Home04Icon,
  },
  {
    href: "/movies",
    label: "Movies",
    icon: Film02Icon,
  },
  {
    href: "/series",
    label: "TV series",
    icon: Tv01Icon,
  },
  {
    href: "/watchlist",
    label: "Watchlist",
    icon: Bookmark02Icon,
  },
] as const;

type NavLinksProps = {
  variant?: "default" | "tablet" | "desktop" | "bottom";
};

export default function NavLinks({ variant = "default" }: NavLinksProps) {
  const pathname = usePathname();
  const isBottomNav = variant === "bottom";
  const isTabletNav = variant === "tablet";
  const isDesktopNav = variant === "desktop";

  return (
    <ul
      className={[
        isBottomNav ? "grid grid-cols-4 items-center gap-1" : "",
        isTabletNav ? "flex items-center gap-6 md:gap-8" : "",
        isDesktopNav ? "flex w-full flex-col gap-8" : "",
        variant === "default"
          ? "flex items-center gap-6 md:gap-8 xl:flex-col xl:gap-10"
          : "",
      ].join(" ")}>
      {navigationItems.map(({ href, label, icon }) => {
        const isActive =
          href === "/" ? pathname === href : pathname.startsWith(href);

        return (
          <li key={href} className={isDesktopNav ? "w-full" : undefined}>
            <Link
              href={href}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className={[
                "relative group rounded-md transition-colors duration-200",
                "hover:text-talora-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-talora-red active:scale-95 xl:rounded-lg",
                isBottomNav
                  ? "inline-flex h-12 w-full flex-col items-center justify-center gap-1"
                  : "",

                isTabletNav
                  ? "h-13 min-w-12 flex-col items-center justify-center gap-1"
                  : "",

                isDesktopNav
                  ? "grid h-10 w-72 grid-cols-[6rem_1fr] items-center hover:bg-talora-greyish-blue/10"
                  : "",

                variant === "default"
                  ? "inline-flex size-10 items-center justify-center"
                  : "",

                isActive && isDesktopNav
                  ? "text-talora-red! xl:group-hover/sidebar:bg-talora-red/15"
                  : "",

                isActive && !isDesktopNav
                  ? "hover:text-talora-red! text-talora-red"
                  : "",

                !isActive ? "text-talora-greyish-blue" : "",
              ].join(" ")}>
              <span
                className={
                  isDesktopNav
                    ? "flex size-10 items-center justify-center justify-self-center"
                    : "flex items-center justify-center"
                }>
                <HugeiconsIcon
                  icon={icon}
                  size={isBottomNav || isTabletNav ? 22 : 24}
                  color="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </span>

              {isDesktopNav ? (
                <span className="whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-200 xl:group-hover/sidebar:opacity-100">
                  {label}
                </span>
              ) : null}

              {isBottomNav || isTabletNav ? (
                <span className="text-[0.6875rem] font-medium leading-none">
                  {label}
                </span>
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
