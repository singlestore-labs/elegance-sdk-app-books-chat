import { ComponentProps } from "@/types";
import { cn } from "@/utils";
import styles from "./DotFlashing.module.css";

export type DotFlashingProps = ComponentProps<"span">;

export function DotFlashing({ className, ...props }: DotFlashingProps) {
  return <span {...props} className={cn(styles.dotFlashing, className)} />;
}
