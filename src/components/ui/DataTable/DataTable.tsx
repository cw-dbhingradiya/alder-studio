"use client";

import { useState, useEffect, type ReactNode } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../Table/Table";
import { Pagination } from "../Pagination";
import { Checkbox } from "../Checkbox";

export interface DataGridColumn {
  header: string;
  align?: "left" | "center" | "right";
}

/** Extra props passed to renderRow when selectable is true (checkbox column). */
export interface DataGridSelectionCell {
  selectionCell: ReactNode;
}

export interface DataGridProps<T> {
  data: T[];
  columns: DataGridColumn[];
  renderRow: (
    item: T,
    index: number,
    extra?: DataGridSelectionCell,
  ) => ReactNode;
  pageSize?: number;
  /** Options for rows-per-page dropdown (e.g. [10, 25, 50, 100]). When set, shows "Rows per page" in pagination. */
  pageSizeOptions?: number[];
  emptyMessage?: ReactNode;
  className?: string;
  wrapperClassName?: string;
  /** When true, adds a checkbox column with header "select all" and per-row checkboxes. Requires getRowId and optionally selectedRowIds/onSelectionChange. */
  selectable?: boolean;
  /** Returns unique id for each row. Required when selectable is true. */
  getRowId?: (item: T) => string;
  /** Controlled selected row ids. When selectable, use with onSelectionChange. */
  selectedRowIds?: string[];
  /** Called when selection changes. When selectable, pass to control selectedRowIds. */
  onSelectionChange?: (ids: string[]) => void;
}

const DEFAULT_PAGE_SIZE = 10;

export function DataGrid<T>({
  data,
  columns,
  renderRow,
  pageSize: pageSizeProp,
  pageSizeOptions = [10, 25, 50, 100],
  emptyMessage,
  className = "",
  wrapperClassName = "",
  selectable = false,
  getRowId,
  selectedRowIds = [],
  onSelectionChange,
}: DataGridProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeProp ?? DEFAULT_PAGE_SIZE);

  useEffect(() => {
    if (pageSizeProp != null && pageSize !== pageSizeProp) {
      setPageSize(pageSizeProp);
    }
  }, [pageSizeProp]);

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const setSelectedIds = (ids: string[]) => {
    onSelectionChange?.(ids);
  };

  const setRowSelected = (id: string, selected: boolean) => {
    if (selected) setSelectedIds([...selectedRowIds, id]);
    else setSelectedIds(selectedRowIds.filter((i) => i !== id));
  };

  const pageIds =
    selectable && getRowId ? paginatedData.map(getRowId) : [];
  const allOnPageSelected =
    pageIds.length > 0 && pageIds.every((id) => selectedRowIds.includes(id));
  const someOnPageSelected = pageIds.some((id) => selectedRowIds.includes(id));
  const indeterminateSelectAll = someOnPageSelected && !allOnPageSelected;

  const handleSelectAll = (newChecked: boolean) => {
    if (!getRowId || !onSelectionChange) return;
    if (newChecked) {
      const merged = new Set([...selectedRowIds, ...pageIds]);
      setSelectedIds(Array.from(merged));
    } else {
      setSelectedIds(selectedRowIds.filter((id) => !pageIds.includes(id)));
    }
  };

  // Reset to page 1 if current page exceeds total pages (e.g., after filtering)
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }

  if (data.length === 0 && emptyMessage) {
    return <>{emptyMessage}</>;
  }

  return (
    <div className={className}>
      <Table wrapperClassName={wrapperClassName}>
        <TableHeader>
          <TableRow hoverable={false}>
            {selectable && (
              <TableHead>
                <Checkbox
                  aria-label="Select all rows on this page"
                  checked={allOnPageSelected}
                  indeterminate={indeterminateSelectAll}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
            )}
            {columns.map((column, index) => (
              <TableHead key={index} align={column.align}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item, index) => {
            const globalIndex = startIndex + index;
            const extra: DataGridSelectionCell | undefined = selectable
              ? {
                  selectionCell: (
                    <TableCell>
                      <Checkbox
                        aria-label={`Select row ${globalIndex + 1}`}
                        checked={getRowId ? selectedRowIds.includes(getRowId(item)) : false}
                        onCheckedChange={(checked) =>
                          getRowId && setRowSelected(getRowId(item), checked)
                        }
                      />
                    </TableCell>
                  ),
                }
              : undefined;
            return renderRow(item, globalIndex, extra);
          })}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        totalItems={data.length}
        pageSizeOptions={pageSizeOptions}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
