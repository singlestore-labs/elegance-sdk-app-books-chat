import { ComponentProps } from "@/types";
import { cn } from "@/utils";

export type RateProps = ComponentProps<
  "div",
  { isDisabled?: boolean; onClick?: (value: number) => void }
>;

export function Rate({ className, isDisabled, onClick, ...props }: RateProps) {
  const stars = Array.from({ length: 5 }).map((_, i) => (
    <button
      key={i}
      className={cn(
        `hover:enabled:text-primary dark:hover:enabled:text-s2-indigo-500`,
        isDisabled && "text-s2-gray-200 dark:text-zinc-500"
      )}
      disabled={isDisabled}
      onClick={() => onClick?.(i + 1)}
    >
      &#9733;
    </button>
  ));

  return (
    <div
      {...props}
      className={cn("text-s2-gray-400 flex gap-1 text-base", className)}
    >
      {stars}
    </div>
  );
}
