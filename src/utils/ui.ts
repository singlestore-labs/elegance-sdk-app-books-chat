import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookie from "js-cookie";
import { ConnectionTypes } from "@singlestore/elegance-sdk/types";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}

export function setConnectionTypeCookiesValue(value: ConnectionTypes) {
  Cookie.set("connectionType", value);
}

export function setIsDarkModeCookiesValue(value: boolean) {
  Cookie.set("isDarkMode", `${value}`);
}
