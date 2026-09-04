import { cn } from "@/lib/utils";
import { Workflow } from "lucide-react";
import { Link, useLocation } from "react-router";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Flow Editor", href: "/flow-editor" },
];

export function TopBar() {
  const location = useLocation();

  return (
    <header className="flex items-center h-14 px-4 border-b-2 border-primary bg-background shrink-0 gap-4">
      <Link
        to="/"
        className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
      >
        <Workflow size={18} />
        <span className="hidden sm:inline">ReactFlow02</span>
      </Link>

      <nav className="flex items-center gap-1 ml-2">
        {navItems.map(({ label, href }) => {
          const isActive =
            href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);
          return (
            <Link
              key={href}
              to={href}
              className={cn(
                "px-3 py-1.5 text-sm rounded-md transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
