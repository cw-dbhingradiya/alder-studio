"use client";

import { Suspense } from "react";
import ImageUploader from "@/components/ImageUploader";
import ProductSearch from "@/components/ProductSearch";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SearchInput } from "@/components/ui/SearchInput";
import { useInputSetsPage } from "./useInputSetsPage";
import { FolderClosed, Image, Pencil, Plus, Trash2 } from "lucide-react";

function InputSetsContent() {
  const {
    inputSets,
    loading,
    showModal,
    editingSet,
    name,
    saving,
    existingImages,
    existingProducts,
    selectedProducts,
    searchQuery,
    showDeleteDialog,
    deleting,
    setName,
    setNewImages,
    setSelectedProducts,
    setSearchQuery,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
    handleDelete,
    confirmDelete,
    closeDeleteDialog,
    handleRemoveExistingImage,
    handleRemoveExistingProduct,
  } = useInputSetsPage();

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-spinner border-t-transparent" />
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
              Input Sets
            </h1>
            <p className="mt-0.5 text-[13px] text-subtle">
              Manage your image and product collections for generation.
            </p>
          </div>
          <Button onClick={openCreateModal} icon={<Plus className="size-4" />}>
            New Input Set
          </Button>
        </div>

        {/* Search + count */}
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search input sets..."
            className="max-w-md"
          />
          {inputSets.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {inputSets.length}
              </span>
              {` input set${inputSets.length === 1 ? "" : "s"}`}
            </p>
          )}
        </div>

        {/* Grid / empty state */}
        {inputSets.length === 0 ? (
          <div className="flex flex-1 items-center justify-center py-16">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <FolderClosed className="h-6 w-6 text-placeholder" />
              </div>
              <h3 className="mt-3 text-base font-medium text-foreground">
                No input sets yet
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Create a collection of images and products to reuse across runs.
              </p>
              <Button
                onClick={openCreateModal}
                className="mt-4"
                icon={<Plus className="h-4 w-4" />}
              >
                Create Input Set
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {inputSets.map((inputSet) => {
              const zClasses = ["z-30", "z-20", "z-10"];
              return (
                <article
                  key={inputSet.id}
                  className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-sidebar/95 shadow-sm transition-colors hover:border-zinc-400 dark:hover:border-zinc-600"
                >
                  {/* Image preview */}
                  <div className="relative h-40 bg-muted">
                    {inputSet.images.length > 0 ? (
                      <div className="flex h-full">
                        {inputSet.images.slice(0, 3).map((img, index) => (
                          <div
                            key={img.id}
                            className={`relative flex-1 overflow-hidden ${zClasses[index] ?? "z-0"}`}
                          >
                            <img
                              src={img.path}
                              alt={img.filename}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                        {inputSet.images.length > 3 && (
                          <div className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] text-white">
                            +{inputSet.images.length - 3} more
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Image className="h-8 w-8 text-placeholder" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="truncate text-[15px] font-semibold text-foreground">
                      {inputSet.name}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span>{inputSet.images.length} images</span>
                      <span>{inputSet.products.length} products</span>
                      <span>{inputSet._count?.runs || 0} runs</span>
                    </div>
                    <p className="mt-2 text-[11px] text-placeholder">
                      Created{" "}
                      {new Date(inputSet.createdAt).toLocaleDateString()}
                    </p>

                    <div className="mt-4 flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => openEditModal(inputSet)}
                        icon={<Pencil className="h-4 w-4" />}
                        className="flex-1"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(inputSet.id)}
                        icon={<Trash2 className="h-4 w-4" />}
                        className="flex-1"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Modal */}
        <Modal
          isOpen={showModal}
          onClose={closeModal}
          title={editingSet ? "Edit Input Set" : "Create Input Set"}
          className="!max-w-3xl"
          scrollable
          footer={
            <>
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                type="submit"
                form="input-set-form"
                disabled={saving || !name}
                loading={saving}
              >
                {editingSet ? "Update" : "Create"}
              </Button>
            </>
          }
        >
          <form
            id="input-set-form"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <Input
              label="Name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              placeholder="e.g., Kitchen Remodel Project"
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-label">
                Images
              </label>
              <ImageUploader
                onImagesChange={setNewImages}
                existingImages={existingImages}
                onRemoveExisting={handleRemoveExistingImage}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-label">
                Products
              </label>
              <ProductSearch
                selectedProducts={selectedProducts}
                onProductsChange={setSelectedProducts}
                existingProducts={existingProducts}
                onRemoveExisting={handleRemoveExistingProduct}
              />
            </div>
          </form>
        </Modal>

        <ConfirmDialog
          isOpen={showDeleteDialog}
          onClose={closeDeleteDialog}
          onConfirm={confirmDelete}
          title="Delete Input Set"
          message="Are you sure you want to delete this input set? This action cannot be undone."
          confirmLabel="Delete"
          variant="danger"
          loading={deleting}
        />
      </div>
    </div>
  );
}

export default function InputSetsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-spinner border-t-transparent" />
        </div>
      }
    >
      <InputSetsContent />
    </Suspense>
  );
}
