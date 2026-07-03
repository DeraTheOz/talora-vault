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
    <aside aria-labelledby="cast-title" className="xl:sticky xl:top-6">
      <section className="rounded-lg bg-talora-semi-dark-blue p-4 md:p-6">
        <h2
          id="cast-title"
          className="flex items-center gap-2 text-2xl font-normal">
          <HugeiconsIcon
            icon={UserMultipleIcon}
            size={22}
            color="currentColor"
          />
          {title}
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-2">
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
    </aside>
  );
}
