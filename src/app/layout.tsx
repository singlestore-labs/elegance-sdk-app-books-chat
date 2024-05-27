import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/utils";
import { StateProvider } from "@/state/StateProvider";
import { Footer } from "@/components/Footer";
import { DarkModeProvider } from "@/components/DarkModeProvider";
import { APP_NAME } from "@/constants/config";

const inter = Inter({ weight: ["400", "500", "600"], subsets: ["latin"] });

const title = `SingleStore | ${APP_NAME}`;
export const metadata: Metadata = {
  title: {
    default: title,
    template: `${title} - %s`,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          `flex min-h-screen w-full min-w-[320px] max-w-full flex-col overflow-y-auto overflow-x-hidden `,
          inter.className
        )}
      >
        <StateProvider>
          <DarkModeProvider className="flex w-full max-w-full flex-1 flex-col">
            <div className="bg-background text-foreground flex w-full max-w-full flex-1 flex-col">
              <main className="flex w-full max-w-full flex-1 flex-col">
                {children}
              </main>
              <Footer />
            </div>
          </DarkModeProvider>
        </StateProvider>
      </body>
    </html>
  );
}
