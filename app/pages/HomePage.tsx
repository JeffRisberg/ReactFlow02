import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { NODE_REGISTRY } from "@/nodes";

function hexToRgba(hex: string, alpha: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}

const CAPABILITIES = [
    {
        emoji: "🔍",
        title: "Unified Observability",
        description:
            "Ingest metrics, logs, traces, events, and topology into a single AI-driven context layer. Eliminates tool-switching and alert duplication across domains.",
    },
    {
        emoji: "🧠",
        title: "Causal AI & Root Cause Analysis",
        description:
            "Go beyond correlation. Deterministic causal graphs or multi-hypothesis agents pinpoint actual root cause — not just a related symptom — within minutes.",
    },
    {
        emoji: "⚡",
        title: "Autonomous Remediation",
        description:
            "Agents execute approved runbooks, restart services, scale resources, or initiate rollbacks — without human approval for known-safe patterns.",
    },
    {
        emoji: "🔮",
        title: "Predictive Prevention",
        description:
            "ML models and change-risk scoring detect anomalies and flag dangerous changes before they cause incidents. Shift from reactive firefighting to proactive prevention.",
    },
    {
        emoji: "🤝",
        title: "Multi-Agent Orchestration",
        description:
            "Specialized agents (network, cloud, security, application, L1) collaborate via an orchestration layer. Always-on background agents handle continuous operational hygiene.",
    },
    {
        emoji: "🛡️",
        title: "Governance & Guardrails",
        description:
            "Policy-based controls define autonomous vs. human-approval thresholds. Full audit trail, explainability, and cost monitoring across all agent actions.",
    },
];

const NODE_TYPES = NODE_REGISTRY.map(n => ({
    label: n.label,
    description: n.description,
    Icon: n.Icon,
    accent: n.accent,
    bg: hexToRgba(n.accent, 0.08),
    border: hexToRgba(n.accent, 0.25),
}));

const capCardStyle: React.CSSProperties = {
    border: "1.5px solid rgba(139,92,246,0.45)",
    borderTop: "5px solid #f97316",
    borderRadius: 10,
    background: "#fff",
    padding: "20px 22px 26px",
    display: "flex",
    flexDirection: "column",
    gap: 0,
    transition: "box-shadow .15s",
};

export function HomePage() {
    return (
        <div className="overflow-y-auto flex-1 bg-white">

            {/* Hero */}
            <section className="w-3/4 mx-auto pt-16 pb-12">
                <div className="flex flex-col gap-6 max-w-8xl">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
                        Agentic ITOps Platform
                    </div>
                    <h1 className="text-5xl font-bold leading-tight tracking-tight text-foreground">
                        Move from reactive firefighting to proactive, agentic ITOps.
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-5xl">
                        Design the alert chains and automation flows that power your agentic platform — visually, in minutes.
                    </p>
                    <div className="flex items-center gap-3">
                        <Button asChild size="lg">
                            <Link to="/flow-library">
                                Open Library <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-6 pb-16 flex flex-col gap-20">

                {/* Capability Stack */}
                <section className="flex flex-col gap-6">
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: 20,
                        }}
                        className="sm:grid-cols-1"
                    >
                        {CAPABILITIES.map(({ emoji, title, description }) => (
                            <div
                                key={title}
                                style={capCardStyle}
                                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 18px rgba(139,92,246,0.2)")}
                                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.boxShadow = "none")}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                                    <span style={{ fontSize: 30, lineHeight: 1, flexShrink: 0 }}>{emoji}</span>
                                    <strong style={{ fontSize: 15, fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>{title}</strong>
                                </div>
                                <p style={{ fontSize: 14, lineHeight: 1.7, color: "#4b5563", margin: 0 }}>{description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Node Types */}
                <section className="flex flex-col gap-6">
                    <div>
                        <h2 className="text-xl font-semibold text-foreground">Build flows from {NODE_TYPES.length} composable node types</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Every alert chain is assembled from a concise vocabulary. Drag any node onto the canvas to get started.
                        </p>
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${NODE_TYPES.length}, 1fr)`,
                            gap: 12,
                        }}
                    >
                        {NODE_TYPES.map(({ label, description, Icon, accent, bg, border }) => (
                            <div
                                key={label}
                                style={{
                                    background: bg,
                                    border: `1.5px solid ${border}`,
                                    borderRadius: 10,
                                    padding: "14px 12px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 6,
                                    transition: "box-shadow .15s",
                                }}
                                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.boxShadow = `0 3px 12px ${hexToRgba(accent, 0.18)}`)}
                                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.boxShadow = "none")}
                            >
                <span style={{ color: accent }}>
                  <Icon size={20} />
                </span>
                                <div style={{ fontSize: 13, fontWeight: 700, color: accent }}>{label}</div>
                                <div style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.5 }}>{description}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="rounded-xl border border-border bg-muted/40 px-8 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">Ready to build your first agentic flow?</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Open the editor, drop a few nodes, and connect them into a pipeline in under a minute.
                        </p>
                    </div>
                    <Button asChild size="lg" className="shrink-0">
                        <Link to="/flow-editor">
                            Open Flow Editor <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </section>

            </div>
        </div>
    );
}
