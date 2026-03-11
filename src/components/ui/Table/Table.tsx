"use client";

import * as React from "react";

import { cn } from "@/lib/utils/cn";

import type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
} from "./types";

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      children,
      className,
      wrapperClassName = "",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-rowcount": ariaRowCount,
      "aria-colcount": ariaColCount,
      tabIndex,
      ...props
    },
    ref,
  ) => (
    <div
      className={cn(
        "relative w-full overflow-auto rounded-lg border border-border bg-sidebar outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        wrapperClassName,
      )}
      tabIndex={tabIndex ?? -1}
      role="region"
      aria-label={ariaLabel ?? "Data table"}
      aria-labelledby={ariaLabelledBy}
    >
      <table
        ref={ref}
        className={cn(
          "w-full caption-bottom border-collapse text-sm outline-none focus:outline-none focus-visible:outline-none [&_tr:last-child]:border-0",
          className,
        )}
        style={{ tableLayout: "auto", minWidth: "max-content" }}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-rowcount={ariaRowCount}
        aria-colcount={ariaColCount}
        {...props}
      >
        {children}
      </table>
    </div>
  ),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  (
    {
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...props
    },
    ref,
  ) => (
    <thead
      ref={ref}
      className={cn(
        "sticky top-0 z-10 border-b border-border bg-accent outline-none focus:outline-none focus-visible:outline-none [&_tr]:border-b [&_tr]:border-border",
        className,
      )}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      {...props}
    />
  ),
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  (
    {
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...props
    },
    ref,
  ) => (
    <tbody
      ref={ref}
      className={cn(
        "bg-sidebar outline-none focus:outline-none focus-visible:outline-none [&>tr:first-child>td]:border-t-0",
        className,
      )}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      {...props}
    />
  ),
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  (
    {
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...props
    },
    ref,
  ) => (
    <tfoot
      ref={ref}
      className={cn(
        "border-t border-border font-medium outline-none focus:outline-none focus-visible:outline-none [&>tr]:last:border-b-0 bg-muted/30",
        className,
      )}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      {...props}
    />
  ),
);
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    {
      className,
      hoverable = true,
      selected = false,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-rowindex": ariaRowIndex,
      "aria-selected": ariaSelected,
      ...props
    },
    ref,
  ) => (
    <tr
      ref={ref}
      className={cn(
        "border-b border-border text-sm transition-colors outline-none focus:outline-none focus-visible:outline-none",
        selected &&
          "bg-amber-50 font-medium text-foreground [&_td]:border-border",
        !selected && hoverable && "hover:bg-muted/40",
        className,
      )}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-rowindex={ariaRowIndex}
      aria-selected={selected ? true : ariaSelected}
      data-state={selected ? "selected" : undefined}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    {
      className,
      align = "left",
      scope = "col",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-sort": ariaSort,
      "aria-colindex": ariaColIndex,
      ...props
    },
    ref,
  ) => {
    const alignmentClass =
      align === "center"
        ? "text-center"
        : align === "right"
          ? "text-right"
          : "text-left";
    return (
      <th
        ref={ref}
        scope={scope}
        className={cn(
          "h-10 border-b border-border px-4 py-2 align-middle font-medium text-subtle outline-none focus:outline-none focus-visible:outline-none [&:has([role=checkbox])]:w-12 [&:has([role=checkbox])]:min-w-max",
          alignmentClass,
          className,
        )}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-sort={ariaSort}
        aria-colindex={ariaColIndex}
        {...props}
      />
    );
  },
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      className,
      align = "left",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-colindex": ariaColIndex,
      "aria-rowindex": ariaRowIndex,
      ...props
    },
    ref,
  ) => {
    const alignmentClass =
      align === "center"
        ? "text-center"
        : align === "right"
          ? "text-right"
          : "text-left";
    return (
      <td
        ref={ref}
        className={cn(
          "whitespace-nowrap border-t border-border bg-sidebar px-4 py-3 text-sm text-foreground align-middle outline-none focus:outline-none focus-visible:outline-none [&:has([role=checkbox])]:w-auto [&:has([role=checkbox])]:min-w-max",
          alignmentClass,
          className,
        )}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-colindex={ariaColIndex}
        aria-rowindex={ariaRowIndex}
        {...props}
      />
    );
  },
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, "aria-label": ariaLabel, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      "mt-4 text-left text-sm text-muted-foreground outline-none focus:outline-none focus-visible:outline-none",
      className,
    )}
    aria-label={ariaLabel}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
