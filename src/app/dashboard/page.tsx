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
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-600 border-t-transparent dark:border-zinc-300"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-600 border-t-transparent dark:border-zinc-300"></div>
      </div>
    );
  }

  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="p-5 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Welcome back, {firstName}
          </h1>
          <p className="mt-0.5 text-[13px] text-zinc-500 dark:text-zinc-400">
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
          <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
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
            <h2 className="text-[13px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Recent Runs
            </h2>
            {recentRuns.length > 0 && (
              <Link
                href="/runs"
                className="flex items-center gap-1 text-[13px] font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
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
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <Play className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                  </div>
                  <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                    No runs yet
                  </p>
                  <p className="mt-1 text-[13px] text-zinc-400 dark:text-zinc-500">
                    Start by creating an input set and prompt template.
                  </p>
                </div>
              }
              renderRow={(run) => (
                <TableRow key={run.id}>
                  <TableCell>
                    <Link
                      href={`/runs/${run.id}`}
                      className="inline-block max-w-48 truncate text-[13px] font-medium text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
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
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-600 border-t-transparent dark:border-zinc-300"></div>
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
      className="group flex flex-col justify-between rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-[#2a2627] bg-sidebar"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400">
          {title}
        </span>
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-100 text-zinc-500 transition-colors group-hover:bg-zinc-200 group-hover:text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-zinc-700 dark:group-hover:text-zinc-200">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
        {value}
        {suffix && (
          <span className="ml-0.5 text-sm font-normal text-zinc-400 dark:text-zinc-500">
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
      className="group flex items-center gap-3.5 rounded-lg border border-zinc-200 bg-white px-4 py-3.5 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-[#2a2627] bg-sidebar"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition-colors group-hover:bg-zinc-900 group-hover:text-white dark:bg-zinc-800 dark:text-zinc-300 dark:group-hover:bg-zinc-200 dark:group-hover:text-zinc-900">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-zinc-900 dark:text-white">
          {title}
        </p>
        <p className="text-[12px] text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>
      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-zinc-300 transition-colors group-hover:text-zinc-500 dark:text-zinc-600 dark:group-hover:text-zinc-300" />
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
