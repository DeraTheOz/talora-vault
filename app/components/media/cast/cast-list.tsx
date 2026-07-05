import Image, { StaticImageData } from "next/image";

type CastListProps = {
  name: string;
  image: StaticImageData;
  role: string;
};

export default function CastList({ name, image, role }: CastListProps) {
  return (
    <article className="group flex items-center gap-3 rounded-md border border-talora-white/20 hover:border-talora-greyish-blue p-2.5 transition duration-300 hover:bg-talora-dark-blue">
      <div className="relative size-14 shrink-0 overflow-hidden rounded-full sm:size-16 xl:size-14">
        <Image
          src={image}
          alt=""
          fill
          placeholder="blur"
          sizes="(min-width: 1280px) 56px, (min-width: 640px) 64px, 56px"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="min-w-0">
        <h3 className="truncate text-sm font-medium leading-tight text-white">
          {name}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-snug text-white/55">
          {role}
        </p>
      </div>
    </article>
  );
}
