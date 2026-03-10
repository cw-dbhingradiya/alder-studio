"use client";

import Link from "next/link";
import ReviewPanel from "@/components/ReviewPanel";
import { Dropdown } from "@/components/ui/Dropdown";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { TruncatedText } from "@/components/ui/TruncatedText";
import { useReviewPage } from "./useReviewPage";
import {
  Award,
  CheckCircle,
  Download,
  Image as ImageIcon,
  Images,
  Star,
} from "lucide-react";

const RATING_OPTIONS = [
  { value: "", label: "All ratings" },
  { value: "1", label: "1+ stars" },
  { value: "2", label: "2+ stars" },
  { value: "3", label: "3+ stars" },
  { value: "4", label: "4+ stars" },
  { value: "5", label: "5 stars only" },
];

export default function ReviewPage() {
  const {
    results,
    loading,
    selectedResult,
    minRating,
    filterTag,
    searchQuery,
    allTags,
    totalResults,
    ratedResults,
    avgRating,
    topRated,
    setSelectedResult,
    setMinRating,
    setFilterTag,
    setSearchQuery,
    clearFilters,
    fetchResults,
    getTags,
  } = useReviewPage();

  const tagOptions = [
    { value: "", label: "All tags" },
    ...allTags.map((tag) => ({ value: tag, label: tag })),
  ];

  return (
    <div className="h-full overflow-auto p-5 md:p-8">
      <div className="mx-auto max-w-6xl flex flex-col gap-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Review Results
            </h1>
            <p className="mt-0.5 text-sm text-subtle">
              Browse, filter, and annotate your generated images
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              icon={<Download className="size-4" />}
              onClick={() => (window.location.href = "/api/export?format=json")}
            >
              Export JSON
            </Button>
            <Button
              variant="secondary"
              icon={<Download className="size-4" />}
              onClick={() => (window.location.href = "/api/export?format=csv")}
            >
              Export CSV
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center justify-between rounded-lg border border-border bg-sidebar p-4">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Total Results
              </p>
              <p className="text-2xl font-bold text-foreground">
                {totalResults}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chip text-chip-foreground">
              <Images className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-sidebar p-4">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Rated
              </p>
              <p className="text-2xl font-bold text-foreground">
                {ratedResults.length}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chip text-chip-foreground">
              <CheckCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-sidebar p-4">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Avg. Rating
              </p>
              <p className="text-2xl font-bold text-foreground">
                {avgRating}/5
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chip text-chip-foreground">
              <Star className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-sidebar p-4">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Top Rated (4+)
              </p>
              <p className="text-2xl font-bold text-success-accent">
                {topRated}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chip text-chip-foreground">
              <Award className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-end">
          <div className="w-full min-w-0 sm:w-auto sm:min-w-[280px]">
            <label className="mb-1 block text-sm font-medium text-label">
              Search
            </label>
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by input set name..."
            />
          </div>

          <div className="w-full min-w-0 sm:w-auto sm:min-w-[180px]">
            <label className="mb-1 block text-sm font-medium text-label">
              Min Rating
            </label>
            <Dropdown
              options={RATING_OPTIONS}
              value={minRating}
              onChange={setMinRating}
              ariaLabel="Filter by minimum rating"
            />
          </div>

          <div className="w-full min-w-0 sm:w-auto sm:min-w-[180px]">
            <label className="mb-1 block text-sm font-medium text-label">
              Filter by Tag
            </label>
            <Dropdown
              options={tagOptions}
              value={filterTag}
              onChange={setFilterTag}
              ariaLabel="Filter by tag"
            />
          </div>

          {(minRating || filterTag || searchQuery) && (
            <div className="flex items-end">
              <Button variant="secondary" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-spinner border-t-transparent"></div>
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-border p-12 text-center">
            <ImageIcon
              className="size-12 text-placeholder mx-auto"
              aria-hidden="true"
            />
            <h3 className="mt-2 text-lg font-medium text-foreground">
              No results found
            </h3>
            <p className="mt-1 text-muted-foreground">
              {minRating || filterTag
                ? "Try adjusting your filters."
                : "Run some prompts to generate images."}
            </p>
            {!minRating && !filterTag && (
              <Link href="/runs?new=true">
                <Button className="mt-4">Start a Run</Button>
              </Link>
            )}
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 gap-6 lg:grid-cols-3 ${selectedResult ? "items-start" : "items-stretch"}`}
          >
            {/* Results Grid */}
            <div className="lg:col-span-2">
              <div className="rounded-lg border border-border bg-sidebar p-4">
                <h3 className="mb-4 font-semibold text-foreground">
                  Results ({results.length})
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((result) => {
                    const tags = getTags(result);

                    return (
                      <div
                        key={result.id}
                        onClick={() => setSelectedResult(result)}
                        className={`cursor-pointer overflow-hidden rounded-lg border bg-sidebar transition-all ${
                          selectedResult?.id === result.id
                            ? "border-border-selected ring-2 ring-selection"
                            : "border-border hover:shadow-lg hover:shadow-zinc-500/10"
                        }`}
                      >
                        {/* Image */}
                        <div className="relative aspect-square">
                          {result.outputImage ? (
                            <img
                              src={result.outputImage}
                              alt="Generated result"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center bg-sidebar">
                              <span className="text-xs text-muted-foreground">
                                No image
                              </span>
                            </div>
                          )}

                          {/* Rating Badge */}
                          {result.rating && (
                            <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5">
                              <Star className="size-3 fill-amber-400 text-amber-400" />
                              <span className="text-xs text-white">
                                {result.rating}
                              </span>
                            </div>
                          )}

                          {/* Tags Badge */}
                          {tags.length > 0 && (
                            <div className="absolute right-2 top-2 rounded bg-black/60 px-1.5 py-0.5">
                              <span className="text-xs text-white">
                                {tags.length} tags
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="p-2">
                          <TruncatedText
                            text={result.run.inputSet.name}
                            as="p"
                            className="text-sm text-subtle"
                          />
                          <Link
                            href={`/runs/${result.run.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-sm text-label hover:text-foreground"
                          >
                            View Run
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Review Panel */}
            <div className="lg:col-span-1">
              {selectedResult ? (
                <ReviewPanel result={selectedResult} onUpdate={fetchResults} />
              ) : (
                <div className="h-full flex flex-col items-center justify-center sticky top-8 rounded-lg border border-border bg-sidebar p-6 text-center">
                  <ImageIcon
                    className="mx-auto size-12 text-placeholder"
                    aria-hidden="true"
                  />
                  <h3 className="mt-3 font-semibold text-foreground">
                    Choose an image from the list to preview it here
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Click on any image to rate it, add notes, and apply tags
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
