"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getStatusColor } from "@/lib/utils";
import {
  ArrowRight,
  FilePlus,
  FileText,
  FolderOpen,
  Play,
  Plus,
  Star,
} from "lucide-react";
import { PaginatedTable, TableRow, TableCell } from "@/components/ui/Table";
import { useDashboard } from "../useDashboard";
import { useAuth } from "@/lib/utils/AuthContext";

/**
 * What: Dashboard page content; requires auth, redirects to landing (/) if not logged in.
 * Why: Dashboard is a protected route; profile dropdown on landing sends users here.
 */
function DashboardContent() {
  const router = useRouter();
  const { stats, recentRuns, loading } = useDashboard();
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/");
      return;
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-spinner border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-spinner border-t-transparent"></div>
      </div>
    );
  }

  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="p-5 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            Welcome back, {firstName}
          </h1>
          <p className="mt-0.5 text-[13px] text-muted-foreground">
            Here&apos;s an overview of your AI image generation workbench.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            title="Input Sets"
            value={stats?.inputSets ?? 0}
            href="/inputs"
            icon={<FolderOpen className="h-4 w-4" />}
          />
          <StatCard
            title="Prompts"
            value={stats?.prompts ?? 0}
            href="/prompts"
            icon={<FileText className="h-4 w-4" />}
          />
          <StatCard
            title="Total Runs"
            value={stats?.runs ?? 0}
            href="/runs"
            icon={<Play className="h-4 w-4" />}
          />
          <StatCard
            title="Avg. Rating"
            value={stats?.avgRating ?? "0.0"}
            suffix="/5"
            href="/review"
            icon={<Star className="h-4 w-4" />}
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-placeholder">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <QuickActionCard
              title="Create Input Set"
              description="Upload images and select products"
              href="/inputs?new=true"
              icon={<Plus className="h-4 w-4" />}
            />
            <QuickActionCard
              title="Build Prompt"
              description="Create a new prompt template"
              href="/prompts?new=true"
              icon={<FilePlus className="h-4 w-4" />}
            />
            <QuickActionCard
              title="Start Run"
              description="Execute prompts on input sets"
              href="/runs?new=true"
              icon={<Play className="h-4 w-4" />}
            />
          </div>
        </div>

        {/* Recent Runs */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[13px] font-semibold uppercase tracking-wider text-placeholder">
              Recent Runs
            </h2>
            {recentRuns.length > 0 && (
              <Link
                href="/runs"
                className="flex items-center gap-1 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                View all
                <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </div>
          <div className="overflow-hidden">
            <PaginatedTable
              data={recentRuns}
              columns={[
                { header: "Run" },
                { header: "Input Set" },
                { header: "Template" },
                { header: "Status" },
                { header: "Results" },
              ]}
              pageSize={5}
              emptyMessage={
                <div className="px-6 py-10 text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                    <Play className="h-4 w-4 text-placeholder" />
                  </div>
                  <p className="text-sm font-medium text-label">
                    No runs yet
                  </p>
                  <p className="mt-1 text-[13px] text-placeholder">
                    Start by creating an input set and prompt template.
                  </p>
                </div>
              }
              renderRow={(run) => (
                <TableRow key={run.id}>
                  <TableCell>
                    <Link
                      href={`/runs/${run.id}`}
                      className="inline-block max-w-48 truncate text-[13px] font-medium text-label transition-colors hover:text-foreground"
                    >
                      {run.id}
                    </Link>
                  </TableCell>
                  <TableCell>{run.inputSet.name}</TableCell>
                  <TableCell>{run.template.name}</TableCell>
                  <TableCell>
                    <StatusBadge status={run.status} />
                  </TableCell>
                  <TableCell>{run.results.length}</TableCell>
                </TableRow>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-spinner border-t-transparent"></div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}

/**
 * What: Compact metric card linking to its detail page.
 * Why: Gives a quick numeric overview while remaining clickable for drill-down.
 */
function StatCard({
  title,
  value,
  suffix,
  href,
  icon,
}: {
  title: string;
  value: string | number;
  suffix?: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between rounded-lg border border-border p-4 transition-colors hover:border-border bg-sidebar"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[13px] font-medium text-muted-foreground">
          {title}
        </span>
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-icon-bg text-icon transition-colors group-hover:bg-icon-bg-accent group-hover:text-icon-hover">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-semibold tracking-tight text-foreground">
        {value}
        {suffix && (
          <span className="ml-0.5 text-sm font-normal text-placeholder">
            {suffix}
          </span>
        )}
      </p>
    </Link>
  );
}

/**
 * What: Action shortcut card for common tasks.
 * Why: Reduces navigation friction for the most frequent user flows.
 */
function QuickActionCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3.5 rounded-lg border border-border px-4 py-3.5 transition-colors hover:border-border bg-sidebar"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-action-icon text-action-icon-foreground transition-colors group-hover:bg-action-icon-active group-hover:text-action-icon-active-foreground">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-foreground">
          {title}
        </p>
        <p className="text-[12px] text-muted-foreground">
          {description}
        </p>
      </div>
      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-action-arrow transition-colors group-hover:text-action-arrow-hover" />
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(status)}`}
    >
      {status.toLowerCase()}
    </span>
  );
}
