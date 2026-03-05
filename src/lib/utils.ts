/**
 * Returns Tailwind CSS classes for status badge styling
 */
export function getStatusColor(status: string): string {
  switch (status) {
    case 'completed':
      return 'bg-status-completed text-status-completed-foreground';
    case 'running':
      return 'bg-status-running text-status-running-foreground';
    case 'failed':
      return 'bg-status-failed text-status-failed-foreground';
    case 'pending':
    default:
      return 'bg-status-pending text-status-pending-foreground';
  }
}

/**
 * Safely parse JSON with a fallback value
 */
export function safeJsonParse<T>(json: string | null | undefined, fallback: T): T {
  if (!json) return fallback;
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

/**
 * Format a date string or Date object
 */
export function formatDate(date: string | Date, format: 'date' | 'datetime' = 'datetime'): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (format === 'date') {
    return d.toLocaleDateString();
  }

  return d.toLocaleString();
}

/**
 * Truncate an ID string for display
 */
export function truncateId(id: string, length: number = 8): string {
  if (id.length <= length) return id;
  return `${id.slice(0, length)}...`;
}
