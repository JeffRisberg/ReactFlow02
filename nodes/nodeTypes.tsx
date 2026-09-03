import { Handle, Position, type NodeProps, type NodeTypes } from "@xyflow/react";
import type { FlowNodeData } from "@/data/flowDefinitions";
import { NODE_REGISTRY, NODE_REGISTRY_MAP } from "./registry";

function FlowNodeView({ data, type }: NodeProps) {
  const def = type ? NODE_REGISTRY_MAP[type] : undefined;
  const accent = def?.accent ?? "#64748b";
  const Icon = def?.Icon;
  const label = String((data as FlowNodeData)?.label ?? def?.label ?? type);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        borderRadius: 8,
        border: `1.5px solid ${accent}`,
        background: `${accent}1a`,
        color: "#f1f5f9",
        fontSize: 13,
        minWidth: 140,
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: accent }} />
      {Icon && (
        <span style={{ color: accent, flexShrink: 0 }}>
          <Icon size={15} />
        </span>
      )}
      <span style={{ fontWeight: 600 }}>{label}</span>
      <Handle type="source" position={Position.Bottom} style={{ background: accent }} />
    </div>
  );
}

export const nodeTypes: NodeTypes = Object.fromEntries(
  NODE_REGISTRY.map((def) => [def.type, FlowNodeView])
);
