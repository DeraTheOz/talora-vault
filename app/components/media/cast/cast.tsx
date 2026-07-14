import { UserMultipleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import CastItem from "./cast-item";

export interface CastMember {
  name: string;
  role: string;
  image: string | null;
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

      <div className="mt-5 flex gap-3 overflow-x-auto scrollbar-none pb-2">
        {cast.map((person) => (
          <CastItem
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
