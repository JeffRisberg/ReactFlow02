<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Build & lint commands

- `npm run dev` — start the dev server (Turbopack)
- `npm run build` — production build (`next build`)
- `npm run start` — run the production build
- `npm run lint` — run ESLint (`eslint.config.mjs`)
- `npx tsc --noEmit` — type-check without emitting output

There is no test script configured yet.

## Folder structure

- `src/app/` — Next.js App Router pages
  - `src/app/page.tsx` — home page
  - `src/app/flow-editor/page.tsx` — flow editor page
  - `src/app/layout.tsx`, `src/app/globals.css` — root layout and global styles
- `src/components/` — shared React components
  - `src/components/TopBar.tsx` — top navigation bar
  - `src/components/flow/FlowCanvas.tsx` — React Flow canvas (drag/drop nodes, inspector panel)
  - `src/components/ui/` — shadcn/ui primitives (button, card, input, label, select, badge)
- `src/nodes/` — flow node type definitions
  - `src/nodes/registry.ts` — `NodeDefinition`/`NodeProperty` types and the node registry (`NODE_REGISTRY`, `NODE_REGISTRY_MAP`)
  - `src/nodes/nodeTypes.tsx` — React Flow `nodeTypes` map (rendering per node type)
  - `src/nodes/index.ts` — re-exports from this folder
- `src/data/flowDefinitions.ts` — initial nodes/edges for the flow canvas (`INITIAL_NODES`, `INITIAL_EDGES`) and related types
- `src/lib/utils.ts` — shared utilities (e.g. `cn`, `downloadJson`)
- `src/types/` — shared TypeScript types (e.g. `interfaces.ts`)
- `public/` — static assets (stays at project root)
- `components.json` — shadcn/ui configuration
