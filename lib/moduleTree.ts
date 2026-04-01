export interface ModuleNode {
  id: string;
  label: string;
  description?: string;
  type: "app" | "feature" | "service" | "util" | "component";
  children?: ModuleNode[];
}

export const moduleTree: ModuleNode = {
  id: "root",
  label: "MyApp",
  description: "Root application module",
  type: "app",
  children: [
    {
      id: "auth",
      label: "Auth",
      description: "Authentication & authorization",
      type: "feature",
      children: [
        {
          id: "auth-login",
          label: "LoginPage",
          description: "Login form and OAuth flow",
          type: "component",
        },
        {
          id: "auth-session",
          label: "SessionService",
          description: "JWT session management",
          type: "service",
        },
        {
          id: "auth-guards",
          label: "RouteGuards",
          description: "Protected route helpers",
          type: "util",
        },
      ],
    },
    {
      id: "dashboard",
      label: "Dashboard",
      description: "Main dashboard feature",
      type: "feature",
      children: [
        {
          id: "dashboard-overview",
          label: "OverviewPanel",
          description: "KPI cards and summary",
          type: "component",
        },
        {
          id: "dashboard-charts",
          label: "ChartWidgets",
          description: "Chart components",
          type: "component",
          children: [
            {
              id: "chart-line",
              label: "LineChart",
              description: "Time-series line chart",
              type: "component",
            },
            {
              id: "chart-bar",
              label: "BarChart",
              description: "Comparative bar chart",
              type: "component",
            },
            {
              id: "chart-pie",
              label: "PieChart",
              description: "Distribution pie chart",
              type: "component",
            },
          ],
        },
        {
          id: "dashboard-alerts",
          label: "AlertFeed",
          description: "Real-time alert feed",
          type: "component",
        },
      ],
    },
    {
      id: "api",
      label: "API Layer",
      description: "Backend communication",
      type: "service",
      children: [
        {
          id: "api-client",
          label: "HttpClient",
          description: "Axios wrapper with interceptors",
          type: "service",
        },
        {
          id: "api-users",
          label: "UsersAPI",
          description: "User CRUD endpoints",
          type: "service",
        },
        {
          id: "api-data",
          label: "DataAPI",
          description: "Analytics data endpoints",
          type: "service",
        },
      ],
    },
    {
      id: "shared",
      label: "Shared",
      description: "Shared utilities and components",
      type: "util",
      children: [
        {
          id: "shared-ui",
          label: "UIKit",
          description: "Base UI components",
          type: "component",
          children: [
            {
              id: "ui-button",
              label: "Button",
              description: "Button variants",
              type: "component",
            },
            {
              id: "ui-modal",
              label: "Modal",
              description: "Dialog/modal wrapper",
              type: "component",
            },
            {
              id: "ui-table",
              label: "DataTable",
              description: "Sortable/filterable table",
              type: "component",
            },
          ],
        },
        {
          id: "shared-hooks",
          label: "Hooks",
          description: "Custom React hooks",
          type: "util",
        },
        {
          id: "shared-utils",
          label: "Utils",
          description: "Pure utility functions",
          type: "util",
        },
      ],
    },
  ],
};

export const typeColors: Record<ModuleNode["type"], string> = {
  app: "#6366f1",
  feature: "#0ea5e9",
  service: "#10b981",
  util: "#f59e0b",
  component: "#ec4899",
};

export const typeLabels: Record<ModuleNode["type"], string> = {
  app: "App",
  feature: "Feature",
  service: "Service",
  util: "Utility",
  component: "Component",
};

/** Flatten tree into a list with depth info */
export interface FlatNode {
  node: ModuleNode;
  depth: number;
  parentId: string | null;
}

export function flattenTree(
  node: ModuleNode,
  depth = 0,
  parentId: string | null = null
): FlatNode[] {
  const result: FlatNode[] = [{ node, depth, parentId }];
  for (const child of node.children ?? []) {
    result.push(...flattenTree(child, depth + 1, node.id));
  }
  return result;
}
