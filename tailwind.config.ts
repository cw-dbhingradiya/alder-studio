import type { Config } from "tailwindcss";

/**
 * Design tokens are defined as CSS variables in globals.css (:root / .dark).
 * This config maps Tailwind color names to those variables so utilities
 * (e.g. bg-background, text-foreground) work and respect dark mode.
 */
export default {
  theme: {
    extend: {
      colors: {
        /* Base */
        background: "var(--background)",
        foreground: "var(--foreground)",

        /* Card / surface */
        card: "var(--surface)",
        muted: "var(--surface-secondary)",
        "muted-foreground": "var(--text-muted)",

        /* Text hierarchy */
        label: "var(--text-secondary)",
        subtle: "var(--text-tertiary)",
        placeholder: "var(--text-placeholder)",

        /* Borders */
        border: "var(--border)",
        input: "var(--border-strong)",
        divider: "var(--table-border)",

        /* Accent / hover */
        accent: "var(--hover)",
        "accent-foreground": "var(--text-primary)",
        "accent-subtle": "var(--hover-subtle)",
        "accent-strong": "var(--hover-strong)",
        active: "var(--active)",

        /* Form control */
        control: "var(--control-bg)",
        "input-field": "var(--input-bg)",

        /* Popover / modal */
        popover: "var(--modal-bg)",

        /* Chip / tag */
        chip: "var(--chip-bg)",
        "chip-foreground": "var(--chip-text)",

        /* Primary */
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        "primary-foreground": "var(--primary-foreground)",

        /* Secondary button */
        secondary: "var(--btn-secondary-bg)",
        "secondary-foreground": "var(--btn-secondary-text)",
        "secondary-hover": "var(--btn-secondary-hover)",

        /* Destructive */
        destructive: "var(--btn-danger-bg)",
        "destructive-foreground": "var(--btn-danger-text)",
        "destructive-hover": "var(--btn-danger-hover)",

        /* Ghost / text button */
        ghost: "var(--btn-ghost-text)",
        "btn-text": "var(--btn-text-color)",
        "btn-text-hover": "var(--btn-text-hover)",

        /* Focus / ring */
        focus: "var(--focus-border)",
        ring: "var(--focus-ring)",

        /* Table */
        "table-hover": "var(--table-hover)",
        "table-header": "var(--table-header-text)",
        "table-cell": "var(--table-cell-text)",

        /* Spinner / star */
        spinner: "var(--spinner)",
        star: "var(--star-inactive)",

        /* Icon */
        icon: "var(--icon-text)",
        "icon-bg": "var(--icon-bg)",
        "icon-hover": "var(--icon-text-hover)",
        "icon-bg-hover": "var(--icon-bg-hover)",

        /* Avatar */
        avatar: "var(--avatar-bg)",
        "avatar-foreground": "var(--avatar-text)",

        /* Close */
        close: "var(--close-bg)",
        "close-foreground": "var(--close-text)",

        /* Selection */
        selection: "var(--ring-selected)",
        "border-selected": "var(--border-selected)",

        /* Sidebar search */
        search: "var(--search-bg)",
        "search-border": "var(--search-border)",
        "search-foreground": "var(--search-text)",
        "search-hover": "var(--search-hover-border)",
        kbd: "var(--search-kbd-bg)",
        "kbd-border": "var(--search-kbd-border)",
        "kbd-foreground": "var(--search-kbd-text)",

        /* Action cards */
        "action-icon": "var(--action-icon-bg)",
        "action-icon-foreground": "var(--action-icon-text)",
        "action-icon-active": "var(--action-icon-hover-bg)",
        "action-icon-active-foreground": "var(--action-icon-hover-text)",
        "action-arrow": "var(--action-arrow)",
        "action-arrow-hover": "var(--action-arrow-hover)",

        /* Brand */
        brand: "var(--brand-bg)",
        "brand-foreground": "var(--brand-text)",

        /* Loader */
        loader: "var(--loader-bg)",
        "loader-orb-1": "var(--loader-orb-1)",
        "loader-orb-2": "var(--loader-orb-2)",
        "loader-orb-3": "var(--loader-orb-3)",
        "loader-orb-4": "var(--loader-orb-4)",
        "loader-glow-1": "var(--loader-glow-1)",
        "loader-glow-2": "var(--loader-glow-2)",

        /* Status */
        "status-completed": "var(--status-completed-bg)",
        "status-completed-foreground": "var(--status-completed-text)",
        "status-running": "var(--status-running-bg)",
        "status-running-foreground": "var(--status-running-text)",
        "badge-running": "var(--status-badge-running-bg)",
        "badge-running-foreground": "var(--status-badge-running-text)",
        "status-failed": "var(--status-failed-bg)",
        "status-failed-foreground": "var(--status-failed-text)",
        "status-pending": "var(--status-pending-bg)",
        "status-pending-foreground": "var(--status-pending-text)",

        /* Success */
        success: "var(--success-bg)",
        "success-foreground": "var(--success-text)",
        "success-accent": "var(--success-accent)",
        "success-border": "var(--success-border)",

        /* Error */
        error: "var(--error-bg)",
        "error-border": "var(--error-border)",
        "error-foreground": "var(--error-text)",

        /* Selected */
        selected: "var(--selected-bg)",
        "selected-border": "var(--selected-border)",

        /* Sidebar */
        sidebar: "var(--sidebar-bg)",
        "sidebar-border": "var(--sidebar-border)",
        "sidebar-text": "var(--sidebar-text)",
        "sidebar-text-active": "var(--sidebar-text-active)",
        "sidebar-active": "var(--sidebar-active)",
        "sidebar-hover": "var(--sidebar-hover)",
      },
      fontFamily: {
        sans: "var(--font-geist-sans)",
        mono: "var(--font-geist-mono)",
      },
    },
  },
} satisfies Config;
