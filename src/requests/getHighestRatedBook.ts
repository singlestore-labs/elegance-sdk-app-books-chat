import { Book, MySQLBook } from "@/root/types";
import { getEleganceClient } from "@/services/eleganceClient";
import { ConnectionTypes } from "@singlestore/elegance-sdk/types";
import { normalizeMySQLBook } from "../../utils";

export async function getHighestRatedBook(connectionType: ConnectionTypes) {
  try {
    if (connectionType === "kai") {
      return (
        await getEleganceClient("kai").requests.query<Book[]>({
          collection: "books",
          query: [{ $sort: { rating: -1, title: 1 } }, { $limit: 1 }]
        })
      )[0];
    } else {
      const book = (
        await getEleganceClient("mysql").requests.query<MySQLBook[]>({
          query: `SELECT * FROM books_chat_mysql.books ORDER BY rating DESC, title ASC LIMIT 1`
        })
      )[0];

      return normalizeMySQLBook(book);
    }
  } catch (error) {
    return undefined;
  }
}
