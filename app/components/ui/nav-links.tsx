"use client";

import {
  Bookmark02Icon,
  Film02Icon,
  Home04Icon,
  Tv01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-6 md:gap-8 xl:flex-col xl:gap-10">
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
                "inline-flex size-10 items-center justify-center rounded-md transition-colors duration-200",
                "hover:text-talora-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-talora-red active:scale-95",
                isActive
                  ? "text-talora-red pointer-events-none"
                  : "text-talora-greyish-blue",
              ].join(" ")}>
              <HugeiconsIcon
                icon={icon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
