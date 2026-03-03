"use client";

import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon } from "lucide-react";

/**
 * What: Compact icon-only theme toggle button.
 * Why: Fits cleanly in the sidebar footer alongside other action buttons.
 * What for: Allows users to switch between light and dark mode.
 */
export function ThemeToggle() {
  const { theme, cycleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <button
        className="rounded-md p-1.5 text-(--sidebar-text)"
        disabled
        aria-label="Toggle theme"
      >
        <Sun className="h-4 w-4" />
      </button>
    );
  }

  const Icon = theme === "light" ? Sun : Moon;
  const label = theme === "light" ? "Light" : "Dark";

  return (
    <button
      onClick={cycleTheme}
      className="rounded-md p-1.5 text-(--sidebar-text) transition-colors hover:bg-(--sidebar-hover) hover:text-(--sidebar-text-active)"
      aria-label={`Current theme: ${label}. Click to toggle theme.`}
    >
      <Icon className="h-4 w-4 shrink-0" />
    </button>
  );
}

export default ThemeToggle;
