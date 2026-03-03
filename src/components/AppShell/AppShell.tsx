"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/ui/Sidebar";
import { useAuth } from "@/lib/utils/AuthContext";

/**
 * What: App shell component that conditionally renders sidebar based on auth state.
 * Why: Landing page should show without sidebar; dashboard needs sidebar.
 * What for: Used in layout.tsx to wrap all page content.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-zinc-50 dark:bg-[#0C111D]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-600 border-t-transparent dark:border-zinc-300"></div>
      </div>
    );
  }

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-full">
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-lg p-2 md:hidden bg-zinc-900 text-white shadow-md dark:bg-white dark:text-zinc-900"
        aria-label="Open menu"
      >
        <Menu className="size-6" />
      </button>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 overflow-auto bg-zinc-50 dark:bg-[#0C111D] pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
}
