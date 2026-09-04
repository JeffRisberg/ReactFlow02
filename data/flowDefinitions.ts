import type { Edge, Node } from "@xyflow/react";
import { NODE_REGISTRY_MAP } from "@/nodes";

export interface FlowNodeData extends Record<string, unknown> {
  label: string;
  props?: Record<string, string | number>;
}

export type FlowNode = Node<FlowNodeData>;

export interface FlowDefinition {
  id: string;
  name: string;
  description?: string;
  nodes: FlowNode[];
  edges: Edge[];
}

export const INITIAL_NODES: FlowNode[] = [
  {
    id: "n1",
    type: "trigger",
    position: { x: 0, y: 0 },
    data: { label: "Alert Trigger", props: NODE_REGISTRY_MAP.trigger.getDefaultProps() },
  },
  {
    id: "n2",
    type: "condition",
    position: { x: 220, y: 0 },
    data: { label: "Condition", props: NODE_REGISTRY_MAP.condition.getDefaultProps() },
  },
  {
    id: "n3",
    type: "notification",
    position: { x: 440, y: 0 },
    data: { label: "Notify", props: NODE_REGISTRY_MAP.notification.getDefaultProps() },
  },
];

export const INITIAL_EDGES: Edge[] = [
  { id: "n1-n2", source: "n1", target: "n2", animated: true },
  { id: "n2-n3", source: "n2", target: "n3", animated: true },
];
