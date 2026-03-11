"use client";

import * as React from "react";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";

import { cn } from "@/lib/utils/cn";

/**
 * Builds an array of page numbers and "ellipsis" for the pagination bar.
 * Shows first page, last page, and a window around current (e.g. 1, 2, 3, 4, ..., 6).
 */
function getPageNumbersToShow(
  currentPage: number,
  totalPages: number,
): (number | "ellipsis")[] {
  if (totalPages <= 0) return [];
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | "ellipsis")[] = [];
  let low: number;
  let high: number;
  if (currentPage <= 3) {
    low = 2;
    high = Math.min(4, totalPages - 1);
  } else if (currentPage >= totalPages - 2) {
    low = Math.max(2, totalPages - 3);
    high = totalPages - 1;
  } else {
    low = currentPage - 1;
    high = currentPage + 1;
  }
  const showLeft = low > 2;
  const showRight = high < totalPages - 1;

  pages.push(1);
  if (showLeft) pages.push("ellipsis");
  for (let p = low; p <= high; p++) pages.push(p);
  if (showRight) pages.push("ellipsis");
  if (totalPages > 1) pages.push(totalPages);

  return pages;
}

/**
 * Table pagination: "Total Records" on the left, page numbers + Prev/Next in the center,
 * "Result per page" dropdown on the right. Matches reference UI with total count and row-per-page control.
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
  const totalPages = totalPagesProp;
  const hasMultiplePages = totalPages > 1;
  const hasTotalItems = totalItems != null;
  const hasPageSizeControl =
    pageSizeOptions != null &&
    pageSizeOptions.length > 0 &&
    pageSize != null &&
    onPageSizeChange;

  const showPagination =
    hasTotalItems ||
    hasMultiplePages ||
    (pageSizeOptions != null && pageSizeOptions.length > 0);
  if (!showPagination) {
    return null;
  }

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  const pageNumbers = getPageNumbersToShow(currentPage, totalPages);

  const handlePrev = () => onPageChange?.(currentPage - 1);
  const handleNext = () => onPageChange?.(currentPage + 1);
  const handlePage = (page: number) => onPageChange?.(page);

  return (
    <nav
      role="navigation"
      aria-label={ariaLabel}
      className={cn(
        "flex w-full flex-nowrap items-center justify-between gap-4 px-4 py-3 bg-sidebar/30",
        className,
      )}
      {...props}
    >
      {/* Left: Total Records */}
      <div className="flex shrink-0 items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Total Records: {totalItems ?? 0}
        </span>
      </div>

      {/* Center: Previous, page numbers, Next — always visible */}
      <div className="flex min-w-0 flex-1 items-center justify-center gap-1 overflow-visible">
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            aria-label="Previous page"
            disabled={!canGoPrevious}
            onClick={handlePrev}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-transparent px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden />
            <span>Previous</span>
          </button>
          {totalPages > 0 && (
            <div className="flex items-center gap-0.5">
              {pageNumbers.map((item, idx) =>
                item === "ellipsis" ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center text-muted-foreground"
                    aria-hidden
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    aria-label={`Page ${item}`}
                    aria-current={item === currentPage ? "page" : undefined}
                    onClick={() => handlePage(item)}
                    className={cn(
                      "inline-flex h-9 min-w-9 shrink-0 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      item === currentPage
                        ? "border-border bg-muted text-foreground font-semibold"
                        : "border-transparent text-foreground hover:bg-muted",
                    )}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
          )}
          <button
            type="button"
            aria-label="Next page"
            disabled={!canGoNext}
            onClick={handleNext}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-transparent px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
          </button>
        </div>
      </div>

      {/* Right: Result per page */}
      {hasPageSizeControl && (
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Result per page
          </span>
          <div className="relative">
            <select
              aria-label="Result per page"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-9 min-w-18 appearance-none rounded-lg border border-border bg-sidebar pl-3 pr-8 text-sm text-foreground outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {pageSizeOptions!.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
          </div>
        </div>
      )}
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
