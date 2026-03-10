"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { SidebarProps, NavItem } from "./types";
import {
  Clock3,
  FileText,
  FolderClosed,
  House,
  LogOut,
  Star,
  X,
} from "lucide-react";
import { SearchInput } from "@/components/ui/SearchInput";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuth } from "@/lib/utils/AuthContext";

/**
 * What: Navigation items grouped by purpose.
 * Why: BuildBetter-style grouped sidebar needs distinct sections for clarity.
 */
const mainNav: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: House },
  { name: "Input Sets", href: "/inputs", icon: FolderClosed },
  { name: "Prompts", href: "/prompts", icon: FileText },
];

const activityNav: NavItem[] = [
  { name: "Run History", href: "/runs", icon: Clock3 },
  { name: "Review", href: "/review", icon: Star },
];

/**
 * What: All searchable navigation items flattened for the sidebar search.
 * Why: Keeps search logic simple by iterating a single array instead of multiple nav groups.
 */
const allNavItems: NavItem[] = [...mainNav, ...activityNav];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
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

  /**
   * What: Resets the search state back to its initial closed/empty state.
   * Why: Used when navigating to a result or clicking outside the search dropdown.
   */
  const closeSearch = useCallback(() => {
    setSearchQuery("");
    setIsSearchOpen(false);
    setSelectedIndex(0);
    searchInputRef.current?.blur();
  }, []);

  /**
   * What: Global ⌘K / Ctrl+K shortcut to focus the search input.
   * Why: Matches the keyboard hint shown in the input for quick access.
   */
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
      onClose();
      closeSearch();
    }
  };

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const renderNavItem = (item: NavItem) => {
    const active = isActive(item.href);
    return (
      <li key={item.name}>
        <Link
          href={item.href}
          onClick={onClose}
          className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
            active
              ? "bg-sidebar-active text-sidebar-text-active shadow-sm"
              : "text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-text-active"
          }`}
        >
          <item.icon
            className={`h-[18px] w-[18px] shrink-0 transition-colors ${
              active
                ? "text-sidebar-text-active"
                : "text-sidebar-text group-hover:text-sidebar-text-active"
            }`}
          />
          {item.name}
        </Link>
      </li>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-[260px] flex-col border-r border-border bg-sidebar transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand header */}
        <div className="flex h-14 shrink-0 items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand">
              <span className="text-xs font-bold leading-none text-brand-foreground">
                A
              </span>
            </div>
            <span className="text-sm font-semibold text-foreground">
              Alder Studio
            </span>
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-sidebar-text transition-colors hover:text-sidebar-text-active md:hidden"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Search input with live filtering */}
        <div className="relative px-3 pb-1" ref={searchContainerRef}>
          <SearchInput
            ref={searchInputRef}
            size="compact"
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setSelectedIndex(0);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            onKeyDown={handleSearchKeyDown}
            shortcutHint="⌘K"
            placeholder="Search..."
            ariaLabel="Search navigation"
          />

          {/* Search results dropdown */}
          {isSearchOpen && searchQuery.trim() && (
            <div className="absolute left-3 right-3 top-full z-50 mt-1 overflow-hidden rounded-lg border border-border bg-sidebar shadow-lg">
              {filteredItems.length > 0 ? (
                <ul className="py-1">
                  {filteredItems.map((item, index) => (
                    <li key={item.href}>
                      <button
                        onClick={() => {
                          router.push(item.href);
                          onClose();
                          closeSearch();
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex w-full items-center gap-3 px-3 py-2 text-sm font-medium transition-colors ${
                          index === selectedIndex
                            ? "bg-sidebar-active text-sidebar-text-active"
                            : "text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-text-active"
                        }`}
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-3 py-3 text-center text-[12px] text-placeholder">
                  No results found
                </p>
              )}
            </div>
          )}
        </div>

        {/* Navigation groups */}
        <nav className="flex flex-1 flex-col overflow-y-auto px-3 pt-4">
          <div className="mb-5">
            <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-placeholder">
              Main
            </p>
            <ul className="flex flex-col gap-0.5">
              {mainNav.map(renderNavItem)}
            </ul>
          </div>

          <div className="mb-5">
            <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-placeholder">
              Activity
            </p>
            <ul className="flex flex-col gap-0.5">
              {activityNav.map(renderNavItem)}
            </ul>
          </div>
        </nav>

        {/* User profile footer */}
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-avatar text-xs font-semibold text-avatar-foreground">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {user?.name ?? "User"}
              </p>
              <p className="truncate text-[11px] text-placeholder">
                {user?.email ?? ""}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-0.5">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => {
                  logout();
                  onClose();
                  router.push("/");
                }}
                className="rounded-md p-1.5 text-sidebar-text transition-colors hover:bg-sidebar-hover hover:text-sidebar-text-active"
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
