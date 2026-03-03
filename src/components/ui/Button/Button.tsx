"use client";

import type { ButtonProps } from "./types";

const variantClasses: Record<string, string> = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100",
  secondary:
    "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
  danger:
    "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600",
  ghost:
    "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800",
  text:
    "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
  "link-gray":
    "text-neutral-400 hover:text-white bg-transparent hover:bg-transparent",
  "primary-dark":
    "bg-white text-[#0A0A0A] hover:bg-neutral-200 disabled:opacity-50",
};

const sizeClasses: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
  xl: "px-6 py-3.5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  isLoading = false,
  showTextWhileLoading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none";

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const isLoadingState = loading || isLoading;
  const isDisabled = disabled || isLoadingState;

  const loadingSpinner = (
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
  );

  return (
    <button className={classes} disabled={isDisabled} {...props}>
      {isLoadingState && loadingSpinner}
      {!isLoadingState && icon && iconPosition === "left" && icon}
      {(!isLoadingState || showTextWhileLoading) && children}
      {!isLoadingState && icon && iconPosition === "right" && icon}
    </button>
  );
}
