"use client";

import dynamic from "next/dynamic";

const ModuleFlowDiagram = dynamic(
  () => import("@/components/ModuleFlowDiagram"),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-full text-gray-500 text-sm">Loading diagram…</div> }
);

export default function FlowPageClient() {
  return (
    <div className="flex-1 h-full">
      <ModuleFlowDiagram />
    </div>
  );
}
