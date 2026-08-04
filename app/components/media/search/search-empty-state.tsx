"use client";

import { useTranslations } from "next-intl";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface SearchEmptyStateProps {
  query: string;
}

export default function SearchEmptyState({ query }: SearchEmptyStateProps) {
  const t = useTranslations("search");

  return (
    <div className="flex flex-col items-center gap-2 px-3 py-6 text-talora-white/50">
      <HugeiconsIcon
        icon={Search01Icon}
        size={28}
        color="currentColor"
        aria-hidden="true"
      />
      <p className="text-sm">{t("noResults", { query })}</p>
    </div>
  );
}
