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

- `app/` — Next.js App Router pages
  - `app/page.tsx` — home page
  - `app/flow-editor/page.tsx` — flow editor page
  - `app/layout.tsx`, `app/globals.css` — root layout and global styles
- `components/` — shared React components
  - `components/TopBar.tsx` — top navigation bar
  - `components/flow/FlowCanvas.tsx` — React Flow canvas (drag/drop nodes, inspector panel)
  - `components/ui/` — shadcn/ui primitives (button, card, input, label, select, badge)
- `nodes/` — flow node type definitions
  - `nodes/registry.ts` — `NodeDefinition`/`NodeProperty` types and the node registry (`NODE_REGISTRY`, `NODE_REGISTRY_MAP`)
  - `nodes/nodeTypes.tsx` — React Flow `nodeTypes` map (rendering per node type)
  - `nodes/index.ts` — re-exports from this folder
- `data/flowDefinitions.ts` — initial nodes/edges for the flow canvas (`INITIAL_NODES`, `INITIAL_EDGES`) and related types
- `lib/utils.ts` — shared utilities (e.g. `cn`, `downloadJson`)
- `public/` — static assets
- `components.json` — shadcn/ui configuration
