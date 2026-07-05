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
  variant?: "default" | "bottom";
};

export default function NavLinks({ variant = "default" }: NavLinksProps) {
  const pathname = usePathname();
  const isBottomNav = variant === "bottom";

  return (
    <ul
      className={
        isBottomNav
          ? "grid grid-cols-4 items-center gap-1"
          : "flex items-center gap-6 md:gap-8 xl:flex-col xl:gap-10"
      }>
      {navigationItems.map(({ href, label, icon }) => {
        const isActive =
          href === "/" ? pathname === href : pathname.startsWith(href);

        return (
          <li key={href}>
            <Link
              href={href}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className={[
                "inline-flex rounded-md transition-colors duration-200",
                "hover:text-talora-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-talora-red active:scale-95",
                isBottomNav
                  ? "h-12 w-full flex-col items-center justify-center gap-1"
                  : "size-10 items-center justify-center",
                isActive
                  ? "pointer-events-none text-talora-red"
                  : "text-talora-greyish-blue",
              ].join(" ")}>
              <HugeiconsIcon
                icon={icon}
                size={isBottomNav ? 22 : 24}
                color="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              />

              {isBottomNav ? (
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
