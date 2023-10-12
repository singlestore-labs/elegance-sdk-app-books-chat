"use client";

import { ComponentProps } from "@/types";
import { chatState } from "@/state/chat";
import { cn } from "@/utils";
import { DotFlashing } from "../DotFlashing";

export type ChatProcessProps = ComponentProps<"div">;

export function ChatProcess({ className, ...props }: ChatProcessProps) {
  const isAILoading = chatState.useIsAILoading();

  let _render;
  if (isAILoading) {
    _render = (
      <p className="flex items-baseline justify-start text-sm">
        <span className="mr-1">AI is typing</span>
        <DotFlashing className="text-[6px]" />
      </p>
    );
  }
  return (
    <div {...props} className={cn("text-s2-gray-600 absolute bottom-4 left-4", className)}>
      {_render}
    </div>
  );
}
