"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Delete01Icon } from "@hugeicons/core-free-icons";

type ClearActionButtonProps = {
  label: string;
  onClick: () => void;
};

export default function ClearActionButton({
  label,
  onClick,
}: ClearActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-talora-red/10 px-6 text-sm font-medium text-talora-red ring-1 ring-talora-red/30 transition hover:bg-talora-red/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white active:scale-95">
      <HugeiconsIcon
        icon={Delete01Icon}
        size={18}
        color="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      {label}
    </button>
  );
}