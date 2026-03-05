'use client';

import type { StatusBadgeProps, StatusType } from './types';

const statusStyles: Record<StatusType, string> = {
  completed: 'bg-status-completed text-status-completed-foreground',
  running: 'bg-badge-running text-badge-running-foreground',
  failed: 'bg-status-failed text-status-failed-foreground',
  pending: 'bg-status-pending text-status-pending-foreground',
};

const statusLabels: Record<StatusType, string> = {
  completed: 'Completed',
  running: 'Running',
  failed: 'Failed',
  pending: 'Pending',
};

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]} ${className}`}
    >
      {statusLabels[status]}
    </span>
  );
}
