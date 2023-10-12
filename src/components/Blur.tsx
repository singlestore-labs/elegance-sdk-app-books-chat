"use client";

import { ComponentProps } from "@/types";
import { cn } from "@/utils";

export type BlurProps = ComponentProps<"div"> & { isOpen?: boolean };

export function Blur({ className, isOpen = false, ...props }: BlurProps) {
  return (
    <div
      {...props}
      className={cn(
        "absolute left-0 top-0 h-full w-full rounded-lg transition-all",
        isOpen ? "z-10 backdrop-blur-sm " : "pointer-events-none backdrop-blur-0",
        className
      )}
    />
  );
}
