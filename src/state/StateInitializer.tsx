"use client";

import { ReactNode } from "react";
import { MutableSnapshot, RecoilRoot } from "recoil";
import { ConnectionTypes } from "@singlestore/elegance-sdk/types";
import Cookie from "js-cookie";
import { Book, User } from "@/root/types";
import { booksNumberState } from "@/state/booksNumber";
import { chatBooksState } from "@/state/chatBooks";
import { userState } from "./user";
import { bookToReviewState } from "./bookToReview";
import { recommendedBooksState } from "./recommendedBooks";
import { isDarkModeState } from "./isDarkMode";
import { connectionTypeState } from "./connectionType";
import { setConnectionTypeCookiesValue, setIsDarkModeCookiesValue } from "@/utils";

export type StateInitializerProps = {
  children: ReactNode;
  connectionType?: ConnectionTypes;
  user: User;
  bookToReview?: Book;
  recommendedBooks?: Book[];
  chatBooks?: Book[];
  booksNumber?: number;
  isDarkMode?: boolean;
};

export function StateInitializer({
  connectionType,
  user,
  bookToReview,
  recommendedBooks,
  chatBooks,
  booksNumber,
  isDarkMode,
  ...props
}: StateInitializerProps) {
  function initializeState({ set }: MutableSnapshot) {
    if (connectionType) {
      set(connectionTypeState.atom, connectionType);
      setConnectionTypeCookiesValue(connectionType);
    }

    if (user) {
      set(userState.atom, user);
      Cookie.set("userId", user.id);
    }

    if (bookToReview) set(bookToReviewState.atom, bookToReview);
    if (recommendedBooks) set(recommendedBooksState.atom, recommendedBooks);
    if (typeof booksNumber === "number") set(booksNumberState.atom, booksNumber);
    if (chatBooks) set(chatBooksState.atom, chatBooks);

    if (typeof isDarkMode === "boolean") {
      set(isDarkModeState.atom, isDarkMode);
      setIsDarkModeCookiesValue(isDarkMode);
    }
  }

  return <RecoilRoot {...props} initializeState={initializeState} />;
}
