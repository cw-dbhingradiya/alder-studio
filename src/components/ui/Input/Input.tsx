import * as React from "react";

import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils/cn";

import { Button } from "../Button";

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "prefix"
> {
  label?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  endAdornmentClassName?: string;
  helperText?: string;
  helperIcon?: React.ReactNode;
  variant?: "default" | "outline" | "danger";
  isPhoneNumber?: boolean;
  // 508 compliance additions
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  "aria-required"?: boolean;
  error?: boolean;
  helperTextId?: string;
  allowIncrementDecrement?: boolean;
}

const baseInputClasses =
  "flex h-8 w-full box-border rounded-[6px] bg-white px-3 py-1.5 text-xs font-normal text-[#1d1f25] outline-none border border-transparent placeholder:font-normal placeholder:text-[#a1a7b3] focus:outline-none focus:ring-1 focus:ring-[#515d70] disabled:cursor-not-allowed";

const inputVariantClasses: Record<NonNullable<InputProps["variant"]>, string> = {
  default:
    "border border-[#dcdcdc] bg-white text-[#1d1f25] focus:ring-1 focus:ring-[#515d70] disabled:border-0 disabled:text-[#a0a0a0] disabled:bg-[#ededed]",
  outline:
    "border-0 border-b border-b-[#dcdcdc] rounded-none bg-transparent text-[#1d1f25] focus:ring-0 focus:border-b-[#515d70]",
  danger:
    "border border-[#f04438] text-[#475467] focus:ring-1 focus:ring-[#f04438] focus-visible:border-[#f04438] focus-visible:ring-4 focus-visible:ring-[#fee4e2] disabled:bg-[#fef6f5]",
};

const helperBaseClasses = "mt-1.5 flex items-center text-xs";

const helperVariantClasses: Record<NonNullable<InputProps["variant"]>, string> = {
  default: "text-[#4a4d52]",
  outline: "text-[#4a4d52]",
  danger: "text-[#f04438]",
};

interface UseInputOptions {
  error?: boolean;
  variant?: InputProps["variant"];
  ariaDescribedBy?: string;
  helperText?: string;
  helperTextId?: string;
  type?: string;
  min?: number | string;
  max?: number | string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  forwardedRef?: React.Ref<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const useInput = ({
  error,
  ariaDescribedBy,
  helperText,
  helperTextId,
  type,
  min,
  max,
  startAdornment,
  endAdornment,
  onChange,
}: UseInputOptions) => {
  const isError = Boolean(error);

  const startRef = React.useRef<HTMLDivElement | null>(null);
  const endRef = React.useRef<HTMLDivElement | null>(null);
  const [startWidth, setStartWidth] = React.useState<number>(0);
  const [endWidth, setEndWidth] = React.useState<number>(0);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useLayoutEffect(() => {
    if (!startAdornment && !endAdornment) return;

    const updateWidths = () => {
      if (startRef.current) {
        setStartWidth(startRef.current.offsetWidth + 12);
      }
      if (endRef.current) {
        setEndWidth(endRef.current.offsetWidth + 12);
      }
    };

    updateWidths();

    window.addEventListener("resize", updateWidths);
    return () => window.removeEventListener("resize", updateWidths);
  }, [startAdornment, endAdornment]);

  const describedBy = React.useMemo(() => {
    const ids: string[] = [];
    if (ariaDescribedBy) ids.push(ariaDescribedBy);
    if (helperText && helperTextId) ids.push(helperTextId);
    return ids.join(" ") || undefined;
  }, [ariaDescribedBy, helperText, helperTextId]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = () => {
    // Placeholder for future keyboard handling (e.g., increment/decrement with arrows).
  };

  const parseNumber = (value: string): number | null => {
    if (value === "") return null;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  };

  const clampNumber = (value: number): number => {
    let result = value;
    if (min !== undefined) {
      const minNumber = Number(min);
      if (!Number.isNaN(minNumber)) {
        result = Math.max(result, minNumber);
      }
    }
    if (max !== undefined) {
      const maxNumber = Number(max);
      if (!Number.isNaN(maxNumber)) {
        result = Math.min(result, maxNumber);
      }
    }
    return result;
  };

  const updateNumberValue = (delta: number) => {
    const node = inputRef.current;
    if (!node || type !== "number") return;

    const current = parseNumber(node.value) ?? 0;
    const step = node.step ? Number(node.step) || 1 : 1;
    const next = clampNumber(current + delta * step);

    const nextValue = String(next);

    const nativeSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    )?.set;

    nativeSetter?.call(node, nextValue);

    const event = new Event("input", { bubbles: true });
    node.dispatchEvent(event);
  };

  const handleNumberIncrement = () => updateNumberValue(1);
  const handleNumberDecrement = () => updateNumberValue(-1);

  return {
    describedBy,
    handleKeyDown,
    handleChange,
    isError,
    startRef,
    endRef,
    startWidth,
    endWidth,
    handleNumberDecrement,
    handleNumberIncrement,
    inputRef,
  };
};

const TooltipProvider: React.FC<
  React.PropsWithChildren<{ delayDuration?: number }>
> = ({ children }) => <>{children}</>;

const AdornmentWithTooltip: React.FC<{ adornment: React.ReactNode }> = ({
  adornment,
}) => <>{adornment}</>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      startAdornment,
      endAdornment,
      helperIcon,
      helperText,
      min,
      variant,
      max,
      error,
      helperTextId,
      allowIncrementDecrement = false,
      endAdornmentClassName,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      ...props
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ref,
  ) => {
    const {
      describedBy,
      handleKeyDown,
      handleChange,
      isError,
      startRef,
      endRef,
      startWidth,
      endWidth,
      handleNumberDecrement,
      handleNumberIncrement,
      inputRef,
    } = useInput({
      error,
      variant,
      ariaDescribedBy,
      helperText,
      helperTextId,
      type,
      min,
      max,
      startAdornment,
      endAdornment,
      onChange: props.onChange,
    });

    const inputVariant = variant ?? "default";

    return (
      <TooltipProvider delayDuration={0}>
        <div className="flex w-full flex-col">
          <div className="relative flex items-center">
            {startAdornment && (
              <div
                ref={startRef}
                className="absolute left-3 flex max-w-[100px] items-center"
              >
                <AdornmentWithTooltip adornment={startAdornment} />
              </div>
            )}

            <input
              type={type}
              className={cn(
                baseInputClasses,
                inputVariantClasses[inputVariant],
                className,
              )}
              style={{
                paddingLeft: 0 > startWidth ? 0 : startWidth || undefined,
                paddingRight: 0 > endWidth ? 0 : endWidth || undefined,
              }}
              ref={inputRef}
              min={min}
              max={max}
              onKeyDown={(event) => {
                handleKeyDown?.(event);
                props?.onKeyDown?.(event);
              }}
              onChange={handleChange}
              aria-describedby={describedBy}
              aria-invalid={ariaInvalid !== undefined ? ariaInvalid : isError}
              {...props}
            />

            {endAdornment && (
              <div
                ref={endRef}
                className={cn(
                  "absolute right-2 flex h-6 w-6 items-center justify-center",
                  endAdornmentClassName,
                )}
              >
                <AdornmentWithTooltip adornment={endAdornment} />
              </div>
            )}
            {allowIncrementDecrement && !endAdornment && type === "number" && (
              <div className="absolute right-1 block">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    onClick={handleNumberDecrement}
                    aria-label="Decrement value"
                    type="button"
                    disabled={props.disabled}
                    className="h-6 w-6 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={handleNumberIncrement}
                    aria-label="Increment value"
                    type="button"
                    disabled={props.disabled}
                    className="h-6 w-6 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {(helperText || helperIcon) && (
            <div
              className={cn(
                helperBaseClasses,
                helperVariantClasses[inputVariant],
              )}
              id={helperTextId}
              role={isError ? "alert" : "status"}
              aria-live={isError ? "assertive" : "polite"}
            >
              {helperIcon && (
                <span className="mr-1" aria-hidden="true">
                  {helperIcon}
                </span>
              )}
              {helperText && <span>{helperText}</span>}
            </div>
          )}
        </div>
      </TooltipProvider>
    );
  },
);
Input.displayName = "Input";
export { Input };
