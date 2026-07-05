import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

export interface SimilarMediaCardItem {
  id: string;
  title: string;
  category: string;
  image: StaticImageData;
}

interface SimilarMediaCardProps extends SimilarMediaCardItem {
  href: string;
  mediaLabel: "Movie" | "TV Series";
}

export default function SimilarMediaCard({
  href,
  image,
  title,
  category,
  mediaLabel,
}: SimilarMediaCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-talora-white">
      <article>
        <div className="relative aspect-164/110 overflow-hidden rounded-lg">
          <Image
            src={image}
            alt=""
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 180px, 45vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>

        <h3 className="mt-2 text-sm font-medium leading-tight md:text-base">
          {title}
        </h3>

        <p className="mt-1 text-xs text-talora-white/60">
          {mediaLabel} • {category}
        </p>
      </article>
    </Link>
  );
}
