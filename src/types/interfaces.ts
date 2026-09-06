import {LucideIcon} from "lucide-react";
import type {Node} from "@xyflow/react";

export interface NodeDefinition {
    type: string;
    label: string;
    description: string;
    Icon: LucideIcon;
    background: string;
}

export interface FlowNodeData extends Record<string, unknown> {
    label: string;
    props?: Record<string, string | number>;
}

export type FlowNode = Node<FlowNodeData>;
