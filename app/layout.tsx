import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navigation from "@/components/layout/Navigation";
import { EdgeStoreProvider } from "../lib/edgestore";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "univrate | Rating views of universities",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <EdgeStoreProvider>
          <body className={inter.className}>
            <Navigation />
            {children}
            <Toaster />
          </body>
        </EdgeStoreProvider>
      </ClerkProvider>
    </html>
  );
}