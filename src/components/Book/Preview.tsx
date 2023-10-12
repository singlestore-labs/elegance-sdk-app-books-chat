import { Book } from "@/root/types";
import { ComponentProps } from "@/types";
import { cn } from "@/utils";
import { Card, CardProps } from "../Card";

export type BookPreviewProps = ComponentProps<CardProps, { book: Book }>;

export function BookPreview({ className, book, ...props }: BookPreviewProps) {
  return (
    <Card
      {...props}
      variant="1"
      size="md"
      className={cn("absolute z-10 hidden max-h-[16rem] w-[16rem] gap-2 overflow-y-auto overflow-x-hidden", className)}
    >
      <div>
        <h4 className="text-sm">{book.title}</h4>
        <p className="text-s2-gray-600 text-xs">{book.author}</p>
      </div>
      {book.description && <p className="line-clamp-4 text-xs">{book.description}</p>}
      <p className="text-xs">
        <span className="text-s2-gray-600">Subjects:</span> {book.subjects.join(", ")}
      </p>
      <div className="flex items-center gap-2">
        <p className="text-xs">
          <span className="text-s2-gray-600">Rating:</span> {book.rating}
        </p>
        <p className="text-xs">
          <span className="text-s2-gray-600">Reviews:</span> {book.reviews}
        </p>
      </div>
    </Card>
  );
}
