import { ChevronDownIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export interface CustomSelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id: string;
  name: string;
  options: CustomSelectOption[];
  defaultValue?: string;
  ariaLabel?: string;
  className?: string;
}

export default function CustomSelect({
  id,
  name,
  options,
  defaultValue = "",
  ariaLabel,
  className = "mt-2",
}: CustomSelectProps) {
  return (
    <div className={`relative ${className}`}>
      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        aria-label={ariaLabel}
        className="select w-full cursor-pointer rounded-lg border border-talora-dark-blue bg-talora-dark-blue py-3 pl-4 pr-12 text-sm text-talora-white outline-none transition focus:border-talora-red">
        {options.map((option) => (
          <option key={option.value || "empty"} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 inline-flex -translate-y-1/2 text-talora-white/65">
        <HugeiconsIcon icon={ChevronDownIcon} size={18} color="currentColor" />
      </span>
    </div>
  );
}
