import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/providers/toast-provider";
import { SessionProvider } from "next-auth/react"
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/queryClient";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const font = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Flavor Finder",
  description: "Recipe Recommendation System using Nextjs, Flask, Postgres ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
          <SessionProvider>
            <QueryClientProvider client={queryClient}>
              <ToastProvider>
                {children}
              </ToastProvider>
            </QueryClientProvider>
          </SessionProvider>
      </body>
    </html>
  );
}
