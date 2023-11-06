import { createEleganceServerClient } from "@singlestore/elegance-sdk/server";
import { ConnectionTypes } from "@singlestore/elegance-sdk/types";

export function getEleganceServerClient(connectionType: ConnectionTypes) {
  if (connectionType === "kai") {
    return createEleganceServerClient("kai", {
      connection: {
        uri: process.env.KAI_URI ?? "",
        database: "books_chat_kai"
      },
      ai: {
        openai: {
          apiKey: process.env.OPENAI_API_KEY
        }
      }
    });
  } else {
    return createEleganceServerClient("mysql", {
      connection: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.DB_PASSWORD,
        database: "books_chat_mysql"
      },
      ai: {
        openai: {
          apiKey: process.env.OPENAI_API_KEY
        }
      }
    });
  }
}
