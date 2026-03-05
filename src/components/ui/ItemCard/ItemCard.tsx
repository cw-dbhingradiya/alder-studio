'use client';

import type { ItemCardProps } from './types';
import { TruncatedText } from '@/components/ui/TruncatedText';

export function ItemCard({
  title,
  subtitle,
  description,
  image,
  badge,
  actions,
  onClick,
  selected = false,
  className = '',
}: ItemCardProps) {
  const isClickable = !!onClick;

  return (
    <div
      onClick={onClick}
      className={`overflow-hidden rounded-lg border bg-card shadow-sm transition-all ${
        selected
          ? 'border-border-selected ring-2 ring-selection'
          : 'border-border'
      } ${isClickable ? 'cursor-pointer hover:shadow-lg hover:shadow-zinc-500/10' : ''} ${className}`}
    >
      {image && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <TruncatedText
              text={title}
              as="h3"
              className="font-medium text-foreground"
            />
            {subtitle && (
              <TruncatedText
                text={subtitle}
                as="p"
                className="mt-0.5 text-sm text-muted-foreground"
              />
            )}
          </div>
          {badge && <div className="shrink-0">{badge}</div>}
        </div>

        {description && (
          <p className="mt-2 line-clamp-2 text-sm text-subtle">
            {description}
          </p>
        )}

        {actions && (
          <div className="mt-4 flex items-center justify-end gap-2">{actions}</div>
        )}
      </div>
    </div>
  );
}
