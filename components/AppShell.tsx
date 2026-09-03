"use client";

import { BrowserRouter, Link } from "react-router";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <header className="border-b border-gray-800 bg-gray-900 px-6 py-3 flex items-center gap-6 shrink-0">
        <span className="font-semibold text-indigo-400 text-lg tracking-tight">
          ReactFlow02
        </span>
        <nav className="flex gap-4 text-sm">
          <Link
            to="/"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            to="/flow-editor"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Flow Editor
          </Link>
        </nav>
      </header>
      <main className="flex-1 overflow-hidden">{children}</main>
    </BrowserRouter>
  );
}
