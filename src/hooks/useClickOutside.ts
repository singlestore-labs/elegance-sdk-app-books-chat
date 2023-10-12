import { RefObject, useCallback, useEffect } from "react";

export function useClickOutside<T extends RefObject<any>>(ref: T, callback: () => void) {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!ref.current?.contains(event.target)) {
        callback();
      }
    },
    [ref, callback]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);
}
