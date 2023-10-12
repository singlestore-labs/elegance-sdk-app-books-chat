import { ComponentProps } from "@/types";
import { cn } from "@/utils";
import { Card, CardProps } from "./Card";

export type DropdownProps = ComponentProps<CardProps, { isOpen?: boolean }>;

export function Dropdown({ children, className, isOpen = false, ...props }: DropdownProps) {
  if (!isOpen) return null;

  return (
    <Card
      {...props}
      variant="1"
      className={cn(
        "absolute left-0 top-[100%] mt-2 max-h-64 min-h-[8rem] w-full overflow-y-auto overflow-x-hidden border",
        className
      )}
    >
      {children}
    </Card>
  );
}
