import { ComponentProps } from "@/types";
import { cn } from "@/utils";

export type ContainerProps = ComponentProps<"div">;

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div {...props} className={cn("mx-auto flex w-full max-w-[90rem] flex-col p-4", className)}>
      {children}
    </div>
  );
}
