import {
    addEdge,
    Background,
    Controls,
    MiniMap,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
    type Connection,
    type Edge,
    type Node,
    type ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Download, LayoutPanelLeft, RotateCcw } from "lucide-react";
import { useCallback, useState } from "react";
import { useLocation } from "react-router";
import { downloadJson } from "@/lib/utils";
import { INITIAL_EDGES, INITIAL_NODES, type FlowDefinition, type FlowNodeData } from "@/data/flowDefinitions";
import { NODE_REGISTRY, NODE_REGISTRY_MAP } from "@/nodes";
import type { NodeProperty } from "@/nodes";
import { nodeTypes } from "@/nodes/nodeTypes";

/* ── data types ── */

type FlowNode = Node<FlowNodeData>;

/* ── shared styles ── */

const toolbarBtnStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "5px 12px",
    borderRadius: 6,
    border: "1px solid hsl(var(--border))",
    background: "hsl(var(--background))",
    fontSize: 12,
    cursor: "pointer",
    color: "hsl(var(--foreground))",
    whiteSpace: "nowrap",
};

const fieldStyle: React.CSSProperties = {
    padding: "6px 10px",
    borderRadius: 6,
    border: "1px solid hsl(var(--border))",
    background: "hsl(var(--background))",
    fontSize: 13,
    color: "hsl(var(--foreground))",
    width: "100%",
    boxSizing: "border-box",
};

function PropField({
    prop,
    value,
    onChange,
}: {
    prop: NodeProperty;
    value: string | number;
    onChange: (key: string, value: string | number) => void;
}) {
    return (
        <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 500 }}>{prop.label}</span>
            {prop.type === "select" ? (
                <select
                    value={value}
                    onChange={(e) => onChange(prop.key, e.target.value)}
                    style={fieldStyle}
                >
                    {prop.options?.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={prop.type === "number" ? "number" : "text"}
                    value={value}
                    onChange={(e) =>
                        onChange(prop.key, prop.type === "number" ? Number(e.target.value) : e.target.value)
                    }
                    style={fieldStyle}
                />
            )}
        </label>
    );
}

interface FlowCanvasProps {
    initialNodes?: FlowNode[];
    initialEdges?: Edge[];
}

function FlowCanvas({ initialNodes = INITIAL_NODES, initialEdges = INITIAL_EDGES }: FlowCanvasProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [rfInstance, setRfInstance] = useState<ReactFlowInstance<FlowNode, Edge> | null>(null);

    const selectedNode = selectedNodeId ? (nodes.find((n) => n.id === selectedNodeId) ?? null) : null;
    const selectedNodeDef = selectedNode?.type ? NODE_REGISTRY_MAP[selectedNode.type] : null;

    const onConnect = useCallback(
        (conn: Connection) =>
            setEdges((eds) =>
                addEdge({ ...conn, animated: true, style: { strokeWidth: 3.5, stroke: "#fcd34d" } }, eds)
            ),
        [setEdges]
    );

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            if (!rfInstance) return;
            const type = e.dataTransfer.getData("application/reactflow/type");
            const label = e.dataTransfer.getData("application/reactflow/label");
            if (!type) return;
            const pos = rfInstance.screenToFlowPosition({ x: e.clientX, y: e.clientY });
            const id = `n_${Date.now()}`;
            const defaultProps = NODE_REGISTRY_MAP[type]?.getDefaultProps() ?? {};
            setNodes((cur) => [...cur, { id, type, position: pos, data: { label, props: defaultProps } }]);
            setSelectedNodeId(id);
        },
        [rfInstance, setNodes]
    );

    const updateNodeData = useCallback(
        (key: keyof FlowNodeData, value: string) => {
            if (!selectedNodeId) return;
            setNodes((cur) =>
                cur.map((n) =>
                    n.id === selectedNodeId ? { ...n, data: { ...n.data, [key]: value } } : n
                )
            );
        },
        [selectedNodeId, setNodes]
    );

    const updateNodeProp = useCallback(
        (key: string, value: string | number) => {
            if (!selectedNodeId) return;
            setNodes((cur) =>
                cur.map((n) =>
                    n.id === selectedNodeId
                        ? { ...n, data: { ...n.data, props: { ...(n.data.props ?? {}), [key]: value } } }
                        : n
                )
            );
        },
        [selectedNodeId, setNodes]
    );

    const handleReset = () => {
        setNodes(initialNodes);
        setEdges(initialEdges);
        setSelectedNodeId(null);
        window.requestAnimationFrame(() => rfInstance?.fitView({ padding: 0.3 }));
    };

    const handleExport = () => {
        downloadJson(
            {
                nodes: nodes.map((n) => ({ id: n.id, type: n.type, position: n.position, data: n.data })),
                edges: edges.map((e) => ({ id: e.id, source: e.source, target: e.target })),
            },
            "flow.json"
        );
    };

    const dividerStyle: React.CSSProperties = {
        fontSize: 10,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.07em",
        color: "hsl(var(--muted-foreground))",
        borderTop: "1px solid hsl(var(--border))",
        paddingTop: 10,
        marginTop: 4,
    };

    return (
        <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
            {/* Palette */}
            <aside
                style={{
                    width: 220,
                    borderRight: "1px solid hsl(var(--border))",
                    padding: "16px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    background: "hsl(var(--background))",
                    overflowY: "auto",
                    flexShrink: 0,
                }}
            >
                <p style={{ fontSize: 11, fontWeight: 600, color: "hsl(var(--muted-foreground))", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 4px" }}>
                    Nodes
                </p>
                <p style={{ fontSize: 12, color: "hsl(var(--muted-foreground))", margin: "0 0 8px" }}>
                    Drag onto the canvas to add a node.
                </p>
                {NODE_REGISTRY.map(({ type, label, description, Icon, accent }) => (
                    <button
                        key={type}
                        draggable
                        onDragStart={(e) => {
                            e.dataTransfer.setData("application/reactflow/type", type);
                            e.dataTransfer.setData("application/reactflow/label", label);
                            e.dataTransfer.effectAllowed = "move";
                        }}
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            padding: "10px 12px",
                            borderRadius: 8,
                            border: `1.5px solid ${accent}a0`,
                            background: `${accent}22`,
                            cursor: "grab",
                            textAlign: "left",
                            width: "100%",
                        }}
                    >
            <span style={{ color: accent, marginTop: 1, flexShrink: 0 }}>
              <Icon size={16} />
            </span>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "hsl(var(--foreground))" }}>{label}</div>
                            <div style={{ fontSize: 11, color: "hsl(var(--muted-foreground))", marginTop: 1 }}>{description}</div>
                        </div>
                    </button>
                ))}
            </aside>

            {/* Canvas */}
            <div style={{ flex: 1, position: "relative", minWidth: 0, background: "#5a5a5a" }}>
                <div style={{ position: "absolute", top: 12, right: 12, zIndex: 10, display: "flex", gap: 8 }}>
                    <button onClick={() => rfInstance?.fitView({ padding: 0.3 })} style={toolbarBtnStyle}>
                        <LayoutPanelLeft size={13} /> Fit View
                    </button>
                    <button onClick={handleReset} style={toolbarBtnStyle}>
                        <RotateCcw size={13} /> Reset
                    </button>
                    <button onClick={handleExport} style={toolbarBtnStyle}>
                        <Download size={13} /> Export
                    </button>
                </div>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={setRfInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onNodeClick={(_e, n) => setSelectedNodeId(n.id)}
                    onPaneClick={() => setSelectedNodeId(null)}
                    nodeTypes={nodeTypes}
                    fitView
                    fitViewOptions={{ padding: 0.3 }}
                    deleteKeyCode={["Backspace", "Delete"]}
                >
                    <MiniMap />
                    <Controls />
                    <Background gap={20} size={1.5} color="#334155" />
                </ReactFlow>
            </div>

            {/* Inspector */}
            <aside
                style={{
                    width: 280,
                    borderLeft: "1px solid hsl(var(--border))",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    background: "hsl(var(--background))",
                    overflowY: "auto",
                    flexShrink: 0,
                }}
            >
                <p style={{ fontSize: 11, fontWeight: 600, color: "hsl(var(--muted-foreground))", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>
                    Inspector
                </p>

                {selectedNode && selectedNodeDef ? (
                    <>
                        {/* Type badge */}
                        <div style={{ fontSize: 12, color: "hsl(var(--muted-foreground))" }}>
                            Type:{" "}
                            <strong
                                style={{
                                    color: selectedNodeDef.accent,
                                    background: `${selectedNodeDef.accent}22`,
                                    border: `1px solid ${selectedNodeDef.accent}44`,
                                    borderRadius: 4,
                                    padding: "1px 6px",
                                    fontSize: 11,
                                }}
                            >
                                {selectedNode.type}
                            </strong>
                        </div>

                        {/* Label */}
                        <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <span style={{ fontSize: 12, fontWeight: 500 }}>Label</span>
                            <input
                                value={String(selectedNode.data.label ?? "")}
                                onChange={(e) => updateNodeData("label", e.target.value)}
                                style={fieldStyle}
                            />
                        </label>

                        {/* Input properties */}
                        {selectedNodeDef.inputProperties.length > 0 && (
                            <>
                                <div style={dividerStyle}>Input Properties</div>
                                {selectedNodeDef.inputProperties.map(prop => (
                                    <PropField
                                        key={prop.key}
                                        prop={prop}
                                        value={selectedNode.data.props?.[prop.key] ?? prop.defaultValue}
                                        onChange={updateNodeProp}
                                    />
                                ))}
                            </>
                        )}

                        {/* Output properties (read-only) */}
                        {selectedNodeDef.outputProperties.length > 0 && (
                            <>
                                <div style={dividerStyle}>Output Properties</div>
                                {selectedNodeDef.outputProperties.map(prop => {
                                    const val = selectedNode.data.props?.[prop.key];
                                    return (
                                        <div key={prop.key} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      <span style={{ fontSize: 12, fontWeight: 500, color: "hsl(var(--muted-foreground))" }}>
                        {prop.label}
                      </span>
                                            <div
                                                style={{
                                                    padding: "6px 10px",
                                                    borderRadius: 6,
                                                    border: "1px solid hsl(var(--border))",
                                                    background: "hsl(var(--muted))",
                                                    fontSize: 13,
                                                    color: val ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                                                    minHeight: 34,
                                                    fontFamily: "monospace",
                                                }}
                                            >
                                                {val !== undefined && val !== "" ? String(val) : <em style={{ fontStyle: "italic", fontSize: 12 }}>—</em>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </>
                ) : (
                    <p style={{ fontSize: 13, color: "hsl(var(--muted-foreground))", margin: 0 }}>
                        Select a node on the canvas to configure it.
                    </p>
                )}
            </aside>
        </div>
    );
}

export function FlowEditorPage() {
    const location = useLocation();
    const flow = (location.state as { flow?: FlowDefinition } | null)?.flow;

    return (
        <ReactFlowProvider>
            <div style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column" }}>
                <FlowCanvas
                    initialNodes={flow?.nodes as FlowNode[] | undefined}
                    initialEdges={flow?.edges}
                />
            </div>
        </ReactFlowProvider>
    );
}