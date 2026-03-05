"use client";

import { forwardRef } from "react";
import type { InputProps, TextareaProps, FormGroupProps } from "./types";

const baseInputClasses =
  "block w-full rounded-md border border-input bg-input-field px-3 py-2 shadow-sm text-sm text-foreground focus:border-focus focus:outline-none focus:ring-1 focus:ring-ring";

const darkThemeInputClasses =
  "block w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-white placeholder-neutral-500 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500";

const errorInputClasses =
  "border-rose-500 focus:border-rose-500 focus:ring-rose-500";

const labelClasses =
  "block text-sm font-medium text-label";

const darkThemeLabelClasses = "block text-sm font-medium text-neutral-300 mb-2";

const errorTextClasses = "mt-1 text-sm text-error-foreground";

const helperTextClasses = "mt-1 text-sm text-muted-foreground";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      className = "",
      id,
      icon,
      trailingAction,
      isInvalid,
      hint,
      theme = "light",
      autoComplete,
      ...props
    },
    ref,
  ) => {
    /**
     * What: Derive a stable id and validation state for the input.
     * Why: Keeps aria attributes and error rendering in one place so any form
     *      can opt into validation via `error` / `isInvalid` / `hint`.
     * What for: Used by auth forms (login, signup, forgot password) to surface
     *           client-side validation errors consistently.
     */
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const hasError = error || isInvalid;
    const errorMessage = error || hint;

    const isDark = theme === "dark";
    const inputBaseClasses = isDark ? darkThemeInputClasses : baseInputClasses;
    const currentLabelClasses = isDark ? darkThemeLabelClasses : labelClasses;
    const inputClasses = `${inputBaseClasses} ${hasError ? errorInputClasses : ""} ${icon ? "pl-11" : ""} ${trailingAction ? "pr-11" : ""} ${className}`;

    return (
      <div>
        {label && (
          <label htmlFor={inputId} className={currentLabelClasses}>
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`${!isDark && label ? "mt-1" : ""} ${inputClasses}`}
            aria-invalid={hasError ? "true" : undefined}
            aria-describedby={hasError ? `${inputId}-error` : undefined}
            autoComplete={autoComplete ?? "off"}
            {...props}
          />
          {trailingAction && (
            <div className="absolute right-3.5 top-[56%] -translate-y-1/2">
              {trailingAction}
            </div>
          )}
        </div>
        {hasError && errorMessage && (
          <p id={`${inputId}-error`} className={errorTextClasses}>
            {errorMessage}
          </p>
        )}
        {helperText && !hasError && (
          <p className={helperTextClasses}>{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const inputClasses = `${baseInputClasses} ${error ? errorInputClasses : ""} ${className}`;

    return (
      <div>
        {label && (
          <label htmlFor={inputId} className={labelClasses}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={`${label ? "mt-1" : ""} ${inputClasses}`}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className={errorTextClasses}>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className={helperTextClasses}>{helperText}</p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export function FormGroup({
  label,
  htmlFor,
  error,
  helperText,
  children,
  required,
}: FormGroupProps) {
  return (
    <div>
      {label && (
        <label htmlFor={htmlFor} className={labelClasses}>
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}
      <div className={label ? "mt-1" : ""}>{children}</div>
      {error && <p className={errorTextClasses}>{error}</p>}
      {helperText && !error && (
        <p className={helperTextClasses}>{helperText}</p>
      )}
    </div>
  );
}
