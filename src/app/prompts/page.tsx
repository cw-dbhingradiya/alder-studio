"use client";

import { Suspense } from "react";
import ChainBuilder from "@/components/ChainBuilder";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { SearchInput } from "@/components/ui/SearchInput";
import { usePromptsPage } from "./usePromptsPage";
import { Copy, FileText, Pencil, Plus, Trash2 } from "lucide-react";

function PromptsContent() {
  const {
    templates,
    loading,
    showModal,
    editingTemplate,
    name,
    description,
    steps,
    saving,
    searchQuery,
    showDeleteDialog,
    deleting,
    setName,
    setDescription,
    setSteps,
    setSearchQuery,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
    handleDelete,
    confirmDelete,
    closeDeleteDialog,
    duplicateTemplate,
  } = usePromptsPage();

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-spinner border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-5 md:p-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Prompt Templates
            </h1>
            <p className="mt-0.5 text-[13px] text-subtle">
              Build and manage your image generation prompts.
            </p>
          </div>
          <Button onClick={openCreateModal} icon={<Plus className="size-4" />}>
            New Template
          </Button>
        </div>

        {/* Search + count */}
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search templates..."
            className="max-w-md"
          />
          {templates.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {templates.length}
              </span>
              {` template${templates.length === 1 ? "" : "s"}`}
            </p>
          )}
        </div>

        {/* Grid / empty state */}
        {templates.length === 0 ? (
          <div className="flex flex-1 items-center justify-center py-16">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <FileText className="h-6 w-6 text-placeholder" />
              </div>
              <h3 className="mt-3 text-base font-medium text-foreground">
                No templates yet
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Create reusable prompt templates to speed up your workflows.
              </p>
              <Button
                onClick={openCreateModal}
                className="mt-4"
                icon={<Plus className="h-4 w-4" />}
              >
                Create Template
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <article
                key={template.id}
                className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-lg hover:shadow-zinc-500/10"
              >
                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="font-semibold text-foreground">
                      {template.name}
                    </h3>
                    <span className="rounded-full bg-chip px-2 py-0.5 text-xs text-chip-foreground">
                      {template.steps.length} step
                      {template.steps.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {template.description && (
                    <p className="mb-3 text-sm text-subtle">
                      {template.description}
                    </p>
                  )}

                  {/* Steps Preview */}
                  <div className="mb-3 space-y-2">
                    {template.steps.slice(0, 2).map((step, index) => (
                      <div
                        key={index}
                        className="rounded bg-muted p-2"
                      >
                        <p className="line-clamp-2 text-xs text-label">
                          <span className="font-medium">
                            Step {index + 1}:
                          </span>{" "}
                          {step.prompt}
                        </p>
                        <div className="mt-1 flex gap-2 text-xs text-muted-foreground">
                          <span>{step.aspectRatio}</span>
                          <span>|</span>
                          <span>{step.imageSize}</span>
                        </div>
                      </div>
                    ))}
                    {template.steps.length > 2 && (
                      <p className="text-center text-xs text-muted-foreground">
                        +{template.steps.length - 2} more step
                        {template.steps.length - 2 !== 1 ? "s" : ""}
                      </p>
                    )}
                  </div>

                  <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                    <span>{template._count?.runs || 0} runs</span>
                    <span>
                      Updated{" "}
                      {new Date(template.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 border-t border-border bg-muted/60 p-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openEditModal(template)}
                    icon={<Pencil className="size-4" />}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => duplicateTemplate(template)}
                    icon={<Copy className="size-4" />}
                    className="flex-1"
                  >
                    Duplicate
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(template.id)}
                    icon={<Trash2 className="size-4" />}
                    className="flex-1"
                  >
                    Delete
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Modal */}
        <Modal
          isOpen={showModal}
          onClose={closeModal}
          title={editingTemplate ? "Edit Template" : "Create Template"}
          className="!max-w-5xl"
          scrollable
          footer={
            <>
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                type="submit"
                form="prompt-template-form"
                disabled={saving || !name || steps.length === 0}
                loading={saving}
              >
                {editingTemplate ? "Update" : "Create"}
              </Button>
            </>
          }
        >
          <form
            id="prompt-template-form"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Name */}
            <Input
              label="Template Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g., Kitchen Renovation Visualization"
            />

            {/* Description */}
            <Textarea
              label="Description (Optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Describe what this template does..."
            />

            {/* Steps */}
            <div>
              <label className="mb-2 block text-sm font-medium text-label">
                Prompt Steps
              </label>
              <div className="pl-10">
                <ChainBuilder steps={steps} onChange={setSteps} />
              </div>
            </div>
          </form>
        </Modal>

        <ConfirmDialog
          isOpen={showDeleteDialog}
          onClose={closeDeleteDialog}
          onConfirm={confirmDelete}
          title="Delete Template"
          message="Are you sure you want to delete this template? This action cannot be undone."
          confirmLabel="Delete"
          variant="danger"
          loading={deleting}
        />
      </div>
    </div>
  );
}

export default function PromptsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-spinner border-t-transparent"></div>
        </div>
      }
    >
      <PromptsContent />
    </Suspense>
  );
}
