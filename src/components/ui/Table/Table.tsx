"use client";

import type {
  TableProps,
  TableHeadProps,
  TableBodyProps,
  TableRowProps,
  TableHeaderProps,
  TableCellProps,
} from "./types";

export function Table({ children, className = "", ...props }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-divider">
      <table
        className={`min-w-full divide-y divide-divider ${className}`}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHead({
  children,
  className = "",
  ...props
}: TableHeadProps) {
  return (
    <thead className={`bg-sidebar ${className}`} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({
  children,
  className = "",
  ...props
}: TableBodyProps) {
  return (
    <tbody
      className={`divide-y divide-divider bg-sidebar ${className}`}
      {...props}
    >
      {children}
    </tbody>
  );
}

export function TableRow({
  children,
  hoverable = true,
  className = "",
  ...props
}: TableRowProps) {
  const hoverClasses = hoverable
    ? "hover:bg-table-hover"
    : "";
  return (
    <tr className={`${hoverClasses} ${className}`} {...props}>
      {children}
    </tr>
  );
}

export function TableHeader({
  children,
  className = "",
  align = "left",
  ...props
}: TableHeaderProps) {
  const alignmentClass =
    align === "center"
      ? "text-center"
      : align === "right"
        ? "text-right"
        : "text-left";

  return (
    <th
      className={`px-6 py-3 text-xs font-semibold uppercase tracking-wider text-table-header ${alignmentClass} ${className}`}
      {...props}
    >
      {children}
    </th>
  );
}

export function TableCell({
  children,
  className = "",
  align = "left",
  ...props
}: TableCellProps) {
  const alignmentClass =
    align === "center"
      ? "text-center"
      : align === "right"
        ? "text-right"
        : "text-left";

  return (
    <td
      className={`whitespace-nowrap px-6 py-4 text-sm text-table-cell ${alignmentClass} ${className}`}
      {...props}
    >
      {children}
    </td>
  );
}
