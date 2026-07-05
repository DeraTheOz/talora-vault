import type { StaticImageData } from "next/image";
import { UserMultipleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import CastList from "./cast-list";

interface CastMember {
  name: string;
  role: string;
  image: StaticImageData;
}

interface CastProps {
  cast: CastMember[];
  title?: string;
}

export default function Cast({ cast, title = "Top Cast" }: CastProps) {
  return (
    <section aria-labelledby="cast-title" className="rounded-lg">
      <h2
        id="cast-title"
        className="flex items-center gap-2 text-2xl font-normal">
        <HugeiconsIcon icon={UserMultipleIcon} size={22} color="currentColor" />
        {title}
      </h2>

      <div className="-mx-4 mt-5 flex gap-3 overflow-x-auto scrollbar-none px-4 pb-2 sm:-mx-6 sm:px-6 xl:-mx-6 xl:px-6">
        {cast.map((person) => (
          <CastList
            key={`${person.name}-${person.role}`}
            name={person.name}
            image={person.image}
            role={person.role}
          />
        ))}
      </div>
    </section>
  );
}
