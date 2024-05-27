import { ComponentProps } from "@/types";
import { cn } from "@/utils";

export type FooterProps = ComponentProps<"footer">;

export function Footer({ className, ...props }: FooterProps) {
  return (
    <footer
      {...props}
      className={cn(
        "text-s2-gray-600 flex items-center justify-center pb-4 text-xs",
        className
      )}
    >
      <div>
        <p>
          This application is an example of developing a full-stack AI
          application using the SingleStore Elegance SDK. Developed by{" "}
          <a
            href="https://www.singlestore.com/"
            target="_blank"
            className="hover:text-primary underline"
          >
            SingleStore, Inc.
          </a>
        </p>
      </div>
    </footer>
  );
}
