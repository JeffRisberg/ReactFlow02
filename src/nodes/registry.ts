import {Activity, Bell, Bot, Filter, Webhook} from "lucide-react";
import type {NodeDefinition} from "@/types/interfaces";

const DEFINITIONS: NodeDefinition[] = [
    {
        type: "trigger",
        label: "Alert Trigger",
        description: "Starts the flow when a matching alert or event arrives.",
        Icon: Webhook,
        background: "#8b5cf6",
    },
    {
        type: "condition",
        label: "Condition",
        description: "Branches the flow based on a boolean expression.",
        Icon: Filter,
        background: "#3b82f6",
    },
    {
        type: "enrichment",
        label: "Enrich Context",
        description: "Adds topology, ownership, or historical context to the event.",
        Icon: Activity,
        background: "#f59e0b",
    },
    {
        type: "agent",
        label: "Agent Action",
        description: "Runs an autonomous agent to diagnose or remediate.",
        Icon: Bot,
        background: "#ec4899",
    },
    {
        type: "notification",
        label: "Notify",
        description: "Sends a notification to a channel, team, or on-call.",
        Icon: Bell,
        background: "#22c55e",
    },
];

export const NODE_REGISTRY: NodeDefinition[] = DEFINITIONS;

export const NODE_REGISTRY_MAP: Record<string, NodeDefinition> = Object.fromEntries(
    NODE_REGISTRY.map((def) => [def.type, def])
);
