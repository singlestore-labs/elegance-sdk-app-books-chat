import { ReactNode } from "react";
import { ComponentProps } from "@/types";
import { cn } from "@/utils";
import { Card, CardProps } from "./Card";

export type LabelCardProps = ComponentProps<CardProps, { label?: ReactNode; labelProps?: ComponentProps<"h6"> }>;

export function LabelCard({ children, className, label, labelProps, ...props }: LabelCardProps) {
  let _label;
  if (label) {
    _label = (
      <h6 {...labelProps} className={cn("text-s2-gray-600 mb-0.5 text-xs", labelProps?.className)}>
        {label}
      </h6>
    );
  }

  return (
    <Card variant="2" size="md" {...props} className={cn("relative text-sm", className)}>
      {_label}
      {children}
    </Card>
  );
}
