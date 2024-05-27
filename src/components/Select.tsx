"use client";

import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ComponentProps } from "@/types";
import { cn } from "@/utils";
import { Button } from "./Button";
import { Dropdown } from "./Dropdown";
import { useClickOutside } from "@/hooks/useClickOutside";

export type SelectOption = { label: ReactNode; value: string };

export type SelectProps = ComponentProps<
  "div",
  {
    value?: SelectOption["value"];
    placeholder?: string;
    options?: SelectOption[];
    closeOnOptionClick?: boolean;
    isDisabled?: boolean;
    onOptionClick?: (option: SelectOption) => void;
  }
>;

export function Select({
  className,
  value,
  placeholder = "Select",
  options = [],
  closeOnOptionClick = true,
  isDisabled = false,
  onOptionClick,
  ...props
}: SelectProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const activeOption = options.find((option) => option.value === value);
  const label = value ? activeOption?.label : placeholder;

  const handleOptionClick = useCallback(
    (option: SelectOption) => {
      onOptionClick?.(option);
      if (closeOnOptionClick) setIsDropdownOpen(false);
    },
    [closeOnOptionClick, onOptionClick]
  );

  const handleClickOutside = useCallback(() => setIsDropdownOpen(false), []);

  useClickOutside(rootRef, handleClickOutside);

  useEffect(() => {
    if (isDisabled) setIsDropdownOpen(false);
  }, [isDisabled]);

  const dropdownChildren = useMemo(() => {
    return options.map((option) => {
      const isActive = activeOption?.value === option.value;

      return (
        <Button
          key={option.value}
          variant="2"
          size="sm"
          className={cn(
            "w-full flex-shrink-0 flex-grow-0 basis-auto justify-start border-y-0 border-x-0 rounded-none first:border-t-0 border-t border-border",
            isActive && "[&>*]:text-primary"
          )}
          disabled={isActive}
          withDisabledStyle={false}
          onClick={() => handleOptionClick(option)}
        >
          {option.label}
        </Button>
      );
    });
  }, [activeOption?.value, options, handleOptionClick]);

  const toggleDropdown = (isOpen?: boolean) =>
    setIsDropdownOpen((is) => (isOpen !== undefined ? isOpen : !is));

  return (
    <div
      {...props}
      ref={rootRef}
      className={cn("relative h-12 w-80", className)}
    >
      <Button
        variant="2"
        size="sm"
        className={cn(
          "toggler h-full w-full font-medium",
          value && "justify-start text-left"
        )}
        onClick={() => toggleDropdown()}
        disabled={isDisabled}
        withDisabledStyle={false}
      >
        {label}
      </Button>

      <Dropdown isOpen={isDropdownOpen}>{dropdownChildren}</Dropdown>
    </div>
  );
}
