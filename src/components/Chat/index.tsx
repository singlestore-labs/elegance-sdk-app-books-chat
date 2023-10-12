import { ComponentProps } from "@/types";
import { cn } from "@/utils";
import { ChatMessages } from "./Messages";
import { Card } from "../Card";
import { ChatHeader } from "./Header";
import { ChatInput } from "./Input";
import { ChatProcess } from "./Process";

export type ChatProps = ComponentProps<"div">;

export function Chat({ className, ...props }: ChatProps) {
  return (
    <div {...props} className={cn("flex flex-col gap-4", className)}>
      <Card variant="1" className="relative w-full flex-1 overflow-hidden">
        <ChatHeader className="z-10" />
        <ChatMessages className="pt-24" />
        <ChatProcess />
      </Card>

      <ChatInput />
    </div>
  );
}
