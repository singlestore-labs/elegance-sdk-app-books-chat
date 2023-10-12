"use client";

import { booksNumberState } from "@/state/booksNumber";
import { LabelCard } from "../LabelCard";

export function BooksNumberLabelCard() {
  const booksNumber = booksNumberState.useValue();

  return (
    <LabelCard className="flex-row items-center justify-between" variant="2" size="md" label="Total number of books">
      <span className="text-right text-lg">{booksNumber}</span>
    </LabelCard>
  );
}
