"use client";

import { Geist, Geist_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import "./globals.css";

const App = dynamic<{ children: ReactNode }>(() => import("./App"), {
  ssr: false,
  loading: () => <div className="flex-1" />,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full flex flex-col bg-gray-950 text-gray-100">
        <App>{children}</App>
      </body>
    </html>
  );
}
