"use client";

import { ComponentProps } from "@/types";
import { chatMessagesState } from "@/state/chatMessages";
import { activeChatBookState } from "@/state/activeChatBook";
import { cn } from "@/utils";
import { Card, CardProps } from "../Card";
import { ChatMessage } from "./Message";

export type ChatMessagesProps = ComponentProps<CardProps>;

export function ChatMessages({ className, ...props }: ChatMessagesProps) {
  const activeChatBookEmbeddingCollectionName = activeChatBookState.useEmbeddingCollectionName();
  const messages = chatMessagesState.useByCollectionName(activeChatBookEmbeddingCollectionName);

  let emptyState;
  if (!activeChatBookEmbeddingCollectionName || (activeChatBookEmbeddingCollectionName && !messages.length)) {
    let message = "Select a book to start chatting";

    if (activeChatBookEmbeddingCollectionName && !messages.length) {
      message = "Send a message";
    }

    emptyState = <p className="text-s2-gray-600 m-auto text-sm">{message}</p>;
  }

  return (
    <Card
      {...props}
      size="xl"
      className={cn(
        "absolute bottom-0 left-0 flex h-full w-full flex-col-reverse items-start gap-4 overflow-y-auto overflow-x-hidden",
        className
      )}
    >
      {[...messages].reverse().map((message, i, arr) => {
        const sameAuthor = message.author === arr[i + 1]?.author;

        return (
          <ChatMessage
            key={message.id}
            content={message.content}
            author={message.author}
            align={message.author === "AI" ? "left" : "right"}
            withHeader={!sameAuthor}
          />
        );
      })}

      {emptyState}
    </Card>
  );
}
