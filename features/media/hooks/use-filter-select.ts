"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

export type FilterSelectOption = {
  value: string;
  label: string;
};

export function useFilterSelect(
  value: string,
  options: FilterSelectOption[],
  onChange: (value: string) => void,
) {
  const selectedIndex = useMemo(
    () =>
      Math.max(
        options.findIndex((option) => option.value === value),
        0,
      ),
    [options, value],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  function openSelect() {
    setActiveIndex(selectedIndex);
    setIsOpen(true);
  }

  function closeSelect() {
    setIsOpen(false);
  }

  function toggleSelect() {
    if (isOpen) {
      closeSelect();
      return;
    }
    openSelect();
  }

  function selectOption(option: FilterSelectOption, index: number) {
    setActiveIndex(index);
    onChange(option.value);
    closeSelect();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case "Escape":
        closeSelect();
        break;

      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          openSelect();
          break;
        }
        setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        break;

      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) {
          openSelect();
          break;
        }
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;

      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;

      case "End":
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;

      case "Enter":
      case " ":
        event.preventDefault();
        if (isOpen) {
          selectOption(options[activeIndex], activeIndex);
        } else {
          openSelect();
        }
        break;

      default:
        break;
    }
  }

  return {
    rootRef,
    isOpen,
    activeIndex,
    selectedOption: options[selectedIndex],
    setActiveIndex,
    toggleSelect,
    selectOption,
    handleKeyDown,
  };
}
