"use client";

import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  BackgroundVariant,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  moduleTree,
  typeColors,
  typeLabels,
  type ModuleNode,
} from "@/lib/moduleTree";

// ── Layout constants ────────────────────────────────────────────────────────
const NODE_WIDTH = 160;
const NODE_HEIGHT = 64;
const H_GAP = 40; // horizontal gap between siblings
const V_GAP = 100; // vertical gap between levels

// ── Measure subtree width ────────────────────────────────────────────────────
function subtreeWidth(node: ModuleNode): number {
  if (!node.children?.length) return NODE_WIDTH;
  const childrenTotal =
    node.children.reduce((sum, c) => sum + subtreeWidth(c), 0) +
    H_GAP * (node.children.length - 1);
  return Math.max(NODE_WIDTH, childrenTotal);
}

// ── Build nodes/edges recursively ────────────────────────────────────────────
function buildGraph(
  node: ModuleNode,
  x: number,
  y: number,
  nodes: Node[],
  edges: Edge[]
): void {
  nodes.push({
    id: node.id,
    type: "default",
    position: { x: x - NODE_WIDTH / 2, y },
    data: {
      label: (
        <div className="flex flex-col items-start gap-0.5 px-1">
          <span className="font-semibold text-sm leading-tight">
            {node.label}
          </span>
          {node.description && (
            <span className="text-[10px] text-gray-400 leading-tight">
              {node.description}
            </span>
          )}
          <span
            className="mt-1 self-start rounded px-1 text-[9px] font-medium uppercase tracking-wide"
            style={{
              backgroundColor: typeColors[node.type] + "33",
              color: typeColors[node.type],
            }}
          >
            {typeLabels[node.type]}
          </span>
        </div>
      ),
    },
    style: {
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      background: "#1e293b",
      border: `2px solid ${typeColors[node.type]}`,
      borderRadius: 8,
      color: "#f1f5f9",
      padding: "6px 8px",
      fontSize: 13,
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  });

  if (!node.children?.length) return;

  const sw = subtreeWidth(node);
  // centre children under parent
  const totalChildrenWidth =
    node.children.reduce((s, c) => s + subtreeWidth(c), 0) +
    H_GAP * (node.children.length - 1);
  let curX = x - totalChildrenWidth / 2;

  for (const child of node.children) {
    const cw = subtreeWidth(child);
    const childCenterX = curX + cw / 2;

    edges.push({
      id: `${node.id}->${child.id}`,
      source: node.id,
      target: child.id,
      style: { stroke: "#475569", strokeWidth: 1.5 },
      animated: false,
    });

    buildGraph(child, childCenterX, y + NODE_HEIGHT + V_GAP, nodes, edges);
    curX += cw + H_GAP;
  }

  void sw; // suppress unused warning
}

export default function ModuleFlowDiagram() {
  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    buildGraph(moduleTree, subtreeWidth(moduleTree) / 2, 0, nodes, edges);
    return { nodes, edges };
  }, []);

  const nodeColor = useCallback((node: Node) => {
    const mod = node as Node & { style?: { border?: string } };
    return mod.style?.border?.slice(16) ?? "#6366f1";
  }, []);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#334155"
        />
        <Controls className="[&>button]:bg-gray-800 [&>button]:border-gray-700 [&>button]:text-gray-300" />
        <MiniMap
          nodeColor={nodeColor}
          maskColor="rgba(15,23,42,0.7)"
          style={{ background: "#0f172a", border: "1px solid #334155" }}
        />
      </ReactFlow>
    </div>
  );
}
