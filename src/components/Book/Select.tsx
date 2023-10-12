"use client";

import { useCallback, useMemo } from "react";
import { Defined } from "@/root/types";
import { ComponentProps } from "@/types";
import { chatBooksState } from "@/state/chatBooks";
import { activeChatBookState } from "@/state/activeChatBook";
import { cn } from "@/utils";
import { Select, SelectOption, SelectProps } from "../Select";

export type BookSelectProps = ComponentProps<SelectProps>;

export function BookSelect({ ...props }: BookSelectProps) {
  const chatBooks = chatBooksState.useValue();
  const activeChatBookId = activeChatBookState.useId();
  const setActiveChatBookById = activeChatBookState.useSetValueById();

  const handleOptionClick = useCallback<Defined<SelectProps["onOptionClick"]>>(
    option => setActiveChatBookById(option.value),
    [setActiveChatBookById]
  );

  const selectOptions = useMemo(() => {
    return chatBooks.map(book => {
      return {
        label: (
          <span className="flex flex-col items-start justify-start text-left">
            <h4 className="title line-clamp-2">{book.title}</h4>
            <h6 className="author text-s2-gray-600 line-clamp-2 text-xs">{book.author}</h6>
          </span>
        ),
        value: book.id
      } satisfies SelectOption;
    });
  }, [chatBooks]);

  return (
    <Select
      {...props}
      className={cn("[&_.toggler_.author]:line-clamp-1 [&_.toggler_.title]:line-clamp-1", props.className)}
      value={activeChatBookId}
      placeholder="Select book"
      options={selectOptions}
      onOptionClick={handleOptionClick}
    />
  );
}
