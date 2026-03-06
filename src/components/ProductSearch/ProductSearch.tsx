"use client";

import { useProductSearch } from "./useProductSearch";
import type { ProductSearchProps } from "./types";
import { Dropdown } from "@/components/ui/Dropdown";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TruncatedText } from "@/components/ui/TruncatedText";
import { Check, Image, Plus, X } from "lucide-react";

export function ProductSearch({
  selectedProducts,
  onProductsChange,
  existingProducts = [],
  onRemoveExisting,
}: ProductSearchProps) {
  const {
    showSearch,
    setShowSearch,
    products,
    loading,
    search,
    category,
    categories,
    page,
    totalPages,
    handleSearchChange,
    handleCategoryChange,
    setPage,
    addProduct,
    removeProduct,
    isProductSelected,
  } = useProductSearch(selectedProducts, onProductsChange, existingProducts);

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <div className="space-y-4">
      {/* Existing Products */}
      {existingProducts.length > 0 && (
        <div>
          <h4 className="mb-2 text-sm font-semibold text-label">
            Existing Products
          </h4>
          <div className="flex flex-wrap gap-2">
            {existingProducts.map((product) => (
              <div
                key={product.id}
                className="flex md:items-center items-start gap-2 md:rounded-full rounded-md bg-chip py-1 pl-1 pr-3"
              >
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                )}
                <span className="text-sm text-chip-foreground">
                  {product.name}
                </span>
                {onRemoveExisting && (
                  <button
                    type="button"
                    onClick={() => onRemoveExisting(product.id)}
                    className="ml-1 text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Products */}
      {selectedProducts.length > 0 && (
        <div>
          <h4 className="mb-2 text-sm font-semibold text-label">
            New Products ({selectedProducts.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedProducts.map((product) => (
              <div
                key={product.catalogId}
                className="flex items-center gap-2 rounded-full bg-success py-1 pl-1 pr-3"
              >
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                )}
                <span className="text-sm text-success-foreground">
                  {product.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeProduct(product.catalogId)}
                  className="ml-1 text-success-accent hover:text-success-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Products Button */}
      {!showSearch && (
        <button
          type="button"
          onClick={() => setShowSearch(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-dashed border-input px-4 py-2 text-sm text-subtle hover:border-focus hover:text-label"
        >
          <Plus className="size-5" />
          Search & Add Products
        </button>
      )}

      {/* Search Panel */}
      {showSearch && (
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Product Catalog</h4>
            <button
              type="button"
              onClick={() => setShowSearch(false)}
              className="text-muted-foreground hover:text-label"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Filters */}
          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <Input
                type="text"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search products..."
              />
            </div>
            <Dropdown
              options={categoryOptions}
              value={category}
              onChange={handleCategoryChange}
              ariaLabel="Filter by category"
              className="w-full sm:w-auto sm:min-w-[180px]"
              buttonClassName="rounded-md focus:border-focus focus:outline-none focus:ring-1 focus:ring-ring"
              menuClassName="rounded-md"
            />
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-spinner border-t-transparent"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="flex h-48 items-center justify-center text-muted-foreground">
              No products found
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 max-h-[50vh] overflow-y-auto">
                {products.map((product) => {
                  const isSelected = isProductSelected(product.id);
                  const isExisting = existingProducts.some(
                    (p) => p.catalogId === product.id,
                  );
                  const isNewlySelected = selectedProducts.some(
                    (p) => p.catalogId === product.id,
                  );

                  const handleClick = () => {
                    if (isNewlySelected) {
                      removeProduct(product.id);
                    } else if (isExisting && onRemoveExisting) {
                      const existingProduct = existingProducts.find(
                        (p) => p.catalogId === product.id,
                      );
                      if (existingProduct) {
                        onRemoveExisting(existingProduct.id);
                      }
                    } else {
                      addProduct(product);
                    }
                  };

                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={handleClick}
                      className={`rounded-lg border p-2 text-left transition-colors ${
                        isProductSelected(product.id)
                          ? "border-selected-border bg-selected"
                          : "border-border hover:border-input hover:bg-accent-subtle"
                      }`}
                    >
                      {product.featuredImage?.url ? (
                        <img
                          src={product.featuredImage.url}
                          alt={product.name}
                          className="mb-2 h-20 w-full rounded object-cover"
                        />
                      ) : (
                        <div className="mb-2 flex h-20 items-center justify-center rounded bg-muted">
                          <Image className="size-8 text-placeholder" />
                        </div>
                      )}
                      <TruncatedText
                        text={product.name}
                        as="p"
                        className="text-xs font-medium text-foreground"
                      />
                      <TruncatedText
                        text={product.category.name}
                        as="p"
                        className="text-xs text-muted-foreground"
                      />
                      {isSelected && (
                        <span className="mt-1 inline-flex items-center gap-1 text-xs text-success-accent">
                          <Check className="size-4" />
                          Selected
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-subtle">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductSearch;
