"use client";

import { ComponentProps } from "@/types";
import { cn } from "@/utils";
import { recommendedBooksState } from "@/state/recommendedBooks";
import { useRecommendedBooksIsLoadingState } from "@/state/recommendedBooksIsLoading";
import { Card, CardProps } from "../Card";
import { BookPreview } from "./Preview";

export type BookRecommendationsProps = ComponentProps<CardProps>;

export function BookRecommendations({ className, ...props }: BookRecommendationsProps) {
  const [isLoading] = useRecommendedBooksIsLoadingState();
  const books = recommendedBooksState.useValue();

  let _render;
  if (!books?.length) {
    _render = <p className="px-4 py-2 text-xs">Rate a book to get recommended books</p>;
  } else {
    _render = books.map(book => (
      <Card key={book.id} variant="2" size="md" className="group relative w-full">
        <div>
          <h4 className="line-clamp-2 text-sm">{book.title}</h4>
          <h6 className="text-s2-gray-600 line-clamp-2 text-xs">{book.author}</h6>
        </div>
        {!isLoading && <BookPreview book={book} className="left-full top-[-1px] group-hover:flex" />}
      </Card>
    ));
  }

  return (
    <Card {...props} variant="1" size="md" className={cn("relative w-full items-center p-0 [&>*]:w-full", className)}>
      {_render}
    </Card>
  );
}
