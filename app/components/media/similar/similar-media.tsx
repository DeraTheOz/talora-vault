import SimilarMediaCard, {
  type SimilarMediaCardItem,
} from "./similar-media-card";

interface SimilarMediaProps {
  title: string;
  titleId: string;
  items: SimilarMediaCardItem[];
  hrefBase: "/movies" | "/series";
  mediaLabel: "Movie" | "TV Series";
}

export default function SimilarMedia({
  title,
  titleId,
  items,
  hrefBase,
  mediaLabel,
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
            id={item.id}
            href={`${hrefBase}/${item.id}`}
            image={item.image}
            title={item.title}
            category={item.category}
            mediaLabel={mediaLabel}
          />
        ))}
      </div>
    </section>
  );
}
