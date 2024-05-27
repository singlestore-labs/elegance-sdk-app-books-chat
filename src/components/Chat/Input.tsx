"use client";

import { useCallback, useEffect, useRef } from "react";
import { SearchChatCompletionResult } from "@singlestore/elegance-sdk/types";
import { Defined } from "@/root/types";
import { ComponentProps } from "@/types";
import { chatMessagesState } from "@/state/chatMessages";
import { cn, createMessage } from "@/utils";
import { getEleganceClient } from "@/services/eleganceClient";
import { activeChatBookState } from "@/state/activeChatBook";
import { chatState } from "@/state/chat";
import { Card, CardProps } from "../Card";
import {
  ChatInputForm,
  ChatInputFormProps,
  ChatInputFormRef,
} from "./InputForm";
import { connectionTypeState } from "@/state/connectionType";

export type ChatInputProps = ComponentProps<CardProps>;

export function ChatInput({ className, ...props }: ChatInputProps) {
  const inputFormRef = useRef<ChatInputFormRef>(null);

  const connectionType = connectionTypeState.useValue();
  const chatCompletion =
    getEleganceClient(connectionType).hooks.useSearchChatCompletion();
  const { execute: executeChatCompletion } = chatCompletion;
  const isAILoading = chatState.useIsAILoading();
  const setIsAILoading = chatState.useSetIsAILoading();
  const setChatMessages = chatMessagesState.useSetValue();
  const embeddingCollectionName =
    activeChatBookState.useEmbeddingCollectionName();

  const handleFormSubmit = useCallback<Defined<ChatInputFormProps["onSubmit"]>>(
    async (value) => {
      try {
        value = value.trim();
        const systemRole = "You are a helpful assistant";

        if (!embeddingCollectionName || !value.length) return;

        setIsAILoading(true);

        setChatMessages((messages) => {
          const bookMessages = messages[embeddingCollectionName] ?? [];
          const id = (bookMessages[bookMessages.length - 1]?.id ?? 0) + 1;

          return {
            ...messages,
            [embeddingCollectionName]: [
              ...bookMessages,
              createMessage({ id, author: "you", content: value }),
            ],
          };
        });

        let completion: SearchChatCompletionResult | undefined = undefined;

        if (connectionType === "kai") {
          completion = await executeChatCompletion({
            collection: embeddingCollectionName,
            prompt: value,
            systemRole,
            minSimilarity: 0.6,
            maxContextLength: 5000,
          });
        } else {
          completion = await executeChatCompletion({
            collection: embeddingCollectionName,
            prompt: value,
            systemRole,
            minSimilarity: 0.6,
            maxContextLength: 5000,
          });
        }

        if (completion?.content) {
          setChatMessages((messages) => {
            const bookMessages = messages[embeddingCollectionName] ?? [];
            const id = (bookMessages[bookMessages.length - 1]?.id ?? 0) + 1;

            return {
              ...messages,
              [embeddingCollectionName]: [
                ...bookMessages,
                createMessage({
                  id,
                  author: "AI",
                  content: completion!.content!,
                }),
              ],
            };
          });
        }

        setIsAILoading(false);
        inputFormRef.current?.textarea?.focus();
      } catch (error) {
        setIsAILoading(false);
      }
    },
    [
      embeddingCollectionName,
      setIsAILoading,
      setChatMessages,
      executeChatCompletion,
      connectionType,
    ]
  );

  useEffect(() => {
    inputFormRef.current?.textarea?.focus();
  }, [embeddingCollectionName]);

  return (
    <Card
      {...props}
      variant="1"
      size="md"
      className={cn(
        "relative w-full flex-shrink-0 overflow-hidden border-none px-0 py-0",
        className
      )}
    >
      <ChatInputForm
        ref={inputFormRef}
        resetOnSubmit
        isDisabled={!embeddingCollectionName || isAILoading}
        onSubmit={handleFormSubmit}
      />
    </Card>
  );
}
