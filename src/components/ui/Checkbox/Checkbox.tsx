"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";

import { cn } from "@/lib/utils/cn";

export interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * Checkbox for table row selection. Unchecked: thin border; checked: dark green border + checkmark.
 */
const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      className,
      checked = false,
      indeterminate = false,
      onCheckedChange,
      disabled,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...props
    },
    ref,
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onCheckedChange?.(!checked);
      props.onClick?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (!disabled) onCheckedChange?.(!checked);
      }
      props.onKeyDown?.(e);
    };

    const effectiveChecked = checked || indeterminate;

    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={indeterminate ? "mixed" : checked}
        aria-label={ariaLabel ?? "Toggle row selection"}
        aria-labelledby={ariaLabelledBy}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          effectiveChecked
            ? "border-primary bg-primary text-primary-foreground"
            : "border-gray-300 bg-white",
          className,
        )}
        {...props}
      >
        {indeterminate ? (
          <Minus className="h-3 w-3 stroke-[2.5]" aria-hidden />
        ) : checked ? (
          <Check className="h-3 w-3 stroke-[2.5]" aria-hidden />
        ) : null}
      </button>
    );
  },
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
