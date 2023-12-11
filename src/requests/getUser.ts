import { cookies } from "next/headers";
import { MySQLUser, User } from "@/root/types";
import { createUser } from "@/root/utils/db";
import { getEleganceClient } from "@/services/eleganceClient";
import { getConnectionType } from "@/utils/server";

export async function getUser(): Promise<User> {
  const userId = cookies().get("userId")?.value;
  const connectionType = getConnectionType();

  if (connectionType === "kai") {
    let user = await getEleganceClient("kai").requests.findOne<User>({ collection: "users", filter: { id: userId } });

    if (!user) {
      user = await getEleganceClient("kai").requests.insertOne<User>({
        collection: "users",
        value: createUser(),
        generateId: true
      });
    }

    return user;
  } else {
    let user = await getEleganceClient("mysql").requests.findOne<MySQLUser>({
      collection: "users",
      where: `id = '${userId}'`
    });

    if (!user || !Object.keys(user).length) {
      user = await getEleganceClient("mysql").requests.insertOne<MySQLUser>({
        collection: "users",
        value: { ...createUser(), reviews: JSON.stringify([]) },
        generateId: true
      });
    }

    return {
      ...user,
      reviews: typeof user.reviews === "string" ? JSON.parse(user.reviews) : user.reviews
    };
  }
}
