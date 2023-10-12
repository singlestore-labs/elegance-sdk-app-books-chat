import { ComponentProps, PropsByValues } from "@/types";
import { cn } from "@/utils";

export type ButtonProps = ComponentProps<
  "button",
  { variant?: "1" | "2" | "3"; size?: "md" | "sm"; withDisabledStyle?: boolean }
>;

const propsByValues: PropsByValues<ButtonProps> = props => {
  let className = "";

  if (props?.variant === "1") {
    className +=
      " font-medium text-white bg-s2-indigo-600 hover:bg-s2-indigo-700 active:bg-s2-indigo-800 border-none outline-none";
  }

  if (props?.variant === "2") {
    className +=
      " font-medium hover:bg-s2-gray-100 active:bg-s2-gray-200 rounded-lg border bg-white dark:bg-zinc-700 dark:border-zinc-600 dark:hover:bg-zinc-600 dark:active:bg-zinc-500";
  }

  if (props?.variant === "3") {
    className +=
      " hover:bg-s2-gray-100 active:bg-s2-gray-200 dark:bg-zinc-700 dark:border-zinc-600 dark:hover:bg-zinc-600 dark:active:bg-zinc-500";
  }

  if (props?.size === "sm") {
    className += " text-sm py-2 px-4";
  }

  if (props?.size === "md") {
    className += " text-base py-1 px-4 rounded-md";
  }

  if (props?.disabled && props.withDisabledStyle) {
    className += " bg-s2-gray-500 hover:bg-s2-gray-500 active:bg-s2-gray-400";
  }

  return { className };
};

export function Button({ className, variant, size, disabled, withDisabledStyle = true, ...props }: ButtonProps) {
  const _props = propsByValues({ variant, size, disabled, withDisabledStyle });

  return (
    <button
      type="button"
      {..._props}
      {...props}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center overflow-hidden text-center",
        _props?.className,
        className
      )}
    />
  );
}
