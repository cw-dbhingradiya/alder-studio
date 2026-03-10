"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useClickOutside } from "@/hooks";
import type { DropdownProps } from "./types";
import { Check, ChevronDown } from "lucide-react";

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select...",
  ariaLabel,
  className = "",
  buttonClassName = "",
  menuClassName = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useClickOutside(dropdownRef, handleClose, isOpen);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const selectedOption = options.find((o) => o.value === value);
  const displayValue = selectedOption?.label ?? placeholder;

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        className={`flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-sidebar px-3 py-2 text-left text-sm text-foreground ${buttonClassName}`}
      >
        <span>{displayValue}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <ul
          role="listbox"
          className={`absolute left-0 top-full z-50 mt-1 max-h-60 min-w-full overflow-auto rounded-lg border border-border bg-sidebar py-1 shadow-lg ${menuClassName}`}
        >
          {options.map((option) => (
            <li
              key={option.value || "__empty__"}
              role="option"
              aria-selected={value === option.value}
            >
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-accent ${
                  value === option.value
                    ? "bg-accent font-medium text-foreground"
                    : "text-foreground"
                }`}
              >
                {value === option.value && (
                  <Check className="size-4 shrink-0" />
                )}
                <span className={value === option.value ? "" : "pl-6"}>
                  {option.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
