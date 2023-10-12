import { ReactNode } from "react";
import { getUser, getBooksNumber, getBooksWithEmbeddings } from "@/requests";
import { StateInitializer } from "./StateInitializer";
import { getBookToReview } from "@/requests/getBookToReview";
import { getRecommendedBooks } from "@/requests/getRecommendedBooks";
import { getConnectionType, getIsDarkModeCookieValue } from "@/utils/server";

export type StateProviderProps = { children?: ReactNode };

export async function StateProvider({ children }: StateProviderProps) {
  const connectionType = getConnectionType();
  const isDarkMode = getIsDarkModeCookieValue();
  const user = await getUser();

  const [bookToReview, recommendedBooks, chatBooks, booksNumber] = await Promise.all([
    getBookToReview(connectionType, user),
    getRecommendedBooks(connectionType, user),
    getBooksWithEmbeddings(connectionType),
    getBooksNumber(connectionType)
  ]);

  return (
    <StateInitializer
      connectionType={connectionType}
      user={user}
      bookToReview={bookToReview}
      recommendedBooks={recommendedBooks}
      chatBooks={chatBooks}
      booksNumber={booksNumber}
      isDarkMode={isDarkMode}
    >
      {children}
    </StateInitializer>
  );
}
