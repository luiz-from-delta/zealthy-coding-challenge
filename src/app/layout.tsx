import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

import { Header } from "./components";

const mulishSans = Mulish({
  variable: "--font-mulish-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zealthy",
  description: "Zealthy Coding Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulishSans.variable} antialiased`}>
        <Header />
        <main className="w-full h-[calc(100vh-100px)] overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
