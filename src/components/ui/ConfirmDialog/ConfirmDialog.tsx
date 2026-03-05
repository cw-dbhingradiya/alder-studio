'use client';

import { Modal } from '../Modal';
import type { ConfirmDialogProps } from './types';

const variantStyles = {
  danger: 'bg-primary hover:bg-primary-hover',
  warning: 'bg-primary hover:bg-primary-hover',
  info: 'bg-primary hover:bg-primary-hover',
};

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-input bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary-hover disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`rounded-lg px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50 ${variantStyles[variant]}`}
          >
            {loading ? 'Loading...' : confirmLabel}
          </button>
        </>
      }
    >
      <p className="text-sm text-subtle">{message}</p>
    </Modal>
  );
}
