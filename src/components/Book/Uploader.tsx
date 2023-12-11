"use client";

import { useCallback, useRef } from "react";
import { Defined, Book } from "@/root/types";
import { ComponentProps } from "@/types";
import { slugify } from "@/root/utils/helpers";
import { createBook, normalizeMySQLBook } from "@/root/utils/db";
import { cn } from "@/utils";
import { getEleganceClient } from "@/services/eleganceClient";
import { chatBooksState } from "@/state/chatBooks";
import { activeChatBookState } from "@/state/activeChatBook";
import { booksNumberState } from "@/state/booksNumber";
import { Card, CardProps } from "../Card";
import { Button, ButtonProps } from "../Button";
import { connectionTypeState } from "@/state/connectionType";

export type BookUploaderProps = ComponentProps<CardProps>;

export function BookUploader({ className, ...props }: BookUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const connectionType = connectionTypeState.useValue();
  const createAndInsertBookEmbeddings = getEleganceClient(connectionType).hooks.useCreateAndInsertFileEmbeddings();
  const { execute: executeCreateAndInsertBookEmbeddings } = createAndInsertBookEmbeddings;

  const insertBook = getEleganceClient(connectionType).hooks.useInsertOne<Book>();
  const { execute: executeInsertBook } = insertBook;

  const setChatBooks = chatBooksState.useSetValue();
  const setActiveChatBook = activeChatBookState.useSetValueById();

  const setBooksNumber = booksNumberState.useSetValue();

  const isLoading = createAndInsertBookEmbeddings.isLoading || insertBook.isLoading;

  const uploadBook = useCallback(
    (file: File | null) => {
      if (!file) return;

      return new Promise((resolve, reject) => {
        try {
          const reader = new FileReader();

          reader.onload = async event => {
            if (event.target?.result) {
              const collection = slugify(file.name);
              let book: Book | undefined = createBook({
                title: file.name,
                embeddingCollectionName: collection
              });

              if (connectionType === "kai") {
                await executeCreateAndInsertBookEmbeddings({
                  collection,
                  dataURL: event.target.result as string
                });

                book = await executeInsertBook({ collection: "books", value: book, generateId: true });
              } else {
                const { embeddings, subjects, ..._book } = book;

                await executeCreateAndInsertBookEmbeddings({
                  collection,
                  dataURL: event.target.result as string
                });

                const mysqlBook = (await executeInsertBook({
                  collection: "books",
                  value: { ..._book, subjects: "" } as any,
                  generateId: true
                })) as any;

                book = normalizeMySQLBook(mysqlBook);
              }

              if (book) {
                setChatBooks(books => [...books, book!]);
                setActiveChatBook(book.id);
                setBooksNumber(number => (number += 1));
              }

              resolve(book);
            }
          };

          reader.readAsDataURL(file);
        } catch (error) {
          reject(error);
        }
      });
    },
    [
      executeCreateAndInsertBookEmbeddings,
      executeInsertBook,
      setChatBooks,
      setActiveChatBook,
      setBooksNumber,
      connectionType
    ]
  );

  const handleInputChange = useCallback<Defined<ComponentProps<"input">["onChange"]>>(
    async event => {
      if (!event.target.files?.[0]) {
        event.target.value = "";
        return;
      }

      try {
        await uploadBook(event.target.files[0]);
      } catch (error) {
        console.error(error);
      } finally {
        event.target.value = "";
      }
    },
    [uploadBook]
  );

  const handleButtonClick = useCallback<Defined<ButtonProps["onSubmit"]>>(() => {
    inputRef.current?.click();
  }, []);

  return (
    <Card {...props} className={cn("w-full", className)}>
      <form className="w-full">
        <input ref={inputRef} type="file" accept=".pdf" hidden onChange={handleInputChange} disabled={isLoading} />

        <Button
          variant="1"
          size="md"
          className="w-full max-w-full py-8"
          onClick={handleButtonClick}
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload a PDF"}
        </Button>
      </form>
    </Card>
  );
}
