"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Sidebar from "@/components/ui/Sidebar";
import { useAuth } from "@/lib/utils/AuthContext";

/**
 * What: App shell component that conditionally renders sidebar based on auth and route.
 * Why: Landing page (/) must show without sidebar after login; dashboard and app routes need sidebar.
 * What for: Used in layout.tsx to wrap all page content.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isLoading } = useAuth();

  const isLandingPage = pathname === "/";

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-spinner border-t-transparent"></div>
      </div>
    );
  }

  if (!user || isLandingPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-full">
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-lg p-2 md:hidden bg-primary text-primary-foreground shadow-md"
        aria-label="Open menu"
      >
        <Menu className="size-6" />
      </button>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 overflow-auto bg-background pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
}
