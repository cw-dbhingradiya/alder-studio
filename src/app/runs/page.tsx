"use client";

import { Suspense } from "react";
import Link from "next/link";
import { getStatusColor } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Dropdown } from "@/components/ui/Dropdown";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { AIGenerationLoader } from "@/components/ui/AIGenerationLoader";
import { DataGrid, TableRow, TableCell } from "@/components/ui/Table";
import { useRunsPage } from "./useRunsPage";
import { Clock3, Play, Trash2 } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "running", label: "Running" },
  { value: "completed", label: "Completed" },
  { value: "failed", label: "Failed" },
];

function RunsContent() {
  const {
    runs,
    inputSets,
    templates,
    loading,
    showModal,
    selectedInputSet,
    selectedTemplate,
    executing,
    showAILoader,
    statusFilter,
    searchQuery,
    showDeleteDialog,
    deleting,
    openModal,
    closeModal,
    setSelectedInputSet,
    setSelectedTemplate,
    setStatusFilter,
    setSearchQuery,
    handleSubmit,
    handleDelete,
    confirmDelete,
    closeDeleteDialog,
  } = useRunsPage();

  const inputSetOptions = [
    { value: "", label: "Select an input set..." },
    ...inputSets.map((s) => ({ value: s.id, label: s.name })),
  ];

  const templateOptions = [
    { value: "", label: "Select a template..." },
    ...templates.map((t) => ({ value: t.id, label: t.name })),
  ];

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-spinner border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-4 md:p-5">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Run History
            </h1>
            <p className="mt-0.5 text-sm text-subtle">
              View and manage your image generation runs
            </p>
          </div>
          <Button
            onClick={openModal}
            disabled={inputSets.length === 0 || templates.length === 0}
            icon={<Play className="size-4" />}
          >
            New Run
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search runs..."
            className="w-full sm:w-auto sm:min-w-[280px]"
          />
          <Dropdown
            options={STATUS_OPTIONS}
            value={statusFilter}
            onChange={setStatusFilter}
            ariaLabel="Filter by status"
            className="w-full sm:w-auto sm:min-w-[180px]"
          />
        </div>

        <DataGrid
          wrapperClassName="overflow-auto"
          data={runs}
          columns={[
            { header: "Run" },
            { header: "Input Set" },
            { header: "Template" },
            { header: "Status" },
            { header: "Results" },
            { header: "Created" },
            { header: "Actions", align: "center" },
          ]}
          pageSize={10}
          emptyMessage={
            <div className="rounded-lg border-2 border-dashed border-border p-12 text-center">
              <Clock3 className="size-12 text-placeholder mx-auto" />
              <h3 className="mt-2 text-lg font-medium text-foreground">
                No runs yet
              </h3>
              <p className="mt-1 text-muted-foreground">
                {inputSets.length === 0 || templates.length === 0
                  ? "Create an input set and template first."
                  : "Start a new run to generate images."}
              </p>
              {inputSets.length > 0 && templates.length > 0 && (
                <Button onClick={openModal} className="mt-4">
                  Start New Run
                </Button>
              )}
            </div>
          }
          renderRow={(run) => (
            <TableRow key={run.id}>
              <TableCell>
                <Link
                  href={`/runs/${run.id}`}
                  className="font-medium text-label hover:text-foreground"
                >
                  {run.id}
                </Link>
              </TableCell>
              <TableCell>{run.inputSet.name}</TableCell>
              <TableCell>{run.template.name}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-150 hover:scale-105 hover:shadow-sm ${getStatusColor(run.status)}`}
                >
                  {run.status}
                </span>
              </TableCell>
              <TableCell>
                {run.results.length} image
                {run.results.length !== 1 ? "s" : ""}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(run.createdAt).toLocaleString()}
              </TableCell>
              <TableCell align="center">
                <button
                  onClick={() => handleDelete(run.id)}
                  className="text-placeholder hover:text-status-failed-foreground"
                >
                  <Trash2 className="size-5" />
                </button>
              </TableCell>
            </TableRow>
          )}
        />

        {/* New Run Modal */}
        <Modal
          isOpen={showModal}
          onClose={closeModal}
          title="Start New Run"
          size="md"
          footer={
            <>
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                type="submit"
                form="new-run-form"
                disabled={executing || !selectedInputSet || !selectedTemplate}
                loading={executing}
                icon={!executing ? <Play className="size-4" /> : undefined}
              >
                {executing ? "Running..." : "Start Run"}
              </Button>
            </>
          }
        >
          <form
            id="new-run-form"
            onSubmit={handleSubmit}
            className="space-y-4"
            autoComplete="off"
          >
            <div>
              <label className="block text-sm font-medium text-label">
                Input Set
              </label>
              <div className="mt-1">
                <Dropdown
                  options={inputSetOptions}
                  value={selectedInputSet}
                  onChange={setSelectedInputSet}
                  ariaLabel="Select input set"
                  menuClassName="rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-label">
                Prompt Template
              </label>
              <div className="mt-1">
                <Dropdown
                  options={templateOptions}
                  value={selectedTemplate}
                  onChange={setSelectedTemplate}
                  ariaLabel="Select prompt template"
                  menuClassName="rounded-md"
                />
              </div>
            </div>
          </form>
        </Modal>

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

        <AIGenerationLoader isVisible={showAILoader} />
      </div>
    </div>
  );
}

export default function RunsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-spinner border-t-transparent"></div>
        </div>
      }
    >
      <RunsContent />
    </Suspense>
  );
}
