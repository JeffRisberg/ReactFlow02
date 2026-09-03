import { Activity, Bell, Bot, Filter, Webhook, type LucideIcon } from "lucide-react";

export interface NodeProperty {
  key: string;
  label: string;
  type: "text" | "number" | "select";
  defaultValue: string | number;
  options?: string[];
}

export interface NodeDefinition {
  type: string;
  label: string;
  description: string;
  Icon: LucideIcon;
  accent: string;
  inputProperties: NodeProperty[];
  outputProperties: NodeProperty[];
  getDefaultProps: () => Record<string, string | number>;
}

function defaultsFrom(properties: NodeProperty[]): Record<string, string | number> {
  return Object.fromEntries(properties.map((p) => [p.key, p.defaultValue]));
}

const DEFINITIONS: Omit<NodeDefinition, "getDefaultProps">[] = [
  {
    type: "trigger",
    label: "Alert Trigger",
    description: "Starts the flow when a matching alert or event arrives.",
    Icon: Webhook,
    accent: "#f97316",
    inputProperties: [{ key: "source", label: "Source", type: "text", defaultValue: "" }],
    outputProperties: [{ key: "alertId", label: "Alert ID", type: "text", defaultValue: "" }],
  },
  {
    type: "condition",
    label: "Condition",
    description: "Branches the flow based on a boolean expression.",
    Icon: Filter,
    accent: "#eab308",
    inputProperties: [{ key: "expression", label: "Expression", type: "text", defaultValue: "" }],
    outputProperties: [],
  },
  {
    type: "enrichment",
    label: "Enrich Context",
    description: "Adds topology, ownership, or historical context to the event.",
    Icon: Activity,
    accent: "#0ea5e9",
    inputProperties: [{ key: "source", label: "Context Source", type: "text", defaultValue: "" }],
    outputProperties: [{ key: "context", label: "Context", type: "text", defaultValue: "" }],
  },
  {
    type: "agent",
    label: "Agent Action",
    description: "Runs an autonomous agent to diagnose or remediate.",
    Icon: Bot,
    accent: "#8b5cf6",
    inputProperties: [
      { key: "runbook", label: "Runbook", type: "text", defaultValue: "" },
      { key: "requireApproval", label: "Require Approval", type: "select", defaultValue: "no", options: ["yes", "no"] },
    ],
    outputProperties: [{ key: "result", label: "Result", type: "text", defaultValue: "" }],
  },
  {
    type: "notification",
    label: "Notify",
    description: "Sends a notification to a channel, team, or on-call.",
    Icon: Bell,
    accent: "#22c55e",
    inputProperties: [
      { key: "channel", label: "Channel", type: "text", defaultValue: "" },
      { key: "message", label: "Message", type: "text", defaultValue: "" },
    ],
    outputProperties: [],
  },
];

export const NODE_REGISTRY: NodeDefinition[] = DEFINITIONS.map((def) => ({
  ...def,
  getDefaultProps: () => defaultsFrom(def.inputProperties),
}));

export const NODE_REGISTRY_MAP: Record<string, NodeDefinition> = Object.fromEntries(
  NODE_REGISTRY.map((def) => [def.type, def])
);
