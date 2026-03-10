import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface TextareaClassNames {
  container?: string;
  label?: string;
  textarea?: string;
  helperText?: string;
}

interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: string;
  helperText?: string;
  error?: string;
  classNames?: TextareaClassNames;

  // 508 compliance props
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  id?: string;
  "aria-required"?: boolean;
  "aria-invalid"?: boolean;
  helperTextId?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      classNames,
      label,
      helperText,
      error,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      id,
      "aria-required": ariaRequired,
      "aria-invalid": ariaInvalid,
      helperTextId,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;

    const helperId =
      helperTextId ||
      (helperText || error ? `${textareaId}-helper` : undefined);

    const describedBy =
      [ariaDescribedBy, helperId].filter(Boolean).join(" ") || undefined;

    return (
      <div className={cn("flex flex-col", classNames?.container)}>
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "mb-1 text-sm font-medium text-label",
              classNames?.label,
            )}
          >
            {label}
          </label>
        )}

        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            "flex w-full min-h-[60px] rounded-md border border-[#dcdcdc] bg-transparent px-3.5 py-3 text-sm font-normal text-[#1d1f25] outline-none box-border",
            "placeholder:text-sm placeholder:font-normal placeholder:text-[#a1a7b3]",
            "focus-visible:ring-0 focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:border-0 disabled:bg-[#ededed] disabled:text-[#a0a0a0]",
            error &&
              "border-[#f04438] focus-visible:border-[#f04438] focus-visible:ring-4 focus-visible:ring-[#fee4e2]",
            classNames?.textarea,
            className,
          )}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={describedBy}
          aria-required={ariaRequired}
          aria-invalid={ariaInvalid ? ariaInvalid : !!error}
          {...props}
        />

        {(helperText || error) && (
          <p
            id={helperId}
            className={cn(
              "mt-1 text-xs text-[#4a4d52]",
              error && "text-[#f04438]",
              classNames?.helperText,
            )}
            role={error ? "alert" : "status"}
            aria-live={error ? "assertive" : "polite"}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
