import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/utils";
import { StateProvider } from "@/state/StateProvider";
import { Footer } from "@/components/Footer";
import { DarkModeProvider } from "@/components/DarkModeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SingleStore Elegance SDK"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
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
            <div className="bg-s2-gray-200 text-s2-gray-800 flex w-full max-w-full flex-1 flex-col dark:bg-zinc-800 dark:text-white">
              <main className="flex w-full max-w-full flex-1 flex-col">{children}</main>
              <Footer />
            </div>
          </DarkModeProvider>
        </StateProvider>
      </body>
    </html>
  );
}
