import { ComponentProps, PropsByValues } from "@/types";
import { cn } from "@/utils";

export type CardProps = ComponentProps<
  "div",
  { variant?: "1" | "2"; size?: "md" | "lg" | "xl" }
>;

const propsByValues: PropsByValues<CardProps> = (props) => {
  let className = "";

  if (props?.variant === "1") {
    className += "border border-border bg-card rounded-lg";
  }

  if (props?.variant === "2") {
    className += " border-t first:border-t-0 border-border";
  }

  if (props?.size === "md") {
    className += " py-2 px-4";
  }

  if (props?.size === "lg") {
    className += " py-4 px-8";
  }

  if (props?.size === "xl") {
    className += " py-6 px-10";
  }

  return { className };
};

export function Card({ className, variant, size, ...props }: CardProps) {
  const _props = propsByValues({ variant, size });

  return (
    <div
      {..._props}
      {...props}
      className={cn(
        "flex w-fit max-w-full flex-col items-start justify-start",
        _props?.className,
        className
      )}
    ></div>
  );
}
