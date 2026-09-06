import Link from "next/link";
import { Workflow } from "lucide-react";

export function TopBar() {
  return (
    <header className="flex h-12 shrink-0 items-center gap-6 border-b border-border bg-background px-4">
      <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Workflow className="size-4 text-orange-500" />
        Flow Studio
      </Link>
      <nav className="flex items-center gap-4 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <Link href="/flow-editor" className="hover:text-foreground">
          Flow Editor
        </Link>
      </nav>
    </header>
  );
}
