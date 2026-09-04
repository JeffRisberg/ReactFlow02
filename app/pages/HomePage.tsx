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
                    <div className="inline-flex items-center gap-2 text-lg font-semibold uppercase tracking-widest text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
                        ReactFlow02
                    </div>
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-6 pb-16 flex flex-col gap-20">
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
