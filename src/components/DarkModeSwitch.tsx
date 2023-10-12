import { isDarkModeState } from "@/state/isDarkMode";
import { ComponentProps } from "@/types";
import { cn } from "@/utils";
import { Button } from "./Button";

export type DarkModeSwitchProps = ComponentProps<"div">;

export function DarkModeSwitch({ className, ...props }: DarkModeSwitchProps) {
  const [isDarkMode, setIsDarkMode] = isDarkModeState.useState();

  return (
    <div {...props} className={cn(className)}>
      <Button className="text-2xl" onClick={() => setIsDarkMode(is => !is)}>
        {isDarkMode ? "🌙" : "☀️"}
      </Button>
    </div>
  );
}
