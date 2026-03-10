"use client";

import { PromptEditor } from "../PromptEditor";
import { useChainBuilder } from "./useChainBuilder";
import { Button } from "@/components/ui/Button";
import type { ChainBuilderProps } from "./types";
import {
  ArrowDown,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Image,
  Plus,
} from "lucide-react";

export function ChainBuilder({ steps, onChange }: ChainBuilderProps) {
  const { addStep, updateStep, removeStep, moveStep } = useChainBuilder(
    steps,
    onChange,
  );

  return (
    <div className="space-y-4">
      {steps.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-border p-8 text-center">
          <Image className="size-12 text-placeholder mx-auto" />
          <h3 className="mt-2 text-lg font-medium text-foreground">No steps</h3>
          <p className="mt-1 text-muted-foreground">
            Add a step to start building your prompt chain.
          </p>
          <Button
            onClick={addStep}
            icon={<Plus className="size-5" />}
            className="mt-4"
          >
            Add First Step
          </Button>
        </div>
      ) : (
        <>
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Card */}
              <div className="relative">
                {/* Move Buttons */}
                <div className="absolute -left-10 top-4 flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => moveStep(index, "up")}
                    disabled={index === 0}
                    className="rounded p-1 text-placeholder hover:text-subtle disabled:opacity-30 bg-sidebar"
                  >
                    <ChevronUp className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveStep(index, "down")}
                    disabled={index === steps.length - 1}
                    className="rounded p-1 text-placeholder hover:text-subtle disabled:opacity-30 bg-sidebar"
                  >
                    <ChevronDown className="size-5" />
                  </button>
                </div>

                <PromptEditor
                  step={step}
                  onChange={(updatedStep) => updateStep(index, updatedStep)}
                  onRemove={() => removeStep(index)}
                  stepNumber={index + 1}
                  showRemove={steps.length > 1}
                />
              </div>

              {/* Connector Arrow */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="size-6 text-placeholder" />
                </div>
              )}
            </div>
          ))}

          {/* Add Step Button */}
          <button
            type="button"
            onClick={addStep}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-4 text-muted-foreground transition-colors hover:border-focus hover:text-label"
          >
            <Plus className="size-5" /> Add Step
          </button>
        </>
      )}

      {/* Chain Preview */}
      {steps.length > 1 && (
        <div className="rounded-lg bg-sidebar p-4 border border-border">
          <h4 className="mb-2 text-sm font-semibold text-label">Chain Flow</h4>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-chip px-2 py-1 text-xs text-chip-foreground">
              Input Images
            </span>
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <ArrowRight className="size-4 text-placeholder" />
                <span className="rounded bg-chip px-2 py-1 text-xs text-chip-foreground">
                  Step {index + 1}
                </span>
              </div>
            ))}
            <ArrowRight className="size-4 text-placeholder" />
            <span className="rounded bg-success px-2 py-1 text-xs text-success-foreground">
              Final Output
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChainBuilder;
