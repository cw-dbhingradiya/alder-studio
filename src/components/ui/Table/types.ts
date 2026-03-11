import type {
  ReactNode,
  HTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
  TableHTMLAttributes,
} from "react";

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode;
  /** ClassName for the wrapper div (e.g. background, padding). */
  wrapperClassName?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-rowcount"?: number;
  "aria-colcount"?: number;
}

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
  hoverable?: boolean;
  /** When true, row gets light yellow/gold background (selected state). */
  selected?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-rowindex"?: number;
  "aria-selected"?: boolean;
}

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
  align?: "left" | "center" | "right";
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-sort"?: "ascending" | "descending" | "none" | "other";
  "aria-colindex"?: number;
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
  align?: "left" | "center" | "right";
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-colindex"?: number;
  "aria-rowindex"?: number;
}

export interface TableCaptionProps
  extends HTMLAttributes<HTMLTableCaptionElement> {
  children?: ReactNode;
  "aria-label"?: string;
}
