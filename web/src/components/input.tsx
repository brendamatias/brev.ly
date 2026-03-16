import { useId, type ComponentProps } from "react";
import { cn } from "@/utils/tailwind";
import { WarningIcon } from "@phosphor-icons/react";

type InputProps = ComponentProps<"input"> & {
  label: string;
  error?: string;
};

export function Input({ id, label, error, className, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="group flex flex-col gap-2">
      <label
        htmlFor={inputId}
        className={cn(
          "text-xs uppercase focus-within:font-bold",
          error
            ? "text-feedback-danger font-bold"
            : "text-gray-500 group-focus-within:text-blue-base group-focus-within:font-bold"
        )}
      >
        {label}
      </label>

      <input
        id={inputId}
        {...props}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "caret-blue-base h-12 rounded-lg border px-4 py-2 text-md font-normal text-gray-600 outline-none",
          "focus:border-[1.5px]",
          error
            ? "border-[1.5px] border-feedback-danger"
            : "border-gray-300 focus:border-blue-base",
          className
        )}
      />

      {error && (
        <div id={errorId} role="alert" className="flex items-center gap-2">
          <WarningIcon className="text-feedback-danger" aria-hidden="true" />
          <span className="text-sm text-gray-500">{error}</span>
        </div>
      )}
    </div>
  );
}
