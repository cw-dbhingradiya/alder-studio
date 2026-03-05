"use client";

import { forwardRef } from "react";
import { Search, X } from "lucide-react";

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  /** Compact variant for sidebar / tight layouts */
  size?: "default" | "compact";
  /** Keyboard shortcut hint shown when the input is empty (e.g. "⌘K") */
  shortcutHint?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  /** Accessible label for the input element */
  ariaLabel?: string;
}

/**
 * What: Size-specific Tailwind class maps for the inner input element.
 * Why: Keeps the JSX clean and makes it easy to add more sizes later.
 */
const inputSizeClasses: Record<string, string> = {
  default:
    "block h-[38px] w-full rounded-md border border-input bg-input-field py-2 pl-10 pr-10 text-foreground placeholder:text-placeholder focus:border-focus focus:outline-none focus:ring-1 focus:ring-ring",
  compact:
    "min-w-0 flex-1 bg-transparent text-[13px] text-foreground placeholder:text-search-foreground focus:outline-none",
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onChange,
      placeholder = "Search...",
      className = "",
      size = "default",
      shortcutHint,
      onFocus,
      onKeyDown,
      ariaLabel,
    },
    ref,
  ) => {
    const isCompact = size === "compact";

    const handleClear = () => {
      onChange("");
    };

    if (isCompact) {
      return (
        <div
          className={`flex w-full items-center gap-2.5 rounded-lg border border-search-border bg-search px-3 py-[7px] text-[13px] text-search-foreground transition-colors focus-within:border-search-hover hover:border-search-hover ${className}`}
        >
          <Search className="h-3.5 w-3.5 shrink-0" />
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className={inputSizeClasses.compact}
            aria-label={ariaLabel || placeholder}
          />
          {value ? (
            <button
              type="button"
              onClick={handleClear}
              className="shrink-0 rounded p-0.5 text-search-foreground transition-colors hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-3 w-3" />
            </button>
          ) : shortcutHint ? (
            <kbd className="ml-auto shrink-0 rounded border border-kbd-border bg-kbd px-1.5 py-0.5 text-[10px] font-medium text-kbd-foreground">
              {shortcutHint}
            </kbd>
          ) : null}
        </div>
      );
    }

    return (
      <div className={`relative ${className}`}>
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className={inputSizeClasses.default}
          aria-label={ariaLabel || placeholder}
        />
        {value ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        ) : shortcutHint ? (
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-kbd-border bg-kbd px-1.5 py-0.5 text-[10px] font-medium text-kbd-foreground">
            {shortcutHint}
          </kbd>
        ) : null}
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
