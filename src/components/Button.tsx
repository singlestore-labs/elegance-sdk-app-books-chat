import { ComponentProps, PropsByValues } from "@/types";
import { cn } from "@/utils";

export type ButtonProps = ComponentProps<
  "button",
  { variant?: "1" | "2" | "3"; size?: "md" | "sm"; withDisabledStyle?: boolean }
>;

const propsByValues: PropsByValues<ButtonProps> = (props) => {
  let className = "";

  if (props?.variant === "1") {
    className +=
      " font-medium text-white bg-primary hover:bg-primary/95 active:bg-primary/90 border-none outline-none";
  }

  if (props?.variant === "2") {
    className +=
      " font-medium bg-card rounded-lg border border-border hover:bg-accent";
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

export function Button({
  className,
  variant,
  size,
  disabled,
  withDisabledStyle = true,
  ...props
}: ButtonProps) {
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
