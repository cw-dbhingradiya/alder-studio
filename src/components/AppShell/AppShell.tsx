"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Sidebar from "@/components/ui/Sidebar";
import { useAuth } from "@/lib/utils/AuthContext";
import { DashboardHeader } from "./DashboardHeader";

/**
 * What: App shell component that conditionally renders sidebar and dashboard header based on auth and route.
 * Why: Landing page (/) must show without sidebar after login; dashboard and app routes need sidebar and header.
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
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-h-0 flex-1 flex-col">
        <DashboardHeader
          leftSlot={
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 md:hidden text-foreground transition-colors hover:bg-accent"
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </button>
          }
        />
        <main className="flex-1 overflow-auto bg-background">{children}</main>
      </div>
    </div>
  );
}
