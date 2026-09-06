"use client";

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
  type ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Download, LayoutPanelLeft, RotateCcw } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { downloadJson } from "@/lib/utils";
import { INITIAL_EDGES, INITIAL_NODES } from "@/data/flowDefinitions";
import { NODE_REGISTRY } from "@/nodes";
import { nodeTypes } from "@/nodes/nodeTypes";
import type { FlowNode } from "@/types/interfaces";

function FlowCanvasInner() {
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance<FlowNode, Edge> | null>(null);

  const onConnect = useCallback(
    (conn: Connection) =>
      setEdges((eds) => addEdge({ ...conn, animated: true }, eds)),
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
      setNodes((cur) => [...cur, { id, type, position: pos, data: { label, props: {} } }]);
    },
    [rfInstance, setNodes]
  );

  const handleReset = () => {
    setNodes(INITIAL_NODES);
    setEdges(INITIAL_EDGES);
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

  return (
    <div className="flex h-full min-h-0 flex-1">
      <aside className="flex w-56 shrink-0 flex-col gap-2 overflow-y-auto border-r border-border bg-background p-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Nodes</p>
        <p className="text-xs text-muted-foreground">Drag onto the canvas to add a node.</p>
        {NODE_REGISTRY.map(({ type, label, description, Icon, background }) => (
          <button
            key={type}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("application/reactflow/type", type);
              e.dataTransfer.setData("application/reactflow/label", label);
              e.dataTransfer.effectAllowed = "move";
            }}
            className="flex w-full items-start gap-2.5 rounded-md border p-2.5 text-left"
            style={{ borderColor: `${background}60`, background: `${background}14` }}
          >
            <span className="mt-0.5 shrink-0" style={{ color: background }}>
              <Icon size={16} />
            </span>
            <span>
              <span className="block text-xs font-semibold text-foreground">{label}</span>
              <span className="mt-0.5 block text-[11px] text-muted-foreground">{description}</span>
            </span>
          </button>
        ))}
      </aside>

      <div className="relative min-w-0 flex-1">
        <div className="absolute right-3 top-3 z-10 flex gap-2">
          <Button variant="outline" size="sm" onClick={() => rfInstance?.fitView({ padding: 0.3 })}>
            <LayoutPanelLeft className="size-3.5" /> Fit View
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="size-3.5" /> Reset
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="size-3.5" /> Export
          </Button>
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
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          deleteKeyCode={["Backspace", "Delete"]}
          defaultEdgeOptions={{ style: { stroke: "#64748b", strokeWidth: 2 } }}
          style={{ backgroundColor: "#f1f5f9" }}
        >
          <MiniMap />
          <Controls />
          <Background gap={20} size={1.5} color="#cbd5e1" />
        </ReactFlow>
      </div>
    </div>
  );
}

export function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowCanvasInner />
    </ReactFlowProvider>
  );
}
