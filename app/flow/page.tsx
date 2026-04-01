import FlowPageClient from "@/components/FlowPageClient";

export default function FlowPage() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-6 py-3 border-b border-gray-800 text-xs text-gray-400 shrink-0">
        Drag nodes to rearrange &bull; Scroll to zoom &bull; Click a node to
        select
      </div>
      <div className="flex-1">
        <FlowPageClient />
      </div>
    </div>
  );
}
