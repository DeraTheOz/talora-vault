"use client";

import { useEffect, useState } from "react";

/**
 * Debounces a value by the given delay in milliseconds.
 *
 * @param value  - The value to debounce (typically a search query string).
 * @param delay  - Debounce delay in milliseconds (default: 300ms).
 * @returns The debounced value that stabilizes after the delay period.
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timer that updates the debounced value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear the timer if the value changes before the delay expires
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
