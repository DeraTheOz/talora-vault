import { getTranslations } from "next-intl/server";
import type { IconSvgElement } from "@hugeicons/react";

import MediaFactPill from "./media-fact-pill";

export interface MediaFactItem {
  id: string;
  icon: IconSvgElement;
  label: string;
  fill?: string;
}

interface MediaFactsProps {
  items: MediaFactItem[];
  ariaLabel?: string;
}

export default async function MediaFacts({
  items,
  ariaLabel,
}: MediaFactsProps) {
  const t = await getTranslations("detail");

  return (
    <section aria-label={ariaLabel ?? t("movieFactsAria")} className="mt-6">
      <div className="flex flex-wrap gap-3">
        {items.map((item) => (
          <MediaFactPill
            key={item.id}
            icon={item.icon}
            label={item.label}
            fill={item.fill}
          />
        ))}
      </div>
    </section>
  );
}
