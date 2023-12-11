import { Book, User } from "@/root/types";
import { getEleganceClient } from "@/services/eleganceClient";
import { ConnectionTypes } from "@singlestore/elegance-sdk/types";
import { normalizeMySQLBook } from "../../utils";

export async function getRecommendedBooks(connectionType: ConnectionTypes, user: User) {
  const reviewedBookIds = user.reviews.map(({ bookId }) => bookId);

  if (!reviewedBookIds.length) return [];

  try {
    if (connectionType === "kai") {
      const [{ authors, subjects }] = await getEleganceClient("kai").requests.query<
        { authors: Book["author"][]; subjects: Book["subjects"] }[]
      >({
        collection: "books",
        query: [
          {
            $match: { id: { $in: reviewedBookIds } }
          },
          { $unwind: "$subjects" },
          {
            $group: {
              _id: null,
              authors: { $addToSet: "$author" },
              subjects: { $addToSet: "$subjects" }
            }
          }
        ]
      });

      return await getEleganceClient("kai").requests.query<Book[]>({
        collection: "books",
        query: [
          {
            $match: {
              $and: [
                { id: { $nin: reviewedBookIds } },
                {
                  $or: [{ author: { $in: authors } }, { subjects: { $in: subjects } }]
                }
              ]
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
            $limit: 3
          },
          { $project: { _id: 0, random: 0 } }
        ]
      });
    } else {
      const reviewedBookIdsString = reviewedBookIds.map(i => `'${i}'`);

      const subjects = (
        await getEleganceClient("mysql").requests.query({
          query: `SELECT DISTINCT subjects FROM books_chat_mysql.books WHERE id IN (${reviewedBookIdsString})`
        })
      )
        .flatMap(i => i.subjects.split(", "))
        .map(i => `subjects LIKE "%${i}%"`)
        .join(" OR ");

      const query = `SELECT * FROM books_chat_mysql.books
      WHERE id NOT IN (${reviewedBookIdsString})
      AND (
        author IN (SELECT DISTINCT author FROM books_chat_mysql.books WHERE id IN (${reviewedBookIdsString}))
        OR (${subjects}))
      ORDER BY RAND()
      LIMIT 3`;

      const books = await getEleganceClient("mysql").requests.query({ query });

      return books.map(normalizeMySQLBook);
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
