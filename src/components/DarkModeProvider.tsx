"use client";

import { useEffect } from "react";
import { isDarkModeState } from "@/state/isDarkMode";
import { ComponentProps } from "@/types";
import { cn, setIsDarkModeCookiesValue } from "@/utils";

export type DarkModeProviderProps = ComponentProps<"div">;

export function DarkModeProvider({ className, ...props }: DarkModeProviderProps) {
  const isDarkMode = isDarkModeState.useValue();

  useEffect(() => {
    setIsDarkModeCookiesValue(isDarkMode);
  }, [isDarkMode]);

  return <div {...props} className={cn(isDarkMode && "dark", className)} />;
}
