import { ElementType } from "react";
import { Defined } from "@/root/types";
import { ComponentProps, PropsByValues } from "@/types";
import { cn } from "@/utils";

import SingleStoreLogo from "@/assets/SingleStoreLogo.svg";
import SingleStoreLogoFlat from "@/assets/SingleStoreLogoFlat.svg";

export type LogoProps = ComponentProps<"span", { variant?: "1" | "2"; sourceProps?: ComponentProps<"svg"> }>;

const logoByVariant: Record<Defined<LogoProps["variant"]>, ElementType> = {
  "1": SingleStoreLogo,
  "2": SingleStoreLogoFlat
};

const propsByValues: PropsByValues<LogoProps> = props => {
  let className = "";
  let sourceProps = { className: "" };

  if (props?.variant === "2") {
    sourceProps.className += " [&_[fill]]:fill-current [&_[stroke]]:stroke-current";
  }

  return { className, sourceProps };
};

export function Logo({ className, variant = "1", sourceProps, ...props }: LogoProps) {
  const { sourceProps: _sourceProps, ..._props } = propsByValues({ variant });
  const _Logo = logoByVariant[variant];

  return (
    <span {..._props} {...props} className={cn(_props.className, className)}>
      <_Logo className={cn("h-full w-full", _sourceProps?.className, sourceProps)} />
    </span>
  );
}
