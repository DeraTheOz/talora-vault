"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { useSearch } from "./use-search";
import { normalizeSearchResults } from "../utils/normalize-results";
import { useSearchHistory } from "./use-search-history";
import type { SearchResult, SearchType } from "../types/search";

export function useSearchBar(searchType: SearchType) {
  const router = useRouter();
  const searchInputId = useId();

  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1); // item highlighted by keyboard

  const debouncedQuery = useDebounce(inputValue, 300);

  const { data: rawData, isLoading: isResultsLoading } = useSearch(
    debouncedQuery,
    searchType,
  );

  const results = rawData ? normalizeSearchResults(rawData.results) : undefined;

  const {
    recentSearches,
    isLoading: isHistoryLoading,
    save,
    remove,
  } = useSearchHistory();

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setSelectedIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHistorySelect = useCallback((query: string) => {
    setInputValue(query);
    setSelectedIndex(-1);
    setIsDropdownOpen(true);
    inputRef.current?.focus();
  }, []);

  const handleResultSelect = useCallback(
    // eslint-disable-next-line
    (result?: SearchResult) => {
      if (debouncedQuery.trim().length >= 2) {
        save(debouncedQuery);
      }
      setIsDropdownOpen(false);
      setInputValue("");
      setSelectedIndex(-1);
    },
    [debouncedQuery, save],
  );

  const handleHistoryDelete = useCallback(
    (id: string) => {
      remove(id);
    },
    [remove],
  );

  // Keyboard navigation (Arrow keys, Escape, Enter)
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isDropdownOpen) return;

      const activeList =
        debouncedQuery.trim().length >= 2 ? (results ?? []) : recentSearches;

      if (event.key === "Escape") {
        // Close the dropdown
        setIsDropdownOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prev) =>
          activeList.length > 0
            ? prev < activeList.length - 1
              ? prev + 1
              : 0
            : -1,
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prev) =>
          activeList.length > 0
            ? prev > 0
              ? prev - 1
              : activeList.length - 1
            : -1,
        );
      } else if (event.key === "Enter" && selectedIndex >= 0) {
        event.preventDefault();
        if (debouncedQuery.trim().length >= 2 && results?.[selectedIndex]) {
          // Navigate to detail page
          const item = results[selectedIndex];
          handleResultSelect(item);
          router.push(
            item.mediaType === "movie"
              ? `/movies/${item.id}`
              : `/series/${item.id}`,
          );
        } else if (recentSearches[selectedIndex]) {
          // Fill the input with the search query
          handleHistorySelect(recentSearches[selectedIndex].query);
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    isDropdownOpen,
    debouncedQuery,
    results,
    recentSearches,
    selectedIndex,
    router,
    handleResultSelect,
    handleHistorySelect,
  ]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInputValue(val);
      setSelectedIndex(-1);
      setIsDropdownOpen(val.length > 0 || recentSearches.length > 0);
    },
    [recentSearches.length],
  );

  const handleInputFocus = useCallback(() => {
    if (inputValue.length > 0 || recentSearches.length > 0) {
      setIsDropdownOpen(true);
    }
  }, [inputValue, recentSearches.length]);

  // Compute the aria-activedescendant value based on what's highlighted
  const activeDescendantId = (() => {
    if (selectedIndex < 0) return undefined;

    const isShowingResults =
      debouncedQuery.trim().length >= 2 && results && results.length > 0;

    if (isShowingResults && results[selectedIndex]) {
      const item = results[selectedIndex];
      return `search-option-${item.mediaType}-${item.id}`;
    }

    if (!isShowingResults && recentSearches[selectedIndex]) {
      return `search-history-${recentSearches[selectedIndex].id}`;
    }

    return undefined;
  })();

  return {
    containerRef,
    searchInputId,
    inputRef,
    inputValue,
    results,
    isDropdownOpen,
    debouncedQuery,
    isResultsLoading,
    recentSearches,
    isHistoryLoading,
    selectedIndex,
    activeDescendantId,
    handleInputFocus,
    handleInputChange,
    handleResultSelect,
    handleHistorySelect,
    handleHistoryDelete,
  };
}
