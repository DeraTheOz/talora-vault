"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

import avatar from "@/public/image-avatar.png";
import { formatName } from "@/lib/helpers/format";

type SidebarProfileLinkProps = {
  name: string | null;
  image: string | null;
  emailVerified: Date | null;
};

export default function SidebarProfileLink({
  name,
  image,
  emailVerified,
}: SidebarProfileLinkProps) {
  const pathname = usePathname();
  const t = useTranslations("profile");
  const isActive = pathname.startsWith("/profile");
  const isVerified = emailVerified !== null;

  return (
    <Link
      href="/profile"
      className="flex items-center xl:grid xl:h-10 xl:w-full xl:grid-cols-[6rem_1fr] xl:rounded-lg xl:hover:bg-talora-greyish-blue/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-talora-red"
      aria-label={name ? `${formatName(name)}` : t("pageTitle")}>
      <div
        className={`size-8 overflow-hidden rounded-lg ring-2 xl:justify-self-center ${
          !isActive
            ? "ring-talora-greyish-blue"
            : isVerified
              ? "ring-green-400"
              : "ring-talora-red"
        }`}>
        <Image
          src={image ?? avatar}
          alt=""
          width={32}
          height={32}
          className="size-full object-cover"
        />
      </div>

      <span
        className={`hidden whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-200 xl:block xl:group-hover/sidebar:opacity-100 ${
          !isActive
            ? "text-talora-white"
            : isVerified
              ? "text-green-400"
              : "text-talora-red"
        }`}>
        {formatName(name)}
      </span>
    </Link>
  );
}
