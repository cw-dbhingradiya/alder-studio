"use client";

import { Modal } from "../Modal";
import { Button } from "../Button";
import type { ConfirmDialogProps } from "./types";

const confirmVariantMap: Record<string, "primary" | "danger"> = {
  danger: "danger",
  warning: "primary",
  info: "primary",
};

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  loading = false,
}: ConfirmDialogProps) {
  const confirmVariant = confirmVariantMap[variant] ?? "pr imary";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button
            variant="secondary"
            size="md"
            onClick={onClose}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={confirmVariant}
            size="md"
            onClick={onConfirm}
            loading={loading}
            showTextWhileLoading
          >
            {loading ? "Loading..." : confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-sm text-subtle">{message}</p>
    </Modal>
  );
}
