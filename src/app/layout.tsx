import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

import { Header } from "@/app/components";

import bottomBarLine from "@/app/assets/bottom-bar-line.svg";
import Image from "next/image";

const mulishSans = Mulish({
  variable: "--font-mulish-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
      <body className={`${mulishSans.variable} antialiased relative`}>
        <Header />
        <main className="w-full h-[calc(100vh-100px)] overflow-x-hidden overflow-y-auto">
          {children}
        </main>
        <div className="w-full h-3 absolute left-0 bottom-6 flex justify-center">
          <Image src={bottomBarLine} alt="" />
        </div>
      </body>
    </html>
  );
}
