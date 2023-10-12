import { ReactNode } from "react";
import { ComponentProps } from "@/types";
import { Container, ContainerProps } from "./Container";
import { cn } from "@/utils";

export type Page = ComponentProps<
  "div",
  {
    heading?: ReactNode;
    containerProps?: ContainerProps;
  }
>;

export function Page({ children, className, heading, containerProps, ...props }: Page) {
  let _header;
  if (heading) {
    let _heading;

    if (heading) {
      _heading = <h1 className="text-2xl font-semibold">{heading}</h1>;
    }

    _header = <div>{_heading}</div>;
  }

  return (
    <div {...props} className={cn("flex w-full max-w-full flex-col", className)}>
      <Container {...containerProps} className={cn("flex-1", containerProps?.className)}>
        {_header}
        {children}
      </Container>
    </div>
  );
}
