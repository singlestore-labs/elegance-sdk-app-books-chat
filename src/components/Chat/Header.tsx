"use client";

import { ComponentProps } from "@/types";
import { chatState } from "@/state/chat";
import { cn } from "@/utils";
import { Card, CardProps } from "../Card";
import { BookSelect } from "../Book/Select";
import { DarkModeSwitch } from "../DarkModeSwitch";
import { ConnectionTypeSwitch } from "../ConnectionTypeSwitch";

export type ChatHeaderProps = ComponentProps<CardProps>;

export function ChatHeader({ className, ...props }: ChatHeaderProps) {
  const isAILoading = chatState.useIsAILoading();

  return (
    <Card
      {...props}
      size="lg"
      className={cn(
        "relative w-full flex-row flex-wrap items-center justify-between border-b border-border bg-card",
        className
      )}
    >
      <ConnectionTypeSwitch />
      <BookSelect
        isDisabled={isAILoading}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <DarkModeSwitch />
    </Card>
  );
}
