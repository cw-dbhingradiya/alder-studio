"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import ResultViewer from "@/components/ResultViewer";
import ReviewPanel from "@/components/ReviewPanel";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { getStatusColor } from "@/lib/utils";
import { ArrowLeft, Play, RefreshCcw, Trash2 } from "lucide-react";

interface Image {
  id: string;
  filename: string;
  path: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  imageUrl: string | null;
}

interface PromptStep {
  id: string;
  order: number;
  prompt: string;
  model: string;
  aspectRatio: string;
  imageSize: string;
}

interface RunResult {
  id: string;
  stepOrder: number;
  outputImage: string;
  metadata: string;
  rating: number | null;
  notes: string | null;
  tags: string;
  createdAt: string;
}

interface Run {
  id: string;
  status: string;
  error: string | null;
  inputSet: {
    id: string;
    name: string;
    images: Image[];
    products: Product[];
  };
  template: {
    id: string;
    name: string;
    steps: PromptStep[];
  };
  results: RunResult[];
  createdAt: string;
}

export default function RunDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [run, setRun] = useState<Run | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState<RunResult | null>(null);
  const [rerunning, setRerunning] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchRun();
  }, [id]);

  const fetchRun = async () => {
    try {
      const response = await fetch(`/api/runs/${id}`);
      if (!response.ok) {
        throw new Error("Run not found");
      }
      const data = await response.json();
      setRun(data);

      if (data.results.length > 0 && !selectedResult) {
        setSelectedResult(data.results[0]);
      }
    } catch (error) {
      console.error("Failed to fetch run:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExecute = async () => {
    if (!run) return;

    setExecuting(true);

    try {
      const response = await fetch(`/api/runs/${run.id}/execute`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to execute run");
      }

      await fetchRun();
      toast.success("Run executed successfully");
    } catch {
      toast.error("Failed to execute run");
    } finally {
      setExecuting(false);
    }
  };

  const handleRerun = async () => {
    if (!run) return;

    setRerunning(true);

    try {
      // Create a new run with same settings
      const createRes = await fetch("/api/runs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputSetId: run.inputSet.id,
          templateId: run.template.id,
        }),
      });

      if (!createRes.ok) {
        throw new Error("Failed to create run");
      }

      const newRun = await createRes.json();

      // Execute the new run
      await fetch(`/api/runs/${newRun.id}/execute`, {
        method: "POST",
      });

      toast.success("Re-run started");
      router.push(`/runs/${newRun.id}`);
    } catch {
      toast.error("Failed to re-run");
    } finally {
      setRerunning(false);
    }
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!run) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/runs/${run.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete run");
      }

      toast.success("Run deleted");
      setShowDeleteDialog(false);
      router.push("/runs");
    } catch {
      toast.error("Failed to delete run");
    } finally {
      setDeleting(false);
    }
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const handleResultUpdate = async () => {
    await fetchRun();
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-spinner border-t-transparent"></div>
      </div>
    );
  }

  if (!run) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h2 className="text-xl font-semibold text-foreground">
          Run not found
        </h2>
        <Link
          href="/runs"
          className="mt-4 text-label hover:text-foreground"
        >
          Back to runs
        </Link>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-5 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/runs"
                className="text-muted-foreground hover:text-label"
              >
                <ArrowLeft />
              </Link>
              <h1 className="text-lg font-semibold text-foreground">
                Run Details
              </h1>
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(run.status)}`}
              >
                {run.status}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-subtle">
              ID: {run.id} | Created: {new Date(run.createdAt).toLocaleString()}
            </p>
          </div>

        <div className="flex flex-wrap gap-2">
          {run.status === "pending" && (
            <Button
              onClick={handleExecute}
              disabled={executing}
              loading={executing}
              icon={!executing ? <Play className="size-4" /> : undefined}
              className="bg-primary text-primary-foreground hover:bg-primary-hover"
            >
              {executing ? "Executing..." : "Execute"}
            </Button>
          )}
          <Button
            variant="secondary"
            onClick={handleRerun}
            disabled={rerunning}
            loading={rerunning}
            icon={!rerunning ? <RefreshCcw className="size-4" /> : undefined}
          >
            {rerunning ? "Re-running..." : "Re-run"}
          </Button>
          <Button
            variant="secondary"
            onClick={handleDelete}
            icon={<Trash2 className="size-4" />}
            className="border-input text-label hover:bg-accent"
          >
            Delete
          </Button>
        </div>
        </div>

        {/* Error Message */}
        {run.error && (
          <div className="rounded-lg border border-error-border bg-error p-4">
            <p className="text-sm text-error-foreground">
              {run.error}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Run Info & Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Input Set & Template Info */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="text-sm font-semibold text-muted-foreground">
                Input Set
              </h3>
              <p className="mt-1 font-semibold text-foreground">
                {run.inputSet.name}
              </p>
              <div className="mt-2 flex gap-2 text-xs text-muted-foreground">
                <span>{run.inputSet.images.length} images</span>
                <span>|</span>
                <span>{run.inputSet.products.length} products</span>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="text-sm font-semibold text-muted-foreground">
                Template
              </h3>
              <p className="mt-1 font-semibold text-foreground">
                {run.template.name}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {run.template.steps.length} steps
              </p>
            </div>
          </div>

          {/* Input Images Preview */}
          {run.inputSet.images.length > 0 && (
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-3 font-semibold text-foreground">
                Input Images
              </h3>
              <div className="flex gap-2 overflow-x-auto">
                {run.inputSet.images.map((image) => (
                  <img
                    key={image.id}
                    src={image.path}
                    alt={image.filename}
                    className="h-20 w-20 shrink-0 rounded object-cover"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-4 font-semibold text-foreground">
              Generated Results ({run.results.length})
            </h3>
            <ResultViewer
              results={run.results}
              onResultClick={setSelectedResult}
              selectedResultId={selectedResult?.id}
            />
          </div>

          {/* Prompt Steps */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-4 font-semibold text-foreground">
              Prompt Steps
            </h3>
            <div className="space-y-3">
              {run.template.steps.map((step, index) => {
                const result = run.results.find(
                  (r) => r.stepOrder === step.order,
                );
                const hasError =
                  result && JSON.parse(result.metadata || "{}").error;

                return (
                  <div
                    key={step.id}
                    className={`rounded-lg border p-3 ${hasError
                      ? "border-error-border bg-error"
                      : "border-border bg-muted"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        Step {index + 1}
                      </span>
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        <span>{step.aspectRatio}</span>
                        <span>|</span>
                        <span>{step.imageSize}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-subtle">
                      {step.prompt}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Review Panel */}
        <div className="lg:col-span-1">
          {selectedResult ? (
            <ReviewPanel
              result={selectedResult}
              onUpdate={handleResultUpdate}
            />
          ) : (
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <p className="text-muted-foreground">
                Select a result to review
              </p>
            </div>
          )}
        </div>
      </div>

        <ConfirmDialog
          isOpen={showDeleteDialog}
          onClose={closeDeleteDialog}
          onConfirm={confirmDelete}
          title="Delete Run"
          message="Are you sure you want to delete this run? This action cannot be undone."
          confirmLabel="Delete"
          variant="danger"
          loading={deleting}
        />
      </div>
    </div>
  );
}
