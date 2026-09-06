import { Handle, Position, type NodeProps, type NodeTypes } from "@xyflow/react";
import { cn } from "@/lib/utils";
import { NODE_REGISTRY_MAP } from "./registry";

function FlowNode({ id, type, data, selected }: NodeProps) {
  const def = type ? NODE_REGISTRY_MAP[type] : undefined;
  if (!def) return null;
  const label = typeof data?.label === "string" ? data.label : def.label;
  const Icon = def.Icon;

  return (
    <div
      className={cn(
        "min-w-[170px] rounded-lg border-1.5 bg-card px-3 py-2.5 shadow-sm transition-shadow",
        selected && "ring-2 ring-offset-1"
      )}
      style={{
        borderColor: `${def.background}80`,
        boxShadow: selected ? `0 0 0 2px ${def.background}55` : undefined,
      }}
      data-node-id={id}
    >
      <div className="flex items-center gap-2">
        <span
          className="flex size-6 shrink-0 items-center justify-center rounded-md"
          style={{ background: `${def.background}22`, color: def.background }}
        >
          <Icon size={14} />
        </span>
        <div className="min-w-0">
          <div className="truncate text-xs font-semibold text-foreground">{label}</div>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: def.background, width: 8, height: 8 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: def.background, width: 8, height: 8 }}
      />
    </div>
  );
}

export const nodeTypes: NodeTypes = {
  trigger: FlowNode,
  condition: FlowNode,
  enrichment: FlowNode,
  agent: FlowNode,
  notification: FlowNode,
};
