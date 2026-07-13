"use client";

import type { ReactNode } from "react";

import { ChevronDownIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useFilterSelect } from "@/features/media/hooks/use-filter-select";

export type FilterSelectOption = {
  value: string;
  label: string;
};

type FilterSelectProps = {
  id: string;
  ariaLabel: string;
  value: string;
  options: FilterSelectOption[];
  onChange: (value: string) => void;
  icon?: ReactNode;
};

export default function FilterSelect({
  id,
  ariaLabel,
  value,
  options,
  onChange,
  icon,
}: FilterSelectProps) {
  const {
    rootRef,
    isOpen,
    activeIndex,
    selectedOption,
    setActiveIndex,
    toggleSelect,
    selectOption,
    handleKeyDown,
  } = useFilterSelect(value, options, onChange);

  return (
    <div ref={rootRef} className="relative w-full">
      <button
        id={id}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-listbox`}
        onClick={toggleSelect}
        onKeyDown={handleKeyDown}
        className="flex w-full cursor-pointer items-center rounded-lg border border-talora-dark-blue bg-talora-semi-dark-blue py-3 pl-11 pr-12 text-left text-sm text-talora-white outline-none transition focus:border-talora-red focus-visible:ring-2 focus-visible:ring-talora-red">
        {icon ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 inline-flex -translate-y-1/2 text-talora-white/65">
            {icon}
          </span>
        ) : null}

        <span className="truncate">{selectedOption?.label}</span>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 inline-flex -translate-y-1/2 text-talora-white/65">
          <HugeiconsIcon
            icon={ChevronDownIcon}
            size={18}
            color="currentColor"
          />
        </span>
      </button>

      {isOpen ? (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          aria-label={ariaLabel}
          className="absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-y-auto scrollbar-none rounded-xl border border-talora-dark-blue bg-talora-semi-dark-blue p-1 shadow-2xl shadow-talora-black/40">
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;

            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectOption(option, index)}
                  className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    isSelected || isActive
                      ? "bg-talora-greyish-blue/15 text-talora-white"
                      : "text-talora-white/80 hover:bg-talora-dark-blue hover:text-talora-white"
                  }`}>
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
