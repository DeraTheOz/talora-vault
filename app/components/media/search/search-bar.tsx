"use client";

import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import SearchDropdown from "@/app/components/media/search/search-dropdown";
import { useSearchBar } from "@/features/search/hooks/use-search-bar";
import { SearchType } from "@/features/search/types/search";

interface SearchBarProps {
  placeholder: string;
  searchType?: SearchType;
}

export default function SearchBar({
  placeholder,
  searchType = "multi",
}: SearchBarProps) {
  const {
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
  } = useSearchBar(searchType);

  return (
    <div ref={containerRef} className="relative w-full xl:pr-6">
      <form
        role="search"
        aria-label={placeholder}
        onSubmit={(e) => e.preventDefault()}>
        <label htmlFor={searchInputId} className="sr-only">
          {placeholder}
        </label>

        <div className="flex min-h-12 items-center gap-4 md:gap-6">
          <HugeiconsIcon
            icon={Search01Icon}
            size={32}
            color="currentColor"
            aria-hidden="true"
            className="shrink-0 text-talora-white"
          />

          <input
            ref={inputRef}
            id={searchInputId}
            name="search"
            type="search"
            autoComplete="off"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
            aria-controls="search-dropdown"
            aria-autocomplete="list"
            aria-activedescendant={activeDescendantId ?? ""}
            className="w-full border-0 border-b border-transparent bg-transparent py-2 font-light text-talora-white caret-talora-red outline-none placeholder:text-talora-white/50   
  transition-colors hover:border-talora-greyish-blue focus:border-talora-white"
          />
        </div>
      </form>

      <SearchDropdown
        isOpen={isDropdownOpen}
        query={debouncedQuery}
        results={results}
        isResultsLoading={isResultsLoading}
        recentSearches={recentSearches}
        isHistoryLoading={isHistoryLoading}
        selectedIndex={selectedIndex}
        onResultSelect={handleResultSelect}
        onHistorySelect={handleHistorySelect}
        onHistoryDelete={handleHistoryDelete}
      />
    </div>
  );
}
