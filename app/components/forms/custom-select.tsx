"use client";

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
  value?: string;
  defaultValue?: string;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export default function CustomSelect({
  id,
  name,
  options,
  value,
  disabled,
  onChange,
  defaultValue = "",
  ariaLabel,
  className = "mt-2",
}: CustomSelectProps) {
  const selectValueProps = value === undefined ? { defaultValue } : { value };

  return (
    <div className={`relative ${className}`}>
      <select
        id={id}
        name={name}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.value)}
        aria-label={ariaLabel}
        {...selectValueProps}
        className="select w-full cursor-pointer rounded-lg border border-talora-dark-blue bg-talora-dark-blue py-3 pl-4 pr-12 text-sm text-talora-white outline-none transition focus:border-talora-red disabled:cursor-not-allowed disabled:opacity-60">
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
