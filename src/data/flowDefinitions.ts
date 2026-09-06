import type { Edge } from "@xyflow/react";
import type { FlowNode } from "@/types/interfaces";

export const INITIAL_NODES: FlowNode[] = [
  {
    id: "n1",
    type: "trigger",
    position: { x: 0, y: 80 },
    data: { label: "Alert Trigger", props: {} },
  },
  {
    id: "n2",
    type: "condition",
    position: { x: 260, y: 80 },
    data: { label: "Condition", props: {} },
  },
  {
    id: "n3",
    type: "notification",
    position: { x: 520, y: 80 },
    data: { label: "Notify", props: {} },
  },
];

export const INITIAL_EDGES: Edge[] = [
  { id: "n1-n2", source: "n1", target: "n2", animated: true },
  { id: "n2-n3", source: "n2", target: "n3", animated: true },
];
