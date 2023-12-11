import { Book, MySQLBook } from "@/root/types";
import { getEleganceClient } from "@/services/eleganceClient";
import { ConnectionTypes } from "@singlestore/elegance-sdk/types";
import { normalizeMySQLBook } from "../../utils";

export async function getBooksWithEmbeddings(connectionType: ConnectionTypes): Promise<Book[]> {
  try {
    if (connectionType === "kai") {
      return getEleganceClient("kai").requests.query<Book[]>({
        collection: "books",
        query: [
          {
            $match: {
              embeddingCollectionName: {
                $exists: true,
                $ne: ""
              }
            }
          },
          {
            $sort: {
              title: 1
            }
          }
        ]
      });
    } else {
      let books = await getEleganceClient("mysql").requests.query<MySQLBook[]>({
        query: `SELECT * FROM books_chat_mysql.books
        WHERE embeddingCollectionName IS NOT NULL AND embeddingCollectionName != ''
        ORDER BY title`
      });

      return books.map(normalizeMySQLBook);
    }
  } catch (error) {
    return [];
  }
}
