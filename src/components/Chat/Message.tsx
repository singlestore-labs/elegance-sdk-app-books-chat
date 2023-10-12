import Markdown from "react-markdown";
import { ComponentProps } from "@/types";
import { cn } from "@/utils";
import { Card, CardProps } from "../Card";

export type ChatMessageProps = ComponentProps<
  CardProps,
  { content: string; author: string; align?: "left" | "right"; withHeader?: boolean }
>;

export function ChatMessage({
  className,
  content,
  author,
  align = "left",
  withHeader = true,
  ...props
}: ChatMessageProps) {
  const alignClassName = align === "left" ? "items-start self-start" : "items-end self-end";

  return (
    <Card {...props} className={cn("flex max-w-[80%] flex-col", alignClassName, className)}>
      {withHeader && (
        <div className="text-s2-gray-600 mb-1 text-xs">
          <h6 className="first-letter:uppercase">{author}</h6>
        </div>
      )}

      <Card variant="1" size="md" className="bg-s2-gray-200 text-sm dark:bg-zinc-600">
        <Markdown>{content}</Markdown>
      </Card>
    </Card>
  );
}
