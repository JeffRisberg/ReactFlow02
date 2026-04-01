import {
  moduleTree,
  flattenTree,
  typeColors,
  typeLabels,
  type FlatNode,
} from "@/lib/moduleTree";

function TreeRow({ flat }: { flat: FlatNode }) {
  const { node, depth } = flat;
  const color = typeColors[node.type];
  const hasChildren = (node.children?.length ?? 0) > 0;

  return (
    <div
      className="flex items-start gap-2 py-1.5 px-2 rounded hover:bg-gray-800/50 transition-colors group"
      style={{ paddingLeft: `${depth * 24 + 8}px` }}
    >
      {/* connector lines */}
      {depth > 0 && (
        <span
          className="shrink-0 mt-1 text-gray-600 select-none"
          aria-hidden="true"
        >
          {hasChildren ? "▾" : "·"}
        </span>
      )}

      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="font-semibold text-sm"
            style={{ color: depth === 0 ? color : "#f1f5f9" }}
          >
            {node.label}
          </span>
          <span
            className="rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide"
            style={{
              backgroundColor: color + "22",
              color,
            }}
          >
            {typeLabels[node.type]}
          </span>
        </div>
        {node.description && (
          <span className="text-xs text-gray-400 mt-0.5">
            {node.description}
          </span>
        )}
      </div>
    </div>
  );
}

export default function TreePage() {
  const flat = flattenTree(moduleTree);

  return (
    <div className="h-full overflow-auto">
      <div className="px-6 py-3 border-b border-gray-800 text-xs text-gray-400 shrink-0 sticky top-0 bg-gray-950 z-10">
        {flat.length} modules &bull; indented by dependency depth
      </div>
      <div className="py-4 px-2 max-w-3xl">
        {flat.map((f) => (
          <TreeRow key={f.node.id} flat={f} />
        ))}
      </div>
    </div>
  );
}
