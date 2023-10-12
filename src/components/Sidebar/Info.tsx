import { ComponentProps } from "@/types";
import { getRandomAuthorBooksNumber, getMostReviewedBook, getHighestRatedBook } from "@/requests";
import { cn } from "@/utils";
import { LabelCard } from "../LabelCard";
import { Card } from "../Card";
import { BookPreview } from "../Book/Preview";
import { getConnectionType } from "@/utils/server";

export type SidebarInfoProps = ComponentProps<"div">;

export async function SidebarInfo({ className, ...props }: SidebarInfoProps) {
  const connectionType = getConnectionType();
  const randomAuthorBooksNumber = await getRandomAuthorBooksNumber(connectionType);
  const mostReviewedBook = await getMostReviewedBook(connectionType);
  const highestRatedBook = await getHighestRatedBook(connectionType);

  return (
    <Card {...props} variant="1" size="md" className={cn("[&>*]:w-full w-full p-0", className)}>
      {randomAuthorBooksNumber && (
        <LabelCard
          className="flex-row items-center justify-between"
          label={
            <span>
              <span>Total number of books</span>
              <span className="block">
                by <span className="text-s2-gray-800 dark:text-white">{randomAuthorBooksNumber.name}</span>
              </span>
            </span>
          }
        >
          <span className="text-right text-lg">{randomAuthorBooksNumber.booksNumber}</span>
        </LabelCard>
      )}

      {mostReviewedBook && (
        <LabelCard className="group" label="Most reviewed book">
          <span className="flex flex-col items-start justify-start text-left">
            <h4 className="line-clamp-1">{mostReviewedBook.title}</h4>
            <h6 className="text-s2-gray-600 line-clamp-2 text-xs">{mostReviewedBook.author}</h6>
          </span>
          <BookPreview className="left-full top-[-1px] group-hover:flex" book={mostReviewedBook} />
        </LabelCard>
      )}

      {highestRatedBook && (
        <LabelCard className="group" label="Highest rated book">
          <span className="flex flex-col items-start justify-start text-left">
            <h4 className="line-clamp-1">{highestRatedBook.title}</h4>
            <h6 className="text-s2-gray-600 line-clamp-2 text-xs">{highestRatedBook.author}</h6>
          </span>
          <BookPreview className="left-full top-[-1px] group-hover:flex" book={highestRatedBook} />
        </LabelCard>
      )}
    </Card>
  );
}
