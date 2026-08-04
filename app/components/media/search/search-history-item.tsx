"use client";

import { useTranslations } from "next-intl";
import { Clock01Icon, Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface SearchHistoryItemProps {
  id: string;
  query: string;
  isHighlighted?: boolean;
  onSelect: (query: string) => void;
  onDelete: (id: string) => void;
}

export default function SearchHistoryItem({
  id,
  query,
  isHighlighted = false,
  onSelect,
  onDelete,
}: SearchHistoryItemProps) {
  const t = useTranslations("search");

  return (
    <li id={`search-history-${id}`} role="option" aria-selected={isHighlighted}>
      <div
        onClick={() => onSelect(query)}
        className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
          isHighlighted
            ? "bg-talora-greyish-blue/25"
            : "hover:bg-talora-greyish-blue/15"
        }`}>
        <HugeiconsIcon
          icon={Clock01Icon}
          size={18}
          color="currentColor"
          aria-hidden="true"
          className="shrink-0 text-talora-white/40"
        />

        <span className="min-w-0 flex-1 truncate text-sm text-talora-white/70 hover:text-talora-white transition-colors">
          {query}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="shrink-0 rounded p-1 text-talora-white/30 hover:text-talora-red transition-colors cursor-pointer"
          aria-label={t("removeFromHistory", { query })}>
          <HugeiconsIcon icon={Delete02Icon} size={16} color="currentColor" />
        </button>
      </div>
    </li>
  );
}
