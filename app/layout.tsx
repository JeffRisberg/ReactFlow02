import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReactFlow02 — Module Tree Viewer",
  description: "Visualize a software module tree with React Flow",
};

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
        <header className="border-b border-gray-800 bg-gray-900 px-6 py-3 flex items-center gap-6 shrink-0">
          <span className="font-semibold text-indigo-400 text-lg tracking-tight">
            ModuleTree
          </span>
          <nav className="flex gap-4 text-sm">
            <Link
              href="/flow"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Flow Diagram
            </Link>
            <Link
              href="/tree"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Tree View
            </Link>
          </nav>
        </header>
        <main className="flex-1 overflow-hidden">{children}</main>
      </body>
    </html>
  );
}
