import TrendingMediaCard from "./card/trending-media-card";

interface TrendingMediaProps {
  title: string;
  id: string;
  items?: object[]; // Change later
}

export default function TrendingSection({ title, id }: TrendingMediaProps) {
  return (
    <section
      aria-labelledby={id}
      className="min-w-0 overflow-hidden space-y-4 md:space-y-6">
      <h1
        id={id}
        className="text-xl font-normal md:text-[2rem] md:leading-tight">
        {title}
      </h1>

      <div
        className="-mx-4 flex snap-x gap-4 overflow-x-auto pl4 px-4 pb-2 scrollbar-none md:mx-0 md:gap-10 xl:px-0 xl:pr-8"
        aria-label="Trending titles">
        <TrendingMediaCard />
        <TrendingMediaCard />
        <TrendingMediaCard />
        <TrendingMediaCard />
      </div>
    </section>
  );
}
