import { forwardRef } from "react";
import { ComponentProps, PropsByValues } from "@/types";
import { cn } from "@/utils";

export type TextareaProps = ComponentProps<
  "textarea",
  { variant?: "1"; size?: "md" }
>;

const propsByValues: PropsByValues<TextareaProps> = (props) => {
  let className = "";

  if (props?.variant === "1") {
    className +=
      " placeholder:text-s2-gray-600 focus:border-primary focus:bg-card rounded-lg border outline-none bg-card border-border";
  }

  if (props?.size === "md") {
    className += " px-4 py-2";
  }

  if (props?.disabled) {
    className += " bg-s2-gray-100 active:bg-s2-gray-50 dark:bg-zinc-600";
  }

  return { className };
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, disabled, ...props }, ref) => {
    const _props = propsByValues({ variant, size, disabled });
    return (
      <textarea
        {..._props}
        {...props}
        ref={ref}
        className={cn("w-full max-w-full", _props?.className, className)}
        disabled={disabled}
      />
    );
  }
);

Textarea.displayName = "Textarea";
