import SimilarMediaCard from "./similar-media-card";
import type { SimilarMediaCardItem } from "@/features/media/types/media";

interface SimilarMediaProps {
  title: string;
  titleId: string;
  items: SimilarMediaCardItem[];
}

export default function SimilarMedia({
  title,
  titleId,
  items,
}: SimilarMediaProps) {
  return (
    <section aria-labelledby={titleId}>
      <h2 id={titleId} className="mb-4 text-2xl font-normal">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-2">
        {items.map((item) => (
          <SimilarMediaCard
            key={item.id}
            {...item}
            href={
              item.mediaType === "movie"
                ? `/movies/${item.id}`
                : `/series/${item.id}`
            }
          />
        ))}
      </div>
    </section>
  );
}
