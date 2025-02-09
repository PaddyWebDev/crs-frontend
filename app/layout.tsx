import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/providers/toast-provider";
import { SessionProvider } from "next-auth/react"
const font = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "CRS",
  description: "Crop Recommendation System using Nextjs, Flask, Postgres ",
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
          <ToastProvider>
            {children}
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
