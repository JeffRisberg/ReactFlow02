"use client";

import dynamic from "next/dynamic";
import { Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";

const FlowEditorPage = dynamic(
  () => import("./pages/FlowEditorPage").then((m) => m.FlowEditorPage),
  { ssr: false, loading: () => <div className="flex-1" /> }
);

export default function Home() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/flow-editor" element={<FlowEditorPage />} />
    </Routes>
  );
}
