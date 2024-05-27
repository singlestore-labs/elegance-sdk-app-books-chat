import { ComponentProps } from "@/types";
import { cn } from "@/utils";
import { Logo } from "../Logo";
import { Card, CardProps } from "../Card";
import { BookUploader } from "../Book/Uploader";
import { SidebarInfo } from "./Info";
import { BookReview } from "../Book/Review";
import { BookRecommendations } from "../Book/Recommendations";
import { ReactNode } from "react";
import { APP_NAME } from "@/constants/config";

export type SidebarProps = ComponentProps<CardProps>;

export function Sidebar({ className, ...props }: SidebarProps) {
  return (
    <Card
      {...props}
      variant="1"
      size="md"
      className={cn("w-full max-w-[300px] flex-1 p-0", className)}
    >
      <Card
        size="xl"
        className="w-full flex-row items-center justify-center gap-2 border-b px-0 text-center border-border flex-wrap"
      >
        <Logo className="w-36 flex-shrink-0" />
        <h1 className="inline-flex flex-wrap items-center gap-1 pt-0.5 text-lg">
          <span className="text-sm">|</span>
          <span>{APP_NAME}</span>
        </h1>
      </Card>

      <Card size="md" className="w-full flex-1 gap-8 py-4 pt-8">
        <Section>
          <SidebarInfo />
        </Section>

        <Section
          title="Reviews"
          description="Review a book to get recommendations"
        >
          <BookReview />
        </Section>

        <Section
          title="Recommendations"
          description="Recommended books based on your reviews"
        >
          <BookRecommendations />
        </Section>

        <BookUploader className="mt-auto" />
      </Card>
    </Card>
  );
}

function Section({
  children,
  title,
  description,
}: {
  children?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
}) {
  return (
    <div className="w-full">
      {(title || description) && (
        <div className="mb-2">
          {title && <h2 className="text-base font-medium">{title}</h2>}
          {description && (
            <p className="text-s2-gray-600 text-xs">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
