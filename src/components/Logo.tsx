import { ComponentProps } from "@/types";
import { cn } from "@/utils";

import SingleStoreLogo from "@/assets/SingleStoreLogo.svg";

export type LogoProps = ComponentProps<"span">;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <span {...props} className={cn("", className)}>
      <SingleStoreLogo
        className={cn(
          "h-full w-full [&_[fill]]:fill-current [&_[stroke]]:stroke-current"
        )}
      />
    </span>
  );
}
