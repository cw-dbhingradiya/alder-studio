"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { SidebarProps, NavItem } from "./types";
import {
  Clock3,
  FileText,
  FolderClosed,
  House,
  LogOut,
  Search,
  Star,
  X,
} from "lucide-react";
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

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

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
          className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-all ${
            active
              ? "bg-(--sidebar-active) text-(--sidebar-text-active) shadow-sm"
              : "text-(--sidebar-text) hover:bg-(--sidebar-hover) hover:text-(--sidebar-text-active)"
          }`}
        >
          <item.icon
            className={`h-[18px] w-[18px] shrink-0 transition-colors ${
              active
                ? "text-(--sidebar-text-active)"
                : "text-(--sidebar-text) group-hover:text-(--sidebar-text-active)"
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
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-[260px] flex-col border-r border-sidebar bg-sidebar transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand header */}
        <div className="flex h-14 shrink-0 items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 dark:bg-white">
              <span className="text-xs font-bold leading-none text-white dark:text-zinc-900">
                A
              </span>
            </div>
            <span className="text-sm font-semibold text-zinc-900 dark:text-white">
              Alder Studio
            </span>
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-(--sidebar-text) transition-colors hover:text-(--sidebar-text-active) md:hidden"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Search shortcut */}
        <div className="px-3 pb-1">
          <button
            className="flex w-full items-center gap-2.5 rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-[7px] text-[13px] text-zinc-400 transition-colors hover:border-zinc-300 hover:bg-zinc-100 dark:border-(--sidebar-border) dark:bg-[#0f0f0f] dark:text-zinc-500 dark:hover:border-zinc-600 dark:hover:bg-[#0f0f0f]"
            aria-label="Search"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search...</span>
            <kbd className="ml-auto rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-zinc-400 dark:border-(--sidebar-border) dark:bg-[#161B26] dark:text-zinc-500">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Navigation groups */}
        <nav className="flex flex-1 flex-col overflow-y-auto px-3 pt-4">
          <div className="mb-5">
            <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Main
            </p>
            <ul className="flex flex-col gap-0.5">
              {mainNav.map(renderNavItem)}
            </ul>
          </div>

          <div className="mb-5">
            <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Activity
            </p>
            <ul className="flex flex-col gap-0.5">
              {activityNav.map(renderNavItem)}
            </ul>
          </div>
        </nav>

        {/* User profile footer */}
        <div className="border-t border-sidebar p-3">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-semibold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-zinc-900 dark:text-white">
                {user?.name ?? "User"}
              </p>
              <p className="truncate text-[11px] text-zinc-400 dark:text-zinc-500">
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
                className="rounded-md p-1.5 text-(--sidebar-text) transition-colors hover:bg-(--sidebar-hover) hover:text-(--sidebar-text-active)"
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
