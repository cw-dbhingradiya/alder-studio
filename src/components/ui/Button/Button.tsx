"use client";

import type { ButtonProps } from "./types";

const variantClasses: Record<string, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover disabled:opacity-50",
  secondary:
    "border border-input bg-secondary text-secondary-foreground hover:bg-secondary-hover",
  danger:
    "bg-destructive text-destructive-foreground hover:bg-destructive-hover disabled:opacity-50",
  ghost: "text-ghost hover:bg-accent",
  text: "text-btn-text hover:text-btn-text-hover",
  "link-gray":
    "text-subtle hover:text-primary-foreground bg-transparent hover:bg-transparent",
  "primary-dark":
    "bg-primary-foreground text-primary hover:bg-accent disabled:opacity-50",
};

const sizeClasses: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
  xl: "px-6 py-2 text-base",
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
