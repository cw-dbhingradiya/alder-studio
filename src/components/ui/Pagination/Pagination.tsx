"use client";

import * as React from "react";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";

import { cn } from "@/lib/utils/cn";

/**
 * Table pagination: rows-per-page dropdown, "X-Y of Z" range, and prev/next arrows.
 * Optional full nav (First, page numbers, Last) when showFullNav is true.
 */
export interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  pageSize?: number;
  totalItems?: number;
  /** Options for rows-per-page dropdown (e.g. [10, 25, 50, 100]). When set, shows "Rows per page" control. */
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
  /** When true, shows First, page numbers, Ellipsis, Last. When false, only Previous/Next (image-style). */
  showFullNav?: boolean;
  className?: string;
  "aria-label"?: string;
}

export function Pagination({
  currentPage = 1,
  totalPages: totalPagesProp = 1,
  onPageChange,
  pageSize,
  totalItems,
  pageSizeOptions,
  onPageSizeChange,
  showFullNav = false,
  className,
  "aria-label": ariaLabel = "pagination",
  ...props
}: PaginationProps & Omit<React.ComponentProps<"nav">, "children">) {
  const hasSummary = Boolean(pageSize != null && totalItems != null);
  const totalPages = totalPagesProp;
  const hasMultiplePages = totalPages > 1;

  const startItem =
    hasSummary && pageSize && totalItems
      ? (currentPage - 1) * pageSize + 1
      : null;
  const endItem =
    hasSummary && pageSize && totalItems
      ? Math.min(currentPage * pageSize, totalItems)
      : null;

  const showPagination =
    hasSummary ||
    hasMultiplePages ||
    (pageSizeOptions != null && pageSizeOptions.length > 0);
  if (!showPagination) {
    return null;
  }

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <nav
      role="navigation"
      aria-label={ariaLabel}
      className={cn(
        "flex w-full flex-wrap items-center justify-between gap-4 px-4 py-3",
        className,
      )}
      {...props}
    >
      {pageSizeOptions != null &&
        pageSizeOptions.length > 0 &&
        pageSize != null &&
        onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">
              Rows per page:
            </span>
            <select
              aria-label="Rows per page"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-9 min-w-16 rounded-lg border border-border bg-sidebar px-3 py-1.5 text-sm text-foreground outline-none focus:outline-none focus-visible:outline-none"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
      <div className="flex flex-1 items-center justify-end gap-4">
        {startItem != null && endItem != null && totalItems != null && (
          <p className="text-sm font-medium text-gray-600">
            {startItem}-{endItem} of {totalItems}
          </p>
        )}
        {hasMultiplePages && onPageChange && (
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              aria-label="Previous page"
              disabled={!canGoPrevious}
              onClick={() => onPageChange(currentPage - 1)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-gray-600 transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next page"
              disabled={!canGoNext}
              onClick={() => onPageChange(currentPage + 1)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-gray-600 transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn(className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  pageNumber?: number;
  totalPages?: number;
  size?: "sm" | "default" | "lg";
} & React.ComponentProps<"button">;

const PaginationLink = ({
  className,
  isActive,
  size = "default",
  pageNumber,
  totalPages,
  "aria-label": ariaLabel,
  ...props
}: PaginationLinkProps) => {
  const defaultAriaLabel = pageNumber
    ? `Go to page ${pageNumber}${totalPages ? ` of ${totalPages}` : ""}`
    : ariaLabel;
  const activeLabel = pageNumber
    ? `Current page, page ${pageNumber}`
    : "Current page";

  const sizeClasses =
    size === "sm"
      ? "h-8 min-w-8 px-2 text-xs"
      : size === "lg"
        ? "h-10 min-w-10 px-4 text-sm"
        : "h-9 min-w-9 px-3 text-sm";

  return (
    <button
      type="button"
      aria-current={isActive ? "page" : undefined}
      aria-label={isActive ? activeLabel : defaultAriaLabel}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "border border-transparent bg-primary text-primary-foreground hover:bg-primary/90"
          : "border border-transparent bg-transparent text-foreground hover:bg-muted hover:text-foreground",
        sizeClasses,
        className,
      )}
      {...props}
    />
  );
};
PaginationLink.displayName = "PaginationLink";

const PaginationFirst = ({
  className,
  "aria-label": ariaLabel = "Go to first page",
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label={ariaLabel}
    className={cn(
      "gap-1.5 px-1.5 text-muted-foreground hover:bg-muted",
      className,
    )}
    {...props}
  >
    <ChevronsLeft className="h-4 w-4" aria-hidden="true" />
    <span className="text-sm font-semibold">First</span>
  </PaginationLink>
);
PaginationFirst.displayName = "PaginationFirst";

const PaginationPrevious = ({
  className,
  "aria-label": ariaLabel = "Go to previous page",
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label={ariaLabel}
    className={cn(
      "gap-1.5 px-1.5 text-sm font-semibold text-muted-foreground hover:bg-muted",
      className,
    )}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
    {props.size !== "sm" && (
      <span className="hidden text-sm sm:inline">Previous</span>
    )}
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  "aria-label": ariaLabel = "Go to next page",
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label={ariaLabel}
    className={cn(
      "gap-1.5 px-1.5 text-muted-foreground hover:bg-muted",
      className,
    )}
    {...props}
  >
    {props.size !== "sm" && (
      <span className="hidden text-sm sm:inline">Next</span>
    )}
    <ChevronRight className="h-4 w-4" aria-hidden="true" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationLast = ({
  className,
  "aria-label": ariaLabel = "Go to last page",
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label={ariaLabel}
    className={cn(
      "gap-1.5 px-1.5 text-muted-foreground hover:bg-muted",
      className,
    )}
    {...props}
  >
    <ChevronsRight className="h-4 w-4" aria-hidden="true" />
    <span className="text-sm font-semibold">Last</span>
  </PaginationLink>
);
PaginationLast.displayName = "PaginationLast";

const PaginationEllipsis = ({
  className,
  "aria-label": ariaLabel = "More pages",
  ...props
}: React.ComponentProps<"span"> & { "aria-label"?: string }) => (
  <span
    aria-hidden="true"
    aria-label={ariaLabel}
    className={cn(
      "flex h-8 w-8 items-center justify-center text-muted-foreground",
      className,
    )}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
    <span className="sr-only">{ariaLabel}</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
