import { getEleganceClient } from "@/services/eleganceClient";
import { ConnectionTypes } from "@singlestore/elegance-sdk/types";

export async function getBooksNumber(connectionType: ConnectionTypes) {
  try {
    if (connectionType === "kai") {
      return (
        await getEleganceClient("kai").requests.query<{ number: number }[]>({
          collection: "books",
          query: [
            {
              $group: {
                _id: null,
                number: { $sum: 1 }
              }
            },
            {
              $project: {
                _id: 0,
                number: 1
              }
            }
          ]
        })
      )[0].number;
    } else {
      return (
        await getEleganceClient("mysql").requests.query<{ number: number }[]>({
          query: "SELECT COUNT(*) as number from books_chat_mysql.books"
        })
      )[0].number;
    }
  } catch (error) {
    return 0;
  }
}
