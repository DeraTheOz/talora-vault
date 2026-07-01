import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface SearchBarProps {
  placeholder: string;
}

export default function SearchBar({ placeholder }: SearchBarProps) {
  return (
    <form role="search" className="w-full pr-6" aria-label={placeholder}>
      <label htmlFor="site-search" className="sr-only">
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
          id="site-search"
          name="search"
          type="search"
          autoComplete="off"
          placeholder={placeholder}
          className="w-full border-0 border-b border-transparent bg-transparent py-2 font-light text-talora-white caret-talora-red outline-none placeholder:text-talora-white/50 transition-colors hover:border-talora-greyish-blue focus:border-talora-white"
        />
      </div>
    </form>
  );
}
