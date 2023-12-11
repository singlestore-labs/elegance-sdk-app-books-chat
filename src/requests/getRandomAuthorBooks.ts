import { Book } from "@/root/types";
import { getEleganceClient } from "@/services/eleganceClient";
import { ConnectionTypes } from "@singlestore/elegance-sdk/types";

export async function getRandomAuthorBooksNumber(
  connectionType: ConnectionTypes
): Promise<{ name: string; booksNumber: number } | undefined> {
  try {
    if (connectionType === "kai") {
      return (
        await getEleganceClient("kai").requests.query<{ name: Book["author"]; booksNumber: number }[]>({
          collection: "books",
          query: [
            {
              $group: {
                _id: "$author",
                booksNumber: { $sum: 1 }
              }
            },
            {
              $match: {
                booksNumber: { $gt: 2 }
              }
            },
            {
              $project: {
                _id: 0,
                author: "$_id",
                booksNumber: 1
              }
            },
            {
              $addFields: {
                random: { $rand: {} }
              }
            },
            {
              $sort: { random: 1 }
            },
            {
              $limit: 1
            },
            {
              $project: {
                _id: 0,
                name: "$author",
                booksNumber: 1
              }
            }
          ]
        })
      )[0];
    } else {
      const query = `SELECT author as name, COUNT(*) as booksNumber
      FROM books_chat_mysql.books
      GROUP BY name
      HAVING booksNumber > 2
      ORDER BY RAND()
      LIMIT 1`;

      return (await getEleganceClient("mysql").requests.query({ query }))[0];
    }
  } catch (error) {
    return undefined;
  }
}
