import type { IconSvgElement } from "@hugeicons/react";

import MediaFactPill from "./media-fact-pill";

export interface MediaFactItem {
  id: string;
  icon: IconSvgElement;
  label: string;
}

interface MediaFactsProps {
  items: MediaFactItem[];
  ariaLabel?: string;
}

export default function MediaFacts({
  items,
  ariaLabel = "Media facts",
}: MediaFactsProps) {
  return (
    <section aria-label={ariaLabel} className="mt-6">
      <div className="flex flex-wrap gap-3">
        {items.map((item) => (
          <MediaFactPill key={item.id} icon={item.icon} label={item.label} />
        ))}
      </div>
    </section>
  );
}
