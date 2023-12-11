"use client";

import { useState } from "react";
import { Book, Defined, User } from "@/root/types";
import { ComponentProps } from "@/types";
import { getEleganceClient } from "@/services/eleganceClient";
import { bookToReviewState } from "@/state/bookToReview";
import { recommendedBooksState } from "@/state/recommendedBooks";
import { getRecommendedBooks } from "@/requests/getRecommendedBooks";
import { useRecommendedBooksIsLoadingState } from "@/state/recommendedBooksIsLoading";
import { getBookToReview } from "@/requests/getBookToReview";
import { userState } from "@/state/user";
import { createUserReview } from "@/root/utils/db";
import { cn } from "@/utils";
import { BookPreview } from "./Preview";
import { Card, CardProps } from "../Card";
import { Rate, RateProps } from "../Rate";
import { connectionTypeState } from "@/state/connectionType";

export type BookReviewProps = ComponentProps<CardProps>;

export function BookReview({ className, ...props }: BookReviewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const user = userState.useValue();
  const setUserReviews = userState.useSetReviews();
  const [book, setBook] = bookToReviewState.useState();
  const setUserBooksRecommendations = recommendedBooksState.useSetValue();
  const [, setIsRecommendationsLoading] = useRecommendedBooksIsLoadingState();
  const connectionType = connectionTypeState.useValue();

  const refreshRecommendations = async (user: User) => {
    setIsRecommendationsLoading(true);
    const books = await getRecommendedBooks(connectionType, user);
    if (books) setUserBooksRecommendations(books);
    setIsRecommendationsLoading(false);
  };

  const handleRatingClick: Defined<RateProps["onClick"]> = async value => {
    if (!book || !value) return;

    try {
      setIsLoading(true);

      const reviews = book.reviews + 1;
      const rating = +((book.rating * book.reviews + value) / reviews).toFixed(1);
      const newReview = createUserReview({ bookId: book.id, value });
      const updatedUser = { ...user, reviews: [...user.reviews, newReview] };

      if (connectionType === "kai") {
        getEleganceClient("kai").requests.updateMany<Book[]>({
          collection: "books",
          filter: { id: book.id },
          update: { $set: { reviews, rating } }
        });

        await getEleganceClient("kai").requests.updateMany<User[]>({
          collection: "users",
          filter: { id: user.id },
          update: { $push: { reviews: newReview } }
        });
      } else {
        getEleganceClient("mysql").requests.updateMany({
          collection: "books",
          where: `id = '${book.id}'`,
          set: `reviews = ${reviews}, rating = ${rating}`
        });

        await getEleganceClient("mysql").requests.updateMany({
          collection: "users",
          where: `id = '${user.id}'`,
          set: `reviews = '${JSON.stringify(updatedUser.reviews)}'`
        });
      }

      setUserReviews([newReview]);
      await refreshRecommendations(updatedUser);
      setBook(await getBookToReview(connectionType, updatedUser));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  if (!book) return null;

  return (
    <Card {...props} variant="1" size="md" className={cn("group relative w-full items-center", className)}>
      <div className="text-center">
        <h4 className="line-clamp-2 text-sm">{book.title}</h4>
        <h6 className="text-s2-gray-600 line-clamp-2 text-xs">{book.author}</h6>
      </div>
      <Rate className="mt-1" isDisabled={isLoading} onClick={handleRatingClick} />
      {!isLoading && <BookPreview book={book} className="left-full top-[-1px] group-hover:flex" />}
    </Card>
  );
}
