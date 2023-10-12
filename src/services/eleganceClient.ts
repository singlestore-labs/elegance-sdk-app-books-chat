import { createEleganceClient } from "@singlestore/elegance-sdk";
import { ConnectionTypes } from "@singlestore/elegance-sdk/types";

export function getEleganceClient<T extends ConnectionTypes>(connectionType: T) {
  return createEleganceClient(connectionType, {
    baseURL: "http://localhost:3000/api",
    defaultRequestOptions: { cache: "no-cache", headers: { cookie: `connectionType=${connectionType}` } }
  });
}
