import { ConnectionTypes } from "@singlestore/elegance-sdk/types";
import { cookies } from "next/headers";

export function getConnectionType(): ConnectionTypes {
  const types = (process.env.NEXT_PUBLIC_CONNECTION_TYPE ?? "mysql").split(",") as ConnectionTypes[];
  const defaultType = types[0];
  const cookieValue = cookies().get("connectionType")?.value as ConnectionTypes;
  return types.includes(cookieValue) ? cookieValue : defaultType;
}

export function getIsDarkModeCookieValue() {
  return cookies().get("isDarkMode")?.value === "true";
}
