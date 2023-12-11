import { Book, MySQLBook, User } from "@/root/types";
import { getEleganceClient } from "@/services/eleganceClient";
import { ConnectionTypes } from "@singlestore/elegance-sdk/types";
import { normalizeMySQLBook } from "../../utils";

export async function getBookToReview(connectionType: ConnectionTypes, user: User): Promise<Book | undefined> {
  try {
    const reviewedBooks = user.reviews.map(({ bookId }) => bookId);

    if (connectionType === "kai") {
      return (
        await getEleganceClient("kai").requests.query<Book[]>({
          collection: "books",
          query: [{ $match: { id: { $nin: reviewedBooks } } }, { $sample: { size: 1 } }]
        })
      )[0];
    } else {
      if (!reviewedBooks.length) {
        const book = (
          await getEleganceClient("mysql").requests.query<MySQLBook[]>({
            query: `SELECT * FROM books_chat_mysql.books ORDER BY RAND() LIMIT 1`
          })
        )[0];

        return normalizeMySQLBook(book);
      }

      const query = `SELECT * FROM books_chat_mysql.books
      WHERE id NOT IN (${reviewedBooks.map(i => `'${i}'`)})
      ORDER BY RAND() LIMIT 1`;

      const book = (await getEleganceClient("mysql").requests.query<MySQLBook[]>({ query }))[0];

      return normalizeMySQLBook(book);
    }
  } catch (error) {
    return undefined;
  }
}
