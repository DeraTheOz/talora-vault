import Image from "next/image";
import { User03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type CastItemProps = {
  name: string;
  image: string | null;
  role: string;
};

export default function CastItem({ name, image, role }: CastItemProps) {
  return (
    <article className="group flex items-center gap-3 rounded-md border border-talora-white/20 hover:border-talora-greyish-blue p-2.5 transition duration-300 hover:bg-talora-dark-blue">
      <div className="relative size-14 shrink-0 overflow-hidden rounded-full sm:size-16 xl:size-14">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1280px) 56px, (min-width: 640px) 64px, 56px"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-talora-semi-dark-blue text-talora-white/40">
            <HugeiconsIcon icon={User03Icon} size={24} color="currentColor" />
          </div>
        )}
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
