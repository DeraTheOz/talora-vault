import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Film02Icon, Tv01Icon } from "@hugeicons/core-free-icons";
import type { SimilarMediaCardItem } from "@/features/media/types/media";

interface SimilarMediaCardProps extends SimilarMediaCardItem {
  href: string;
}

export default function SimilarMediaCard({
  href,
  image,
  title,
  year,
  mediaType,
}: SimilarMediaCardProps) {
  const icon = mediaType === "movie" ? Film02Icon : Tv01Icon;

  return (
    <Link
      href={href}
      className="group rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-talora-white">
      <article>
        <div className="relative aspect-164/110 overflow-hidden rounded-lg bg-talora-semi-dark-blue">
          {image ? (
            <Image
              src={image}
              alt=""
              fill
              sizes="(min-width: 768px) 180px, 45vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-talora-white/30">
              <HugeiconsIcon icon={icon} size={32} color="currentColor" />
            </div>
          )}
        </div>

        <h3 className="mt-2 text-sm font-medium leading-tight md:text-base">
          {title}
        </h3>

        <p className="mt-1 text-xs text-talora-white/60">
          {mediaType === "movie" ? "Movie" : "TV Series"} • {year}
        </p>
      </article>
    </Link>
  );
}
