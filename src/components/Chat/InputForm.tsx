import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import { ComponentProps } from "@/types";
import { Defined } from "@/root/types";
import { cn } from "@/utils";
import { Textarea } from "../Textarea";
import { Button } from "../Button";

export type ChatInputFormProps = ComponentProps<
  "form",
  { isDisabled?: boolean; resetOnSubmit?: boolean; onSubmit?: (value: string) => void }
>;

export type ChatInputFormRef = { root: HTMLFormElement | null; textarea: HTMLTextAreaElement | null };

export const ChatInputForm = forwardRef<ChatInputFormRef, ChatInputFormProps>(
  ({ className, resetOnSubmit, isDisabled, onSubmit, ...props }, ref) => {
    const rootRef = useRef<HTMLFormElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [value, setValue] = useState("");

    const submit = useCallback(() => {
      onSubmit?.(value);
      if (resetOnSubmit) setValue("");
    }, [value, resetOnSubmit, onSubmit]);

    const handleFormSubmit = useCallback<Defined<ComponentProps<"form">["onSubmit"]>>(
      event => {
        event.preventDefault();
        submit();
      },
      [submit]
    );

    const handleTextareaKeyDown = useCallback<Defined<ComponentProps<"textarea">["onKeyDown"]>>(
      event => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          submit();
        }
      },
      [submit]
    );

    useImperativeHandle(ref, () => ({ root: rootRef.current, textarea: textareaRef.current }));

    return (
      <form {...props} ref={rootRef} className={cn("flex w-full max-w-full", className)} onSubmit={handleFormSubmit}>
        <Textarea
          ref={textareaRef}
          variant="1"
          size="md"
          className="w-full max-w-full resize-none pr-20"
          placeholder="Enter your message"
          rows={4}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleTextareaKeyDown}
          disabled={isDisabled}
        />

        <Button type="submit" variant="1" size="md" className="absolute bottom-2 right-2" disabled={isDisabled}>
          Send
        </Button>
      </form>
    );
  }
);

ChatInputForm.displayName = "ChatInputForm";
