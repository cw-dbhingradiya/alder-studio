"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Clock3,
  ChevronDown,
  FileText,
  FolderClosed,
  House,
  LayoutDashboard,
  LogOut,
  Star,
} from "lucide-react";
import { SearchInput } from "@/components/ui/SearchInput";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuth } from "@/lib/utils/AuthContext";
import type { AuthUser } from "@/lib/utils/auth";

/**
 * Nav items for global search; must match sidebar navigation for consistency.
 */
const mainNav = [
  { name: "Dashboard", href: "/dashboard", icon: House },
  { name: "Input Sets", href: "/inputs", icon: FolderClosed },
  { name: "Prompts", href: "/prompts", icon: FileText },
];
const activityNav = [
  { name: "Run History", href: "/runs", icon: Clock3 },
  { name: "Review", href: "/review", icon: Star },
];
const allNavItems = [...mainNav, ...activityNav];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

/**
 * What: Profile dropdown in the dashboard header with user info, dashboard link, and logout.
 * Why: Gives quick access to account actions without leaving the current view.
 */
function ProfileDropdown({
  user,
  onLogout,
}: {
  user: AuthUser;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:border-border"
        aria-label="Profile menu"
        aria-expanded={open}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-avatar text-xs font-semibold text-avatar-foreground">
          {getInitials(user.name)}
        </span>
        <span className="hidden max-w-32 truncate sm:inline">{user.name}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-lg border border-border bg-sidebar shadow-lg">
          <div className="border-b border-border px-4 py-3">
            <p className="truncate text-sm font-medium text-foreground">
              {user.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2.5 px-4 py-3 text-sm text-foreground transition-colors hover:bg-accent"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="flex w-full items-center gap-2.5 border-t border-border px-4 py-3 text-sm text-foreground transition-colors hover:bg-accent"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * What: Dashboard top bar with center global search, right-side theme toggle and profile dropdown.
 * Why: Single place for navigation search and account actions across dashboard/app routes.
 */
export function DashboardHeader({
  leftSlot,
}: {
  leftSlot?: React.ReactNode;
} = {}) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const filteredItems = searchQuery.trim()
    ? allNavItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const closeSearch = useCallback(() => {
    setSearchQuery("");
    setIsSearchOpen(false);
    setSelectedIndex(0);
    searchInputRef.current?.blur();
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        closeSearch();
      }
    };
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen, closeSearch]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      closeSearch();
      return;
    }
    if (!filteredItems.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + filteredItems.length) % filteredItems.length,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      router.push(filteredItems[selectedIndex].href);
      closeSearch();
    }
  };

  if (!user) return null;

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border bg-background px-4">
      {/* Left: mobile menu button or spacer */}
      <div className="flex w-8 shrink-0 items-center md:w-0 md:overflow-hidden">
        {leftSlot}
      </div>

      {/* Center: global search */}
      <div
        ref={searchContainerRef}
        className="relative flex flex-1 items-center justify-center max-w-xl mx-auto"
      >
        <div className="w-full max-w-md">
          <SearchInput
            ref={searchInputRef}
            size="default"
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setSelectedIndex(0);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            onKeyDown={handleSearchKeyDown}
            shortcutHint="⌘K"
            placeholder="Search navigation..."
            ariaLabel="Global search"
          />
        </div>
        {isSearchOpen && searchQuery.trim() && (
          <div className="absolute left-1/2 top-full z-50 mt-1 w-full max-w-md -translate-x-1/2 overflow-hidden rounded-lg border border-border bg-sidebar py-1 shadow-lg">
            {filteredItems.length > 0 ? (
              <ul className="py-1">
                {filteredItems.map((item, index) => (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => {
                        router.push(item.href);
                        closeSearch();
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex w-full items-center gap-3 px-3 py-2 text-sm font-medium transition-colors ${
                        index === selectedIndex
                          ? "bg-accent text-foreground"
                          : "text-foreground hover:bg-accent"
                      }`}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-3 py-3 text-center text-xs text-muted-foreground">
                No results found
              </p>
            )}
          </div>
        )}
      </div>

      {/* Right: theme toggle + profile dropdown */}
      <div className="flex shrink-0 items-center gap-2">
        <ThemeToggle />
        <ProfileDropdown
          user={user}
          onLogout={() => {
            logout();
            router.push("/");
          }}
        />
      </div>
    </header>
  );
}

export default DashboardHeader;
