import Image, { StaticImageData } from "next/image";

type CastListProps = {
  name: string;
  image: StaticImageData;
  role: string;
};

export default function CastList({ name, image, role }: CastListProps) {
  return (
    <article className="overflow-hidden rounded-lg bg-talora-dark-blue">
      <div className="relative aspect-4/5 overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          placeholder="blur"
          sizes="(min-width: 1280px) 150px, (min-width: 640px) 30vw, 45vw"
          className="object-cover"
        />
      </div>

      <div className="p-3 border-t border-t-talora-white/5">
        <h3 className="text-sm font-medium leading-tight text-white">{name}</h3>
        <p className="mt-1 text-xs leading-snug text-white/55">{role}</p>
      </div>
    </article>
  );
}
