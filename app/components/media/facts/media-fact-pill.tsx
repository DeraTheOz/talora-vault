import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";

interface MediaFactPillProps {
  icon: IconSvgElement;
  label: string;
  fill?: string;
}

export default function MediaFactPill({
  icon,
  label,
  fill,
}: MediaFactPillProps) {
  return (
    <div className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-talora-semi-dark-blue px-4 py-3 text-sm font-medium text-white">
      <HugeiconsIcon icon={icon} size={17} color="currentColor" fill={fill} />
      <span>{label}</span>
    </div>
  );
}
